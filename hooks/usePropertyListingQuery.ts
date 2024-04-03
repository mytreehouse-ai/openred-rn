import { fetchPropertyListing } from "@/api/propertyListing";
import { Listing } from "@/interfaces/listing";
import { useQuery } from "@tanstack/react-query";

export function usePropertyListingQuery(
  slug: string,
  initialData?: Listing | null
) {
  const query = useQuery({
    queryKey: ["property-listing", slug],
    queryFn: () => fetchPropertyListing(slug),
    initialData: initialData ?? undefined,
  });

  return query;
}
