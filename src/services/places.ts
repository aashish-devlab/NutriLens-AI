import { RestaurantSuggestion } from "@/types";

export async function fetchHealthyPlaces(query?: string, lat?: number, lng?: number): Promise<RestaurantSuggestion[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (lat) params.append("lat", lat.toString());
    if (lng) params.append("lng", lng.toString());

    const response = await fetch(`/api/places?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch places");
    
    return await response.json();
  } catch (error) {
    console.error("fetchHealthyPlaces Error:", error);
    // Fallback to mock data if API fails or for demo
    return [
      {
        name: "The Green Bowl (Demo)",
        address: "123 Emerald St, Silicon Valley",
        rating: 4.8,
        healthyOptions: ["Quinoa Power Bowl", "Avocado Super Salad", "Lentil Soup"],
        distance: "0.8 miles"
      },
      {
        name: "Pure & Pressed (Demo)",
        address: "456 Cyan Ave, Silicon Valley",
        rating: 4.5,
        healthyOptions: ["Cold Pressed Juices", "Zucchini Noodles", "Acai Bowl"],
        distance: "1.2 miles"
      }
    ];
  }
}
