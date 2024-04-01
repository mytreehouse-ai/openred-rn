import { fetchTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

export function useTodosQuery(propertyType: string) {
  const query = useQuery({
    queryKey: ["todos", propertyType],
    queryFn: fetchTodos,
  });

  return query;
}
