import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";
import { Order } from "@/types/order";

export function CollectorDashboard() {
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

  const completedOrders = orders.filter(order => order.status === "collected");
  
  const calculateAverageProcessingTime = () => {
    if (completedOrders.length === 0) return "N/A";
    
    const totalTime = completedOrders.reduce((acc, order) => {
      const startDate = new Date(order.date);
      const endDate = new Date(order.deliveryDate);
      return acc + (endDate.getTime() - startDate.getTime());
    }, 0);
    
    const averageTime = totalTime / completedOrders.length;
    const hours = Math.floor(averageTime / (1000 * 60 * 60));
    
    return `${hours} hours`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6">Collector Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Processing Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateAverageProcessingTime()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Orders
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}