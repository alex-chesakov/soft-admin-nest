import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";
import Customers from "@/pages/Customers";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import Admins from "@/pages/users/Admins";
import Collectors from "@/pages/users/Collectors";
import Locations from "@/pages/Locations";
import Dictionaries from "@/pages/Dictionaries";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/admins" element={<Admins />} />
            <Route path="/users/collectors" element={<Collectors />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/dictionaries" element={<Dictionaries />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;