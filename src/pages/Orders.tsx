import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Order } from "@/types/order";

// Mock data with correct status types
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    date: "2024-02-20",
    status: "pending",
    total: 299.99,
    items: 3,
    location: "New York",
    collector: "Alice Smith",
    paymentStatus: "paid",
    deliveryDate: "2024-02-22",
    deliveryWindow: "09:00 AM - 12:00 PM"
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    date: "2024-02-19",
    status: "completed",
    total: 159.99,
    items: 2,
    location: "Los Angeles",
    collector: "Bob Johnson",
    paymentStatus: "pending",
    deliveryDate: "2024-02-21",
    deliveryWindow: "02:00 PM - 05:00 PM"
  },
];

const locations = ["All Locations", "New York", "Los Angeles", "Chicago", "Miami"];
const collectors = ["All Collectors", "Alice Smith", "Bob Johnson", "Carol Williams"];
const statuses = ["All Statuses", "pending", "processing", "completed", "cancelled"];

const Orders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      // Simulate API call
      const ordersWithSavedStatus = mockOrders.map(order => {
        const savedStatus = localStorage.getItem(`order-status-${order.id}`);
        return savedStatus ? { ...order, status: savedStatus as Order['status'] } : order;
      });
      return new Promise<Order[]>((resolve) => {
        setTimeout(() => resolve(ordersWithSavedStatus), 1000);
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Filter Zone */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <OrderFilters
            locations={locations}
            collectors={collectors}
            statuses={statuses}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;