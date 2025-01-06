import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import { OrderItem as OrderItemType } from "@/types/order";
import { ProductSearchBar } from "./ProductSearchBar";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";
import { useToast } from "@/hooks/use-toast";
import { OrderItemComponent } from "./OrderItem";
import { OrderSummary } from "./OrderSummary";

interface OrderFeesProps {
  items: OrderItemType[];
  fees: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  total: number;
  onItemsChange?: (items: OrderItemType[]) => void;
  role?: 'admin' | 'collector';
}

export const OrderFees = ({ items, fees, total, onItemsChange, role = 'admin' }: OrderFeesProps) => {
  const itemStatuses = loadDictionaryItems('item-statuses');
  const { toast } = useToast();

  // Calculate adjusted values based on adjusted quantities
  const calculateAdjustedValues = () => {
    const adjustedSubtotal = items.reduce((sum, item) => {
      const quantity = item.adjustedQuantity !== undefined ? item.adjustedQuantity : item.quantity;
      return sum + (item.price * quantity);
    }, 0);

    const adjustedServiceFee = adjustedSubtotal * (fees.serviceFee / fees.subtotal);
    const adjustedCreditCardFee = adjustedSubtotal * 0.025; // 2.5% of adjusted subtotal
    const adjustedTotal = adjustedSubtotal + adjustedServiceFee + adjustedCreditCardFee;

    return {
      adjustedSubtotal,
      adjustedServiceFee,
      adjustedCreditCardFee,
      adjustedTotal
    };
  };

  const adjustedValues = calculateAdjustedValues();
  const hasAdjustments = items.some(item => item.adjustedQuantity !== undefined);

  const handleProductSelect = (newProduct: OrderItemType) => {
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
        const productWithStatus: OrderItemType = {
          ...newProduct,
          id: "CRT006",
          status: randomStatus.name,
          unit: "Unit" as const
        };
        onItemsChange([...items, productWithStatus]);
      }
    }
  };

  const handleStatusChange = (itemId: string, newStatus: string, adjustedQty?: number) => {
    if (onItemsChange) {
      const updatedItems = items.map((item) =>
        item.id === itemId 
          ? { 
              ...item, 
              status: newStatus,
              adjustedQuantity: adjustedQty !== undefined ? adjustedQty : item.adjustedQuantity
            }
          : item
      );
      onItemsChange(updatedItems);
      toast({
        title: "Status updated",
        description: `Item status changed to ${newStatus}${adjustedQty ? ` with adjusted quantity: ${adjustedQty}` : ''}`,
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
            <OrderItemComponent
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onUnitChange={handleUnitChange}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteItem}
              itemStatuses={itemStatuses}
              role={role}
            />
          ))}
          <OrderSummary 
            fees={{
              ...fees,
              ...(hasAdjustments ? {
                adjustedSubtotal: adjustedValues.adjustedSubtotal,
                adjustedServiceFee: adjustedValues.adjustedServiceFee,
                adjustedCreditCardFee: adjustedValues.adjustedCreditCardFee,
              } : {})
            }}
            total={total}
            adjustedTotal={hasAdjustments ? adjustedValues.adjustedTotal : undefined}
            role={role}
          />
        </div>
      </CardContent>
    </Card>
  );
};
