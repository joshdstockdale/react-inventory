import { EmptyInventory, fetchInventoryDetail } from "@/api/inventory";
import { useQuery } from "@tanstack/react-query";

export default function useInventory(id: string | undefined) {
  const { data, status } = useQuery({
    queryKey: ["inventory-detail", id],
    queryFn: () => fetchInventoryDetail(id),
  });
  return [data ?? EmptyInventory, status];
}
