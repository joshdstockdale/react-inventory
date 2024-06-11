import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import { TInventory, fetchInventory } from "./api/inventory";
import { Button } from "./components/ui/button";

export default function Inventory() {
  const { isPending, error, data } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });

  if (isPending) {
    return (
      <div className="loading-pane">
        <h2 className="loader">☺️</h2>
      </div>
    );
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }
  return (
    <>
      <h1 className="text-2xl mb-2">Inventory Page</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-400 text-left">
            <th>ID</th>
            <th>Company</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((inv: TInventory) => (
            <tr key={inv.id}>
              <td>{inv.company}</td>
              <td>{inv.date}</td>
              <td>${inv.amount}</td>
              <td>{inv.status}</td>
              <td>
                <Link className="text-blue-700" to={inv.id}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button asChild>
        <Link to="new">Add Inventory</Link>
      </Button>
      <Outlet />
    </>
  );
}
