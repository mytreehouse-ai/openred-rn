import Constants from "expo-constants";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { Listing } from "@/interfaces/listing";

export async function fetchPropertyListings(
  propertyType: string
): Promise<ApiBaseResponse<Listing[]>> {
  try {
    const API_URL = Constants.expoConfig?.extra?.djangoApiUrl ?? "";

    if (!API_URL) {
      throw new Error("Django REST API URL not found");
    }

    const url = `${API_URL}/properties/public?property_status=&property_type=${propertyType}`;

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
