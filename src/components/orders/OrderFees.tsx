import { OrderItem } from "@/types/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSearchBar } from "./ProductSearchBar";
import { useToast } from "@/hooks/use-toast";

interface OrderFeesProps {
  items: OrderItem[];
  fees: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  total: number;
  onItemsUpdate?: (items: OrderItem[]) => void;
}

export const OrderFees = ({ items, fees, total, onItemsUpdate }: OrderFeesProps) => {
  const { toast } = useToast();

  const handleAddProduct = (newItem: OrderItem) => {
    if (onItemsUpdate) {
      const updatedItems = [...items, newItem];
      onItemsUpdate(updatedItems);
      
      toast({
        title: "Product added",
        description: `${newItem.productName} has been added to the order.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Order Items & Fees</CardTitle>
        <ProductSearchBar onProductAdd={handleAddProduct} existingItems={items} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Items list */}
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center justify-between text-sm"
              >
                <span>
                  {item.productName} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Fees */}
          <div className="space-y-2 border-t pt-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${fees.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service Fee</span>
              <span>${fees.serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Credit Card Fee</span>
              <span>${fees.creditCardFee.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between border-t pt-2 font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};