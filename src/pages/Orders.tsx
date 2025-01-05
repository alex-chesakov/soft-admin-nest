import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrdersTable } from "@/components/orders/OrdersTable";

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: number;
  location?: string;
  collector?: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  deliveryDate: string;
  deliveryWindow: string;
}

// Mock data with additional fields
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
  {
    id: "ORD-003",
    customerName: "Michael Brown",
    date: "2024-02-21",
    status: "processing",
    total: 450.50,
    items: 5,
    location: "Chicago",
    collector: "Carol Williams",
    paymentStatus: "paid",
    deliveryDate: "2024-02-23",
    deliveryWindow: "10:00 AM - 01:00 PM"
  },
  {
    id: "ORD-004",
    customerName: "Emily Davis",
    date: "2024-02-21",
    status: "pending",
    total: 275.25,
    items: 3,
    location: "Miami",
    collector: "David Miller",
    paymentStatus: "pending",
    deliveryDate: "2024-02-23",
    deliveryWindow: "01:00 PM - 04:00 PM"
  },
  {
    id: "ORD-005",
    customerName: "William Wilson",
    date: "2024-02-20",
    status: "cancelled",
    total: 189.99,
    items: 2,
    location: "Boston",
    collector: "Emma Davis",
    paymentStatus: "failed",
    deliveryDate: "2024-02-22",
    deliveryWindow: "03:00 PM - 06:00 PM"
  },
  {
    id: "ORD-006",
    customerName: "Sarah Johnson",
    date: "2024-02-22",
    status: "processing",
    total: 567.80,
    items: 6,
    location: "Seattle",
    collector: "Frank White",
    paymentStatus: "paid",
    deliveryDate: "2024-02-24",
    deliveryWindow: "11:00 AM - 02:00 PM"
  },
  {
    id: "ORD-007",
    customerName: "Robert Martin",
    date: "2024-02-22",
    status: "completed",
    total: 345.60,
    items: 4,
    location: "Denver",
    collector: "Grace Lee",
    paymentStatus: "paid",
    deliveryDate: "2024-02-24",
    deliveryWindow: "09:00 AM - 12:00 PM"
  },
  {
    id: "ORD-008",
    customerName: "Lisa Anderson",
    date: "2024-02-21",
    status: "pending",
    total: 234.75,
    items: 3,
    location: "Phoenix",
    collector: "Henry Chen",
    paymentStatus: "pending",
    deliveryDate: "2024-02-23",
    deliveryWindow: "02:00 PM - 05:00 PM"
  },
  {
    id: "ORD-009",
    customerName: "James Taylor",
    date: "2024-02-20",
    status: "processing",
    total: 678.90,
    items: 7,
    location: "Houston",
    collector: "Isabel Rodriguez",
    paymentStatus: "paid",
    deliveryDate: "2024-02-22",
    deliveryWindow: "10:00 AM - 01:00 PM"
  },
  {
    id: "ORD-010",
    customerName: "Patricia Moore",
    date: "2024-02-22",
    status: "completed",
    total: 423.45,
    items: 4,
    location: "Atlanta",
    collector: "Jack Thompson",
    paymentStatus: "paid",
    deliveryDate: "2024-02-24",
    deliveryWindow: "01:00 PM - 04:00 PM"
  },
  {
    id: "ORD-011",
    customerName: "Thomas Clark",
    date: "2024-02-21",
    status: "pending",
    total: 289.99,
    items: 3,
    location: "San Diego",
    collector: "Kelly Brown",
    paymentStatus: "pending",
    deliveryDate: "2024-02-23",
    deliveryWindow: "03:00 PM - 06:00 PM"
  },
  {
    id: "ORD-012",
    customerName: "Nancy Lee",
    date: "2024-02-20",
    status: "cancelled",
    total: 156.78,
    items: 2,
    location: "Portland",
    collector: "Liam Wilson",
    paymentStatus: "failed",
    deliveryDate: "2024-02-22",
    deliveryWindow: "11:00 AM - 02:00 PM"
  }
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
        if (savedStatus) {
          return { 
            ...order, 
            status: savedStatus as 'pending' | 'processing' | 'completed' | 'cancelled' 
          };
        }
        return order;
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