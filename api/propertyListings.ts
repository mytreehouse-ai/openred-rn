import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { Listing } from "@/interfaces/listing";
import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { filterParams } from "@/utils/filterParams";
import Constants from "expo-constants";

export async function fetchPropertyListings(
  params?: Partial<PropertyListingFilters>
): Promise<ApiBaseResponse<Listing[]>> {
  try {
    const API_URL = Constants.expoConfig?.extra?.djangoApiUrl ?? "";

    if (!API_URL) {
      throw new Error("Django REST API URL not found");
    }

    const queryParams = filterParams(params);

    const url = `${API_URL}/properties/public?${queryParams}`;

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
