import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: OrderItem[];
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
  date: "2024-02-20",
  status: "processing",
  total: 299.99,
  items: [
    { id: 1, productName: "Product 1", quantity: 2, price: 99.99 },
    { id: 2, productName: "Product 2", quantity: 1, price: 100.01 },
  ],
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
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Contact Details</h3>
                <p>{mockOrder.customerName}</p>
                <p>{mockOrder.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Shipping Address</h3>
                <p>{mockOrder.shippingAddress.street}</p>
                <p>
                  {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state}{" "}
                  {mockOrder.shippingAddress.zip}
                </p>
                <p>{mockOrder.shippingAddress.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4">
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