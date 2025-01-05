import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserCog } from "lucide-react";
import { OrderStatusSection } from "@/components/orders/OrderStatusSection";
import { OrderDetailsSummary } from "@/components/orders/OrderDetailsSummary";
import { RequirementsEditDialog } from "@/components/orders/RequirementsEditDialog";
import { CustomerInfoEditDialog } from "@/components/orders/CustomerInfoEditDialog";
import { CollectorInfoEditDialog } from "@/components/orders/CollectorInfoEditDialog";
import { OrderFees } from "@/components/orders/OrderFees";
import { useParams } from "react-router-dom";
import { mockOrder } from "@/data/mockOrder";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [requirements, setRequirements] = useState(mockOrder.requirements || []);
  const [orderDetails, setOrderDetails] = useState(mockOrder);

  const handleRequirementsUpdate = (updatedRequirements: string[]) => {
    setRequirements(updatedRequirements);
    localStorage.setItem(`order-requirements-${id}`, JSON.stringify(updatedRequirements));
    
    toast({
      title: "Requirements updated",
      description: "Order requirements have been successfully updated",
    });
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
    const updatedOrder = {
      ...orderDetails,
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      shippingAddress: data.shippingAddress,
    };
    setOrderDetails(updatedOrder);
    
    toast({
      title: "Success",
      description: "Customer information has been updated",
    });
  };

  const handleCollectorInfoUpdate = (data: {
    name: string;
    phone: string;
    email: string;
  }) => {
    const updatedOrder = {
      ...orderDetails,
      collector: data,
    };
    setOrderDetails(updatedOrder);
    
    toast({
      title: "Success",
      description: "Collector information has been updated",
    });
  };

  const handleDeliveryLocationUpdate = (location: { name: string; address: string }) => {
    const updatedOrder = {
      ...orderDetails,
      deliveryLocation: location,
    };
    setOrderDetails(updatedOrder);
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <OrderStatusSection 
          id={id || ''} 
          date={orderDetails.date} 
          initialStatus={orderDetails.status}
        />

        <OrderDetailsSummary
          deliveryDate={orderDetails.deliveryDate}
          deliveryWindow={orderDetails.deliveryWindow}
          paymentStatus={orderDetails.paymentStatus}
          itemsCount={orderDetails.items.length}
          pickupLocations={orderDetails.pickupLocations}
          deliveryLocation={orderDetails.deliveryLocation}
          onDeliveryLocationUpdate={handleDeliveryLocationUpdate}
        />

        <OrderFees
          items={orderDetails.items}
          fees={orderDetails.fees || { subtotal: 0, serviceFee: 0, creditCardFee: 0 }}
          total={orderDetails.total}
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Order Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <span>Order Requirements</span>
              <RequirementsEditDialog
                requirements={requirements}
                onSave={handleRequirementsUpdate}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {requirements.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="text-gray-600">{req}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No requirements specified</p>
            )}
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
                customerName={orderDetails.customerName}
                email={orderDetails.email}
                phone={orderDetails.phone}
                shippingAddress={orderDetails.shippingAddress}
                onSave={handleCustomerInfoUpdate}
                onLocationUpdate={handleDeliveryLocationUpdate}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{orderDetails.customerName}</p>
                <p className="text-sm text-gray-500">{orderDetails.email}</p>
                <p className="text-sm text-gray-500">{orderDetails.phone}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Shipping Address</p>
                <p className="text-sm text-gray-500">{orderDetails.shippingAddress.street}</p>
                <p className="text-sm text-gray-500">
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                  {orderDetails.shippingAddress.zip}
                </p>
                <p className="text-sm text-gray-500">{orderDetails.shippingAddress.country}</p>
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
                collector={orderDetails.collector}
                onSave={handleCollectorInfoUpdate}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orderDetails.collector ? (
              <div className="space-y-2">
                <p className="font-medium">{orderDetails.collector.name}</p>
                <p className="text-sm text-gray-500">{orderDetails.collector.email}</p>
                <p className="text-sm text-gray-500">{orderDetails.collector.phone}</p>
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