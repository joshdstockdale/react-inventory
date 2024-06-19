import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from "./Inventory";
import InventoryDetail from "./InventoryDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <header className="h-20 w-full bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl">Howdy!</h1>
      </header>
      <div className="mx-10">
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Inventory />}>
                <Route path=":id" element={<InventoryDetail />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
