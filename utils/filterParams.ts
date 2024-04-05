import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";

export function filterParams(
  filters?: Partial<PropertyListingFilters>
): string {
  const IS_ACTIVE = 1;
  const effectiveFilters = { ...filters, property_status: IS_ACTIVE };
  return Object.entries(effectiveFilters)
    .filter(
      ([_, value]) =>
        value !== "" && value !== 0 && value != null && value !== "null"
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
