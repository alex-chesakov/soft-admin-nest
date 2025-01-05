import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, User, UserCog } from "lucide-react";
import { OrderHeader } from "@/components/orders/OrderHeader";
import { OrderDetailsSummary } from "@/components/orders/OrderDetailsSummary";
import { RequirementsEditDialog } from "@/components/orders/RequirementsEditDialog";
import { CustomerInfoEditDialog } from "@/components/orders/CustomerInfoEditDialog";
import { CollectorInfoEditDialog } from "@/components/orders/CollectorInfoEditDialog";
import { useToast } from "@/hooks/use-toast";

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
  pickupLocations: { name: string; address: string }[];
  deliveryLocation: { name: string; address: string };
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
  },
  pickupLocations: [
    {
      name: "Restaurant Depo",
      address: "1300 Mariposa ave, San Jose"
    },
    {
      name: "Costco",
      address: "150 Lawrence station drive, Sunnyvale"
    }
  ],
  deliveryLocation: {
    name: "Main Kitchen",
    address: "2500 El Camino Real, Palo Alto, CA 94306"
  }
};

const OrderDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const handleStatusUpdate = (newStatus: string) => {
    console.log('Updating order status:', newStatus);
    toast({
      title: "Order status updated",
      description: `Status changed to ${newStatus}`,
    });
    // TODO: Implement the update logic
  };

  const handleRequirementsUpdate = (requirements: string[]) => {
    console.log('Updating requirements:', requirements);
    // TODO: Implement the update logic
  };

  const handleCustomerInfoUpdate = (data: {
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  }) => {
    console.log('Updating customer info:', data);
    // TODO: Implement the update logic
  };

  const handleCollectorInfoUpdate = (data: {
    name: string;
    phone: string;
    email: string;
  }) => {
    console.log('Updating collector info:', data);
    // TODO: Implement the update logic
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <OrderHeader 
          id={id || ''} 
          date={mockOrder.date} 
          status={mockOrder.status}
          onStatusUpdate={handleStatusUpdate}
        />

        <OrderDetailsSummary
          deliveryDate={mockOrder.deliveryDate}
          deliveryWindow={mockOrder.deliveryWindow}
          paymentStatus={mockOrder.paymentStatus}
          itemsCount={mockOrder.items.length}
          pickupLocations={mockOrder.pickupLocations}
          deliveryLocation={mockOrder.deliveryLocation}
        />

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
            <CardTitle className="flex items-center justify-between text-lg">
              <span>Order Requirements</span>
              <RequirementsEditDialog
                requirements={mockOrder.requirements || []}
                onSave={handleRequirementsUpdate}
              />
            </CardTitle>
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
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </div>
              <CustomerInfoEditDialog
                customerName={mockOrder.customerName}
                email={mockOrder.email}
                phone={mockOrder.phone}
                shippingAddress={mockOrder.shippingAddress}
                onSave={handleCustomerInfoUpdate}
              />
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
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                Collector Information
              </div>
              <CollectorInfoEditDialog
                collector={mockOrder.collector}
                onSave={handleCollectorInfoUpdate}
              />
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
