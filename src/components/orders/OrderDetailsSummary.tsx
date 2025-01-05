import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderDetailsSummaryProps {
  deliveryDate: string;
  deliveryWindow: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  itemsCount: number;
  pickupLocations: { name: string; address: string }[];
  deliveryLocation: { name: string; address: string };
}

export const OrderDetailsSummary = ({
  deliveryDate,
  deliveryWindow,
  paymentStatus,
  itemsCount,
  pickupLocations,
  deliveryLocation,
}: OrderDetailsSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Delivery Date</p>
              <p className="font-medium">{deliveryDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Window</p>
              <p className="font-medium">{deliveryWindow}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <Badge variant={paymentStatus === 'paid' ? 'default' : 'secondary'}>
                {paymentStatus}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="font-medium">{itemsCount}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Delivery from:</p>
              {pickupLocations.map((location, index) => (
                <div key={index} className="text-sm text-gray-600 mb-2">
                  {location.name} - {location.address}
                </div>
              ))}
            </div>
            <div>
              <p className="font-medium mb-2">Delivery to:</p>
              <div className="text-sm text-gray-600">
                {deliveryLocation.name} - {deliveryLocation.address}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};