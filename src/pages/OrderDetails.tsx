import { OrderStatusSection } from "@/components/orders/OrderStatusSection";
import { OrderDetailsSummary } from "@/components/orders/OrderDetailsSummary";
import { OrderFees } from "@/components/orders/OrderFees";
import { useParams } from "react-router-dom";
import { mockOrder } from "@/data/mockOrder";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CustomerInformation from "@/components/orders/CustomerInformation";
import CollectorInformation from "@/components/orders/CollectorInformation";
import { RequirementsSummary } from "@/components/orders/RequirementsSummary";
import { saveOrderProducts, getOrderProducts } from "@/utils/productStorage";
import { OrderItem } from "@/types/order";

const OrderDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState(mockOrder);

  useEffect(() => {
    if (id) {
      const savedProducts = getOrderProducts(id);
      if (savedProducts.length > 0) {
        setOrderDetails(prev => ({
          ...prev,
          items: savedProducts
        }));
      } else {
        saveOrderProducts(id, orderDetails.items);
      }
    }
  }, [id]);

  const handleItemsUpdate = (updatedItems: OrderItem[]) => {
    if (id) {
      // Calculate new fees based on updated items
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const serviceFee = subtotal * 0.1; // 10% service fee
      const creditCardFee = subtotal * 0.03; // 3% credit card fee
      const newTotal = subtotal + serviceFee + creditCardFee;

      const updatedOrder = {
        ...orderDetails,
        items: updatedItems,
        fees: {
          subtotal,
          serviceFee,
          creditCardFee,
        },
        total: newTotal,
      };

      setOrderDetails(updatedOrder);
      saveOrderProducts(id, updatedItems);
    }
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

  const handleRequirementsUpdate = (requirements: string[]) => {
    const updatedOrder = {
      ...orderDetails,
      requirements,
    };
    setOrderDetails(updatedOrder);
    
    toast({
      title: "Success",
      description: "Order requirements have been updated",
    });
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
          onItemsUpdate={handleItemsUpdate}
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        <RequirementsSummary
          requirements={orderDetails.requirements || []}
          onUpdate={handleRequirementsUpdate}
        />

        <CustomerInformation
          customerName={orderDetails.customerName}
          email={orderDetails.email}
          phone={orderDetails.phone}
          shippingAddress={orderDetails.shippingAddress}
          onSave={handleCustomerInfoUpdate}
          onLocationUpdate={handleDeliveryLocationUpdate}
        />

        <CollectorInformation
          collector={orderDetails.collector}
          onSave={handleCollectorInfoUpdate}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
