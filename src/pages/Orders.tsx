import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

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
];

const locations = ["All Locations", "New York", "Los Angeles", "Chicago", "Miami"];
const collectors = ["All Collectors", "Alice Smith", "Bob Johnson", "Carol Williams"];
const statuses = ["All Statuses", "pending", "processing", "completed", "cancelled"];

const Orders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return new Promise<Order[]>((resolve) => {
        setTimeout(() => resolve(mockOrders), 1000);
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
              />
            </div>

            {/* Location Filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Collector Filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Collector" />
              </SelectTrigger>
              <SelectContent>
                {collectors.map((collector) => (
                  <SelectItem key={collector} value={collector.toLowerCase()}>
                    {collector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status.toLowerCase()}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Collector</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Time Window</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "pending"
                          ? "secondary"
                          : order.status === "processing"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.paymentStatus === "paid"
                          ? "default"
                          : order.paymentStatus === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.location}</TableCell>
                  <TableCell>{order.collector}</TableCell>
                  <TableCell>{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{order.deliveryWindow}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;