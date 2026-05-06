import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "healthy food";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Places API Key not configured" }, { status: 500 });
  }

  try {
    // Attempting to use the Places API (New) for better compatibility
    let url = "";
    let method = "POST";
    let body: any = {};
    let headers: any = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.id,places.types,places.vicinity"
    };

    if (lat && lng) {
      url = "https://places.googleapis.com/v1/places:searchNearby";
      body = {
        includedTypes: ["restaurant"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng)
            },
            radius: 5000.0
          }
        }
      };
    } else {
      url = "https://places.googleapis.com/v1/places:searchText";
      body = {
        textQuery: `${query} healthy restaurants`,
        maxResultCount: 10
      };
    }

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.error) {
      console.error("Places API (New) Error:", data.error);
      // If the New API also fails, we throw to trigger the frontend fallback
      throw new Error(data.error.message || "Places API error");
    }

    // Map New Places API results to our internal type
    const restaurants = (data.places || []).map((place: any) => ({
      name: place.displayName?.text || "Unknown Restaurant",
      address: place.formattedAddress || place.vicinity || "Address not available",
      rating: place.rating || 0,
      healthyOptions: ["Fresh ingredients", "Healthy selection", "Salads"], 
      distance: lat ? "Nearby" : "",
      placeId: place.id,
    }));

    return NextResponse.json(restaurants);
  } catch (error: any) {
    console.error("Places API Proxy Catch Error:", error.message);
    // We return a 500 which the frontend fetchHealthyPlaces handles by returning mock data
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
