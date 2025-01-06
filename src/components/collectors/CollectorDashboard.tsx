import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types/order";

const CollectorDashboard = () => {
  const { data: orders } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      // For now, using the mock data from localStorage
      const savedOrders = localStorage.getItem("orders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    },
    // Add refetchInterval to periodically check for updates
    refetchInterval: 1000,
  });

  const calculateAverageProcessingTime = () => {
    if (!orders || orders.length === 0) return "N/A";
    
    const completedOrders = orders.filter(order => 
      order.status === "delivered" || order.status === "collected"
    );
    
    if (completedOrders.length === 0) return "N/A";

    const totalProcessingTime = completedOrders.reduce((total, order) => {
      const startDate = new Date(order.date);
      const endDate = new Date(order.deliveryDate);
      return total + (endDate.getTime() - startDate.getTime());
    }, 0);

    const averageTimeInHours = (totalProcessingTime / completedOrders.length) / (1000 * 60 * 60);
    return `${averageTimeInHours.toFixed(1)} hours`;
  };

  const getCompletedOrdersCount = () => {
    if (!orders) return 0;
    return orders.filter(order => 
      order.status === "delivered" || order.status === "collected"
    ).length;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Processing Time
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateAverageProcessingTime()}</div>
          <p className="text-xs text-muted-foreground">
            Per completed order
          </p>
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
          <div className="text-2xl font-bold">{getCompletedOrdersCount()}</div>
          <p className="text-xs text-muted-foreground">
            Total completed orders
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectorDashboard;