import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import { OrderItem } from "@/types/order";
import { ProductSearchBar } from "./ProductSearchBar";
import { loadDictionaryItems, getItemStatusColor } from "@/utils/dictionaryStorage";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface OrderFeesProps {
  items: OrderItem[];
  fees: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  total: number;
  onItemsChange?: (items: OrderItem[]) => void;
}

export const OrderFees = ({ items, fees, total, onItemsChange }: OrderFeesProps) => {
  const itemStatuses = loadDictionaryItems('item-statuses');

  const handleProductSelect = (newProduct: OrderItem) => {
    if (onItemsChange) {
      const existingProduct = items.find(
        (item) => item.productName === newProduct.productName
      );

      if (existingProduct) {
        const updatedItems = items.map((item) =>
          item.productName === newProduct.productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        onItemsChange(updatedItems);
      } else {
        // Randomly select a status from the dictionary
        const randomStatus = itemStatuses[Math.floor(Math.random() * itemStatuses.length)];
        const productWithStatus: OrderItem = {
          ...newProduct,
          id: "CRT006",
          status: randomStatus.name,
          unit: "Unit" as const // Explicitly type as "Unit"
        };
        onItemsChange([...items, productWithStatus]);
      }
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (onItemsChange && newQuantity >= 0) {
      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      onItemsChange(updatedItems);
    }
  };

  const handleUnitChange = (itemId: string, unit: "Unit" | "Case") => {
    if (onItemsChange) {
      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, unit } : item
      );
      onItemsChange(updatedItems);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            Order Items
          </CardTitle>
          <ProductSearchBar onProductSelect={handleProductSelect} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{item.productName}</p>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: getItemStatusColor(item.status || 'Not collected'),
                      color: 'white'
                    }}
                  >
                    {item.status || 'Not collected'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">ID: {item.id}</p>
                <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}/{item.unit || 'Unit'}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500">Booked Qty:</label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 h-8"
                    />
                  </div>
                  <RadioGroup
                    value={item.unit || "Unit"}
                    onValueChange={(value) => handleUnitChange(item.id, value as "Unit" | "Case")}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="Unit" id={`unit-${item.id}`} />
                      <Label htmlFor={`unit-${item.id}`}>Unit</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="Case" id={`case-${item.id}`} />
                      <Label htmlFor={`case-${item.id}`}>Case</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <p className="font-medium ml-4">${(item.price * item.quantity).toFixed(2)}</p>
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