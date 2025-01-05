import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface CustomerInformationProps {
  customer: {
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
  };
}

export const CustomerInformation = ({ customer }: CustomerInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span>{customer.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{customer.phone}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500 mt-1" />
            <div>
              <p>{customer.shippingAddress.street}</p>
              <p>
                {customer.shippingAddress.city}, {customer.shippingAddress.state}{" "}
                {customer.shippingAddress.zip}
              </p>
              <p>{customer.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};