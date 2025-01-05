import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderRequirements } from "@/components/orders/OrderRequirements";
import { CustomerInformation } from "@/components/orders/CustomerInformation";
import { CollectorInformation } from "@/components/orders/CollectorInformation";

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: OrderItem[];
  requirements: string[];
  collector: {
    name: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

// Mock data for demonstration
const mockOrder: Order = {
  id: "ORD-001",
  customerName: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 890",
  date: "2024-02-20",
  status: "processing",
  total: 299.99,
  items: [
    { id: 1, productName: "Product 1", quantity: 2, price: 99.99 },
    { id: 2, productName: "Product 2", quantity: 1, price: 100.01 },
  ],
  requirements: [
    "Fragile items - handle with care",
    "Delivery between 9 AM - 5 PM",
    "Call customer before delivery"
  ],
  collector: {
    name: "Jane Smith",
    phone: "+1 234 567 891",
    email: "jane@example.com"
  },
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
};

const OrderDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="flex flex-row-reverse gap-6">
      {/* Left Content (now on the right) */}
      <div className="w-1/3 space-y-6 fixed right-8 top-8 bottom-8 overflow-y-auto">
        <OrderRequirements requirements={mockOrder.requirements} />
        <CustomerInformation customer={mockOrder} />
        <CollectorInformation collector={mockOrder.collector} />
      </div>

      {/* Main Content (now on the left) */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order {id}</h1>
            <p className="text-gray-500">Placed on {mockOrder.date}</p>
          </div>
          <Badge
            variant={
              mockOrder.status === "completed"
                ? "default"
                : mockOrder.status === "pending"
                ? "secondary"
                : mockOrder.status === "processing"
                ? "outline"
                : "destructive"
            }
          >
            {mockOrder.status}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>${mockOrder.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;