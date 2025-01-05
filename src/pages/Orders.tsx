import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Order } from "@/types/order";

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
  {
    id: "ORD-003",
    customerName: "Michael Johnson",
    email: "michael@example.com",
    phone: "+1234567892",
    date: "2024-02-18",
    status: "in transit",
    total: 429.99,
    items: [
      { id: 4, productName: "Product 4", quantity: 3, price: 143.33 }
    ],
    location: "Chicago",
    collector: {
      name: "David Wilson",
      phone: "+1987654323",
      email: "david@example.com"
    },
    paymentStatus: "paid",
    deliveryDate: "2024-02-20",
    deliveryWindow: "10:00 AM - 01:00 PM",
    shippingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA"
    },
    pickupLocations: [{ name: "Warehouse C", address: "789 Storage Blvd" }],
    deliveryLocation: { name: "Office", address: "456 Work St" }
  },
  {
    id: "ORD-004",
    customerName: "Sarah Brown",
    email: "sarah@example.com",
    phone: "+1234567893",
    date: "2024-02-17",
    status: "collector assigned",
    total: 699.99,
    items: [
      { id: 5, productName: "Product 5", quantity: 1, price: 699.99 }
    ],
    location: "Miami",
    collector: {
      name: "Emma Davis",
      phone: "+1987654324",
      email: "emma@example.com"
    },
    paymentStatus: "pending",
    deliveryDate: "2024-02-19",
    deliveryWindow: "12:00 PM - 03:00 PM",
    shippingAddress: {
      street: "321 Beach Rd",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA"
    },
    pickupLocations: [{ name: "Store C", address: "321 Shop Ave" }],
    deliveryLocation: { name: "Residence", address: "123 Beach Blvd" }
  },
  {
    id: "ORD-005",
    customerName: "Robert Wilson",
    email: "robert@example.com",
    phone: "+1234567894",
    date: "2024-02-16",
    status: "new order",
    total: 249.99,
    items: [
      { id: 6, productName: "Product 6", quantity: 2, price: 124.99 }
    ],
    location: "Boston",
    collector: null,
    paymentStatus: "failed",
    deliveryDate: "2024-02-18",
    deliveryWindow: "09:00 AM - 12:00 PM",
    shippingAddress: {
      street: "456 Harvard St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    },
    pickupLocations: [{ name: "Warehouse D", address: "456 Storage Lane" }],
    deliveryLocation: { name: "Home", address: "789 Beacon St" }
  },
  {
    id: "ORD-006",
    customerName: "Emily Taylor",
    email: "emily@example.com",
    phone: "+1234567895",
    date: "2024-02-15",
    status: "delivered",
    total: 899.99,
    items: [
      { id: 7, productName: "Product 7", quantity: 1, price: 899.99 }
    ],
    location: "Seattle",
    collector: {
      name: "James Miller",
      phone: "+1987654325",
      email: "james@example.com"
    },
    paymentStatus: "paid",
    deliveryDate: "2024-02-17",
    deliveryWindow: "02:00 PM - 05:00 PM",
    shippingAddress: {
      street: "123 Pike St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA"
    },
    pickupLocations: [{ name: "Store D", address: "123 Market St" }],
    deliveryLocation: { name: "Office", address: "456 Downtown Ave" }
  },
  {
    id: "ORD-007",
    customerName: "Daniel Martinez",
    email: "daniel@example.com",
    phone: "+1234567896",
    date: "2024-02-14",
    status: "in progress",
    total: 349.99,
    items: [
      { id: 8, productName: "Product 8", quantity: 3, price: 116.66 }
    ],
    location: "Houston",
    collector: {
      name: "Sophie Anderson",
      phone: "+1987654326",
      email: "sophie@example.com"
    },
    paymentStatus: "pending",
    deliveryDate: "2024-02-16",
    deliveryWindow: "11:00 AM - 02:00 PM",
    shippingAddress: {
      street: "789 Texas Ave",
      city: "Houston",
      state: "TX",
      zip: "77001",
      country: "USA"
    },
    pickupLocations: [{ name: "Warehouse E", address: "789 Industrial Pkwy" }],
    deliveryLocation: { name: "Residence", address: "321 Houston St" }
  },
  {
    id: "ORD-008",
    customerName: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+1234567897",
    date: "2024-02-13",
    status: "cancelled",
    total: 549.99,
    items: [
      { id: 9, productName: "Product 9", quantity: 1, price: 549.99 }
    ],
    location: "Denver",
    collector: {
      name: "Michael Brown",
      phone: "+1987654327",
      email: "michael.b@example.com"
    },
    paymentStatus: "failed",
    deliveryDate: "2024-02-15",
    deliveryWindow: "01:00 PM - 04:00 PM",
    shippingAddress: {
      street: "456 Mountain Rd",
      city: "Denver",
      state: "CO",
      zip: "80201",
      country: "USA"
    },
    pickupLocations: [{ name: "Store E", address: "456 Highland St" }],
    deliveryLocation: { name: "Home", address: "789 Valley Ave" }
  },
  {
    id: "ORD-009",
    customerName: "William Clark",
    email: "william@example.com",
    phone: "+1234567898",
    date: "2024-02-12",
    status: "in transit",
    total: 799.99,
    items: [
      { id: 10, productName: "Product 10", quantity: 2, price: 399.99 }
    ],
    location: "Portland",
    collector: {
      name: "Oliver White",
      phone: "+1987654328",
      email: "oliver@example.com"
    },
    paymentStatus: "paid",
    deliveryDate: "2024-02-14",
    deliveryWindow: "10:00 AM - 01:00 PM",
    shippingAddress: {
      street: "123 Rose St",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "USA"
    },
    pickupLocations: [{ name: "Warehouse F", address: "123 Warehouse Row" }],
    deliveryLocation: { name: "Office", address: "456 Business Center" }
  },
  {
    id: "ORD-010",
    customerName: "Emma Rodriguez",
    email: "emma.r@example.com",
    phone: "+1234567899",
    date: "2024-02-11",
    status: "delivered",
    total: 449.99,
    items: [
      { id: 11, productName: "Product 11", quantity: 1, price: 449.99 }
    ],
    location: "San Diego",
    collector: {
      name: "Lucas Thompson",
      phone: "+1987654329",
      email: "lucas@example.com"
    },
    paymentStatus: "paid",
    deliveryDate: "2024-02-13",
    deliveryWindow: "03:00 PM - 06:00 PM",
    shippingAddress: {
      street: "789 Coast Hwy",
      city: "San Diego",
      state: "CA",
      zip: "92101",
      country: "USA"
    },
    pickupLocations: [{ name: "Store F", address: "789 Beach Blvd" }],
    deliveryLocation: { name: "Residence", address: "321 Ocean View Dr" }
  },
  {
    id: "ORD-011",
    customerName: "Oliver Thompson",
    email: "oliver.t@example.com",
    phone: "+1234567890",
    date: "2024-02-10",
    status: "new order",
    total: 649.99,
    items: [
      { id: 12, productName: "Product 12", quantity: 3, price: 216.66 }
    ],
    location: "Phoenix",
    collector: null,
    paymentStatus: "pending",
    deliveryDate: "2024-02-12",
    deliveryWindow: "08:00 AM - 11:00 AM",
    shippingAddress: {
      street: "321 Desert Rd",
      city: "Phoenix",
      state: "AZ",
      zip: "85001",
      country: "USA"
    },
    pickupLocations: [{ name: "Warehouse G", address: "321 Storage Way" }],
    deliveryLocation: { name: "Home", address: "123 Cactus Ave" }
  },
  {
    id: "ORD-012",
    customerName: "Sophie Wilson",
    email: "sophie.w@example.com",
    phone: "+1234567891",
    date: "2024-02-09",
    status: "collector assigned",
    total: 299.99,
    items: [
      { id: 13, productName: "Product 13", quantity: 1, price: 299.99 }
    ],
    location: "Atlanta",
    collector: {
      name: "William Davis",
      phone: "+1987654330",
      email: "william.d@example.com"
    },
    paymentStatus: "paid",
    deliveryDate: "2024-02-11",
    deliveryWindow: "12:00 PM - 03:00 PM",
    shippingAddress: {
      street: "456 Peachtree St",
      city: "Atlanta",
      state: "GA",
      zip: "30301",
      country: "USA"
    },
    pickupLocations: [{ name: "Store G", address: "456 Market Square" }],
    deliveryLocation: { name: "Office", address: "789 Business Park" }
  }
];

const locations = ["All Locations", "New York", "Los Angeles", "Chicago", "Miami", "Boston", "Seattle", "Houston", "Denver", "Portland", "San Diego", "Phoenix", "Atlanta"];
const collectors = ["All Collectors", "Alice Smith", "Bob Johnson", "Carol Williams", "David Wilson", "Emma Davis", "James Miller", "Sophie Anderson", "Michael Brown", "Oliver White", "Lucas Thompson", "William Davis"];
const statuses = ["All Statuses", "new order", "collector assigned", "in progress", "in transit", "delivered", "cancelled"];

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
