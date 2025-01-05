import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Order, OrderItem } from "@/types/order";

// Mock data with correct types
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    date: "2024-02-20",
    status: "pending",
    total: 299.99,
    items: [
      { id: 1, productName: "Product 1", quantity: 2, price: 149.99 },
      { id: 2, productName: "Product 2", quantity: 1, price: 149.99 }
    ],
    location: "New York",
    collector: {
      name: "Alice Smith",
      phone: "+1987654321",
      email: "alice@example.com"
    },
    paymentStatus: "paid",
    deliveryDate: "2024-02-22",
    deliveryWindow: "09:00 AM - 12:00 PM",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA"
    },
    pickupLocations: [{ name: "Warehouse A", address: "456 Storage St" }],
    deliveryLocation: { name: "Office", address: "789 Work Ave" }
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    date: "2024-02-19",
    status: "completed",
    total: 159.99,
    items: [
      { id: 3, productName: "Product 3", quantity: 1, price: 159.99 }
    ],
    location: "Los Angeles",
    collector: {
      name: "Bob Johnson",
      phone: "+1987654322",
      email: "bob@example.com"
    },
    paymentStatus: "pending",
    deliveryDate: "2024-02-21",
    deliveryWindow: "02:00 PM - 05:00 PM",
    shippingAddress: {
      street: "456 Oak St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA"
    },
    pickupLocations: [{ name: "Store B", address: "123 Retail St" }],
    deliveryLocation: { name: "Home", address: "321 Home Ave" }
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