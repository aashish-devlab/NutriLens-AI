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
    // If we have coordinates, use nearbysearch, otherwise use textsearch
    let url = "";
    if (lat && lng) {
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&keyword=${query}&key=${apiKey}`;
    } else {
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+healthy+restaurants&key=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(data.error_message || `Google Places API error: ${data.status}`);
    }

    // Map Google results to our internal RestaurantSuggestion type
    const restaurants = (data.results || []).map((place: any) => ({
      name: place.name,
      address: place.vicinity || place.formatted_address,
      rating: place.rating || 0,
      healthyOptions: ["Plant-based options", "Salads", "Fresh ingredients"], // Mocking menu since Places API doesn't provide it easily without extra calls
      distance: lat ? "Nearby" : "",
      placeId: place.place_id,
      photoReference: place.photos?.[0]?.photo_reference,
    }));

    return NextResponse.json(restaurants);
  } catch (error: any) {
    console.error("Places API Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
