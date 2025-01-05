import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface OrderDetailsSummaryProps {
  deliveryDate: string;
  deliveryWindow: string;
  paymentStatus: string;
  itemsCount: number;
  pickupLocations: { name: string; address: string }[];
  deliveryLocation: { name: string; address: string };
  onDeliveryLocationUpdate: (location: { name: string; address: string }) => void;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  role: 'admin' | 'collector';
  collectionWindow?: string;
}

export const OrderDetailsSummary = ({
  deliveryDate,
  deliveryWindow,
  paymentStatus,
  itemsCount,
  pickupLocations,
  deliveryLocation,
  onDeliveryLocationUpdate,
  shippingAddress,
  role,
  collectionWindow,
}: OrderDetailsSummaryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <CollapsibleTrigger className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-gray-600 transition-transform duration-200",
                isOpen ? "transform rotate-180" : ""
              )} 
            />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Delivery Date</p>
                <p className="font-medium">{deliveryDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Window</p>
                <p className="font-medium">{deliveryWindow}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className="font-medium">{paymentStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Items Count</p>
                <p className="font-medium">{itemsCount}</p>
              </div>
              {role === 'collector' && collectionWindow && (
                <div>
                  <p className="text-sm text-gray-600">Collection Window</p>
                  <p className="font-medium">{collectionWindow}</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Pickup Locations</h3>
              <div className="space-y-2">
                {pickupLocations.map((location, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Delivery Location</h3>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{deliveryLocation.name}</p>
                <p className="text-sm text-gray-600">{deliveryLocation.address}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}, {shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};