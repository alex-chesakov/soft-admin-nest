import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";
import { Order } from "@/types/order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimeRange = "lifetime" | "last-month" | "last-week" | "current-week";

export function CollectorDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [processingTimeRange, setProcessingTimeRange] = useState<TimeRange>("lifetime");
  const [completedOrdersRange, setCompletedOrdersRange] = useState<TimeRange>("lifetime");

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

  const filterOrdersByTimeRange = (orders: Order[], timeRange: TimeRange) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start of current week
    
    switch (timeRange) {
      case "lifetime":
        return orders;
      case "last-month": {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return orders.filter(order => new Date(order.date) >= lastMonth);
      }
      case "last-week": {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return orders.filter(order => new Date(order.date) >= lastWeek);
      }
      case "current-week":
        return orders.filter(order => new Date(order.date) >= startOfWeek);
      default:
        return orders;
    }
  };

  const getFilteredCompletedOrders = () => {
    const filteredOrders = filterOrdersByTimeRange(orders, completedOrdersRange);
    return filteredOrders.filter(order => order.status === "collected");
  };

  const calculateAverageProcessingTime = () => {
    const filteredOrders = filterOrdersByTimeRange(orders, processingTimeRange)
      .filter(order => order.status === "collected");
    
    if (filteredOrders.length === 0) return "N/A";
    
    const totalTime = filteredOrders.reduce((acc, order) => {
      const startDate = new Date(order.date);
      const endDate = new Date(order.deliveryDate);
      return acc + (endDate.getTime() - startDate.getTime());
    }, 0);
    
    const averageTime = totalTime / filteredOrders.length;
    const hours = Math.floor(averageTime / (1000 * 60 * 60));
    
    return `${hours} hours`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6">Collector Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Average Processing Time
              </CardTitle>
              <Select
                value={processingTimeRange}
                onValueChange={(value: TimeRange) => setProcessingTimeRange(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lifetime">Lifetime</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="current-week">Current Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateAverageProcessingTime()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Completed Orders
              </CardTitle>
              <Select
                value={completedOrdersRange}
                onValueChange={(value: TimeRange) => setCompletedOrdersRange(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lifetime">Lifetime</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="current-week">Current Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getFilteredCompletedOrders().length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}