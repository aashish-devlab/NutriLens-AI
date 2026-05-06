import { RestaurantSuggestion } from "@/types";

export async function getHealthyPlaces(lat: number, lng: number): Promise<RestaurantSuggestion[]> {
  // In a real app, this would call Google Places API
  // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&keyword=healthy&key=${process.env.GOOGLE_PLACES_API_KEY}`;
  
  // Mocking response for hackathon demo
  return [
    {
      name: "The Green Bowl",
      address: "123 Emerald St, Silicon Valley",
      rating: 4.8,
      healthyOptions: ["Quinoa Power Bowl", "Avocado Super Salad", "Lentil Soup"],
      distance: "0.8 miles"
    },
    {
      name: "Pure & Pressed",
      address: "456 Cyan Ave, Silicon Valley",
      rating: 4.5,
      healthyOptions: ["Cold Pressed Juices", "Zucchini Noodles", "Acai Bowl"],
      distance: "1.2 miles"
    },
    {
      name: "Harvest Kitchen",
      address: "789 Harvest Rd, Silicon Valley",
      rating: 4.6,
      healthyOptions: ["Roasted Root Veggies", "Grilled Wild Salmon", "Kale Caesar"],
      distance: "2.5 miles"
    }
  ];
}
