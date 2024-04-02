import { fetchPropertyListings } from "@/api/propertyListings";
import { useQuery } from "@tanstack/react-query";

export function usePropertyListingsQuery(propertyType: string, id?: number) {
  const query = useQuery({
    queryKey: ["property-listings", propertyType],
    queryFn: () => fetchPropertyListings(propertyType),
  });

  return query;
}
