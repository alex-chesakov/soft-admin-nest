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
import { Button } from "@/components/ui/button";

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
          items: savedProducts.map(item => ({
            ...item,
            id: String(item.id)
          })) as OrderItem[]
        }));
      } else {
        saveOrderProducts(id, orderDetails.items);
      }
    }
  }, [id]);

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

  const handleChargeClient = () => {
    toast({
      title: "Processing charge",
      description: "Client charge initiated",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
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
            items={orderDetails.items as OrderItem[]}
            fees={orderDetails.fees}
            total={orderDetails.total}
            onItemsChange={(items) => {
              setOrderDetails(prev => ({
                ...prev,
                items
              }));
              if (id) {
                saveOrderProducts(id, items);
              }
            }}
          />
        </div>

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
      
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleChargeClient}
          className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white"
        >
          Charge Client
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
