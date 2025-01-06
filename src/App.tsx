import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";
import CustomerDetails from "@/pages/CustomerDetails";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import Admins from "@/pages/users/Admins";
import Collectors from "@/pages/users/Collectors";
import Customers from "@/pages/users/Customers";
import Locations from "@/pages/Locations";
import Dictionaries from "@/pages/Dictionaries";
import CollectorDashboard from "@/pages/CollectorDashboard";
import { useEffect, useState } from "react";
import { UserRole } from "@/types/user";

const queryClient = new QueryClient();

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'admin';
  });

  useEffect(() => {
    const handleRoleChange = () => {
      const savedRole = localStorage.getItem('userRole');
      setCurrentRole((savedRole as UserRole) || 'admin');
    };

    window.addEventListener('storage', handleRoleChange);
    return () => window.removeEventListener('storage', handleRoleChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={currentRole === 'admin' ? <Index /> : <CollectorDashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/admins" element={<Admins />} />
            <Route path="/users/collectors" element={<Collectors />} />
            <Route path="/users/customers" element={<Customers />} />
            <Route path="/users/:id" element={<CustomerDetails />} />
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