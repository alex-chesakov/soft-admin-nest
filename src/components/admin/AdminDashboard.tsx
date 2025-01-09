import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Order } from "@/types/order";

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = () => {
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 1000);

    return () => clearInterval(interval);
  }, []);

  const getOrdersByLocation = (location: string) => {
    return orders.filter(order => order.location === location).length;
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h2>
      <p className="text-muted-foreground mb-6">Welcome to your admin dashboard</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Number of Orders</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">San Jose</CardTitle>
                <MapPin className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getOrdersByLocation("San Jose")}</div>
                <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concord</CardTitle>
                <MapPin className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getOrdersByLocation("Concord")}</div>
                <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Oakland</CardTitle>
                <MapPin className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getOrdersByLocation("Oakland")}</div>
                <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}