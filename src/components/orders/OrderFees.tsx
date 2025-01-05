import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import { OrderItem } from "@/types/order";

interface OrderFeesProps {
  items: OrderItem[];
  fees: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  total: number;
}

export const OrderFees = ({ items, fees, total }: OrderFeesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-5 w-5" />
          Order Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="pt-4 space-y-2 border-t">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p>${fees.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Service Fee</p>
              <p>${fees.serviceFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Credit Card Fee (2.5%)</p>
              <p>${fees.creditCardFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <p>Estimated Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};