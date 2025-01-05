import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { CustomerInfoEditDialog } from "./CustomerInfoEditDialog";
import { CustomerSelector } from "./CustomerSelector";
import { useState } from "react";

interface CustomerInformationProps {
  initialCustomerName: string;
  initialEmail: string;
  initialPhone: string;
  initialShippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  onUpdate: (data: {
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
}

export const CustomerInformation = ({
  initialCustomerName,
  initialEmail,
  initialPhone,
  initialShippingAddress,
  onUpdate,
}: CustomerInformationProps) => {
  const [customerName, setCustomerName] = useState(initialCustomerName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);

  const handleCustomerSelect = (user: { name: string; email: string; phone: string }) => {
    setCustomerName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    onUpdate({
      customerName: user.name,
      email: user.email,
      phone: user.phone,
      shippingAddress,
    });
  };

  const handleInfoUpdate = (data: {
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
    setCustomerName(data.customerName);
    setEmail(data.email);
    setPhone(data.phone);
    setShippingAddress(data.shippingAddress);
    onUpdate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </div>
          <CustomerInfoEditDialog
            customerName={customerName}
            email={email}
            phone={phone}
            shippingAddress={shippingAddress}
            onSave={handleInfoUpdate}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Name</label>
            <CustomerSelector 
              initialValue={customerName} 
              onSelect={handleCustomerSelect}
            />
          </div>
          <div>
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