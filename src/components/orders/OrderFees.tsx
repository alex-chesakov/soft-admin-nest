import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, Plus, Minus, Trash2, ChevronDown } from "lucide-react";
import { OrderItem } from "@/types/order";
import { ProductSearchBar } from "./ProductSearchBar";
import { loadDictionaryItems, getItemStatusColor } from "@/utils/dictionaryStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
        const randomStatus = itemStatuses[Math.floor(Math.random() * itemStatuses.length)];
        const productWithStatus: OrderItem = {
          ...newProduct,
          id: "CRT006",
          status: randomStatus.name,
          unit: "Unit" as const
        };
        onItemsChange([...items, productWithStatus]);
      }
    }
  };

  const handleStatusChange = (itemId: string, newStatus: string) => {
    if (onItemsChange) {
      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      );
      onItemsChange(updatedItems);
      toast({
        title: "Status updated",
        description: `Item status changed to ${newStatus}`,
      });
    }
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    if (onItemsChange) {
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      onItemsChange(updatedItems);
    }
  };

  const handleUnitChange = (itemId: string, unit: "Unit" | "Case") => {
    if (onItemsChange) {
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          const basePrice = unit === "Case" ? item.price / 10 : item.price * 10;
          return {
            ...item,
            unit,
            price: unit === "Case" ? basePrice * 10 : basePrice / 10
          };
        }
        return item;
      });
      onItemsChange(updatedItems);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (onItemsChange) {
      const updatedItems = items.filter((item) => item.id !== itemId);
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
            <div key={item.id} className="flex justify-between items-start border-b pb-4 last:border-0">
              <div className="space-y-1 flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">ID: {item.id}</p>
                <p className="text-sm text-gray-500 mt-2">Price: ${item.price.toFixed(2)}/{item.unit || 'Unit'}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500">Booked Qty:</label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) - item.quantity)}
                        className="w-16 h-8 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Select
                    value={item.unit || "Unit"}
                    onValueChange={(value) => handleUnitChange(item.id, value as "Unit" | "Case")}
                  >
                    <SelectTrigger className="w-24 h-8">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unit">Unit</SelectItem>
                      <SelectItem value="Case">Case</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="text-xs px-2 py-1 rounded inline-flex items-center gap-1 hover:opacity-90 transition-opacity"
                      style={{ 
                        backgroundColor: getItemStatusColor(item.status || 'Not collected'),
                        color: 'white'
                      }}
                    >
                      {item.status || 'Not collected'}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="space-y-1">
                      {itemStatuses.map((status) => (
                        <button
                          key={status.id}
                          className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100"
                          onClick={() => handleStatusChange(item.id, status.name)}
                        >
                          {status.name}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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