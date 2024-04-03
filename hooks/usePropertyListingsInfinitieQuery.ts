import { fetchPropertyListings } from "@/api/propertyListings";
import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePropertyListingsInfiniteQuery(
  filter?: Partial<PropertyListingFilters>
) {
  function extractPageNumber(url: string | null): string | null {
    if (!url) return null;
    const match = url.match(/page=(\d+)/);
    return match ? match[1] : null;
  }

  const query = useInfiniteQuery({
    queryKey: ["property-listings", JSON.stringify(filter)],
    queryFn: ({ pageParam }) =>
      fetchPropertyListings({ ...filter, page: Number(pageParam ?? "0") }),
    getPreviousPageParam: (prevPage) => extractPageNumber(prevPage.previous),
    getNextPageParam: (lastPage) => extractPageNumber(lastPage.next),
    initialPageParam: "1",
  });

  return query;
}
