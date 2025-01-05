import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { CustomerInfoEditDialog } from "./CustomerInfoEditDialog";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
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
      </CardHeader>
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
    </Card>
  );
};

export default CustomerInformation;