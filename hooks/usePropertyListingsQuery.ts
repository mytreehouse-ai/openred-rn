import { fetchPropertyListings } from "@/api/propertyListings";
import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { useQuery } from "@tanstack/react-query";

export function usePropertyListingsQuery(
  filter?: Partial<PropertyListingFilters>
) {
  const query = useQuery({
    queryKey: ["property-listings", JSON.stringify(filter)],
    queryFn: () => fetchPropertyListings(filter),
  });

  return query;
}
