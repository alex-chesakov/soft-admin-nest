import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, User } from "lucide-react";
import { CustomerInfoEditDialog } from "./CustomerInfoEditDialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CustomerInformationProps {
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
  onSave: (data: {
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
  }) => void;
  onLocationUpdate: (location: { name: string; address: string }) => void;
  role?: 'admin' | 'collector';
}

const CustomerInformation = ({
  customerName,
  email,
  phone,
  shippingAddress,
  onSave,
  onLocationUpdate,
  role = 'admin',
}: CustomerInformationProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </div>
              {role === 'admin' && (
                <CustomerInfoEditDialog
                  customerName={customerName}
                  email={email}
                  phone={phone}
                  shippingAddress={shippingAddress}
                  onSave={onSave}
                  onLocationUpdate={onLocationUpdate}
                />
              )}
            </CardTitle>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "transform rotate-180" : ""
            )} />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{customerName}</p>
                <p className="text-sm text-gray-500">{email}</p>
                <p className="text-sm text-gray-500">{phone}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Shipping Address</p>
                <p className="text-sm text-gray-500">{shippingAddress.street}</p>
                <p className="text-sm text-gray-500">
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.zip}
                </p>
                <p className="text-sm text-gray-500">{shippingAddress.country}</p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default CustomerInformation;