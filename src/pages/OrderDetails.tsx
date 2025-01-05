import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package2, User, UserCog, Info } from "lucide-react";

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
  requirements?: string[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  collector?: {
    name: string;
    phone: string;
    email: string;
  };
  deliveryDate: string;
  deliveryWindow: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  fees?: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
}

// Mock data for demonstration
const mockOrder: Order = {
  id: "ORD-001",
  customerName: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  date: "2024-02-20",
  status: "processing",
  total: 99.99,
  items: [
    { id: 1, productName: "Product 1", quantity: 2, price: 99.99 },
    { id: 2, productName: "Product 2", quantity: 1, price: 100.01 },
  ],
  requirements: [
    "Handle with care",
    "Temperature controlled",
    "Signature required"
  ],
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  collector: {
    name: "Alice Smith",
    phone: "+1 234 567 8901",
    email: "alice@example.com"
  },
  deliveryDate: "2024-02-22",
  deliveryWindow: "09:00 AM - 12:00 PM",
  paymentStatus: "paid",
  fees: {
    subtotal: 81.29,
    serviceFee: 16.26,
    creditCardFee: 2.44
  }
};

const OrderDetails = () => {
  const { id } = useParams();

  // ... keep existing code (header section with status badge)

  return (
    <div className="flex gap-6">
      {/* Main Content */}
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

        {/* Order Details Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Delivery Date</p>
                <p className="font-medium">{mockOrder.deliveryDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery Window</p>
                <p className="font-medium">{mockOrder.deliveryWindow}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <Badge variant={mockOrder.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                  {mockOrder.paymentStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="font-medium">{mockOrder.items.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-4 space-y-2 border-t">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Subtotal</p>
                  <p>${mockOrder.fees?.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Service Fee</p>
                  <p>${mockOrder.fees?.serviceFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Credit Card Fee (2.5%)</p>
                  <p>${mockOrder.fees?.creditCardFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <p>Estimated Total</p>
                  <p>${mockOrder.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Order Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {mockOrder.requirements?.map((req, index) => (
                <li key={index} className="text-gray-600">{req}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{mockOrder.customerName}</p>
                <p className="text-sm text-gray-500">{mockOrder.email}</p>
                <p className="text-sm text-gray-500">{mockOrder.phone}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Shipping Address</p>
                <p className="text-sm text-gray-500">{mockOrder.shippingAddress.street}</p>
                <p className="text-sm text-gray-500">
                  {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state}{" "}
                  {mockOrder.shippingAddress.zip}
                </p>
                <p className="text-sm text-gray-500">{mockOrder.shippingAddress.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collector Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCog className="h-5 w-5" />
              Collector Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockOrder.collector ? (
              <div className="space-y-2">
                <p className="font-medium">{mockOrder.collector.name}</p>
                <p className="text-sm text-gray-500">{mockOrder.collector.email}</p>
                <p className="text-sm text-gray-500">{mockOrder.collector.phone}</p>
              </div>
            ) : (
              <p className="text-gray-500">No collector assigned</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
