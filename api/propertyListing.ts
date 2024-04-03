import Constants from "expo-constants";
import { Listing } from "@/interfaces/listing";

export async function fetchPropertyListing(slug: string): Promise<Listing> {
  try {
    const API_URL = Constants.expoConfig?.extra?.djangoApiUrl ?? "";

    if (!API_URL) {
      throw new Error("Django REST API URL not found");
    }

    const url = `${API_URL}/properties/public/${slug}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
}
