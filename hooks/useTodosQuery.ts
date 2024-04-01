import { fetchTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

export function useTodosQuery() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return query;
}
