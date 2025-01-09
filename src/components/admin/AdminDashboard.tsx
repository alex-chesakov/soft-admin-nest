import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Order } from "@/types/order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeRange, setTimeRange] = useState("lifetime");

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

  const filterOrdersByTimeRange = (orders: Order[], range: string) => {
    const now = new Date();
    
    switch (range) {
      case "today":
        return orders.filter(order => {
          const orderDate = parseISO(order.date);
          return orderDate.toDateString() === now.toDateString();
        });
      case "current-week":
        return orders.filter(order => {
          const orderDate = parseISO(order.date);
          return isWithinInterval(orderDate, {
            start: startOfWeek(now),
            end: now
          });
        });
      case "last-week":
        const lastWeekStart = startOfWeek(now);
        lastWeekStart.setDate(lastWeekStart.getDate() - 7);
        const lastWeekEnd = endOfWeek(lastWeekStart);
        return orders.filter(order => {
          const orderDate = parseISO(order.date);
          return isWithinInterval(orderDate, {
            start: lastWeekStart,
            end: lastWeekEnd
          });
        });
      case "last-month":
        const lastMonthStart = startOfMonth(now);
        lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
        const lastMonthEnd = endOfMonth(lastMonthStart);
        return orders.filter(order => {
          const orderDate = parseISO(order.date);
          return isWithinInterval(orderDate, {
            start: lastMonthStart,
            end: lastMonthEnd
          });
        });
      default: // lifetime
        return orders;
    }
  };

  const getOrdersByLocation = (location: string) => {
    const filteredOrders = filterOrdersByTimeRange(orders, timeRange);
    return filteredOrders.filter(order => order.location === location).length;
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h2>
      <p className="text-muted-foreground mb-6">Welcome to your admin dashboard</p>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Number of Orders</h3>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lifetime">Lifetime</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="current-week">Current Week</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
    </>
  );
}