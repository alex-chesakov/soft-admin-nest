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
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Info className="h-5 w-5 text-muted-foreground" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Delivery Date</p>
              <p className="font-medium">{deliveryDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivery Window</p>
              <p className="font-medium">{deliveryWindow}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <Badge 
                variant={paymentStatus === 'paid' ? 'default' : 'secondary'}
                className="mt-0.5"
              >
                {paymentStatus}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="font-medium">{itemsCount}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2 border-t">
            <div>
              <p className="text-sm font-medium mb-2">Delivery from:</p>
              <div className="space-y-2">
                {pickupLocations.map((location, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-primary">{location.name}</p>
                    <p className="text-muted-foreground">{location.address}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Delivery to:</p>
              <div className="text-sm">
                <p className="font-medium text-primary">{deliveryLocation.name}</p>
                <p className="text-muted-foreground">{deliveryLocation.address}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};