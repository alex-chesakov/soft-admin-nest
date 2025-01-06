import { OrderItem } from "@/types/order";
import { OrderSummary } from "./OrderSummary";

interface OrderFeesProps {
  items: OrderItem[];
  fees: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  total: number;
  onItemsChange: (items: OrderItem[]) => void;
  role?: 'admin' | 'collector';
}

export const OrderFees = ({
  items,
  fees,
  total,
  onItemsChange,
  role = 'admin'
}: OrderFeesProps) => {
  // Calculate adjusted fees if there are any adjusted quantities
  const hasAdjustments = items.some(item => item.adjustedQuantity !== undefined);
  
  const adjustedFees = hasAdjustments ? {
    subtotal: items.reduce((acc, item) => {
      const price = item.unit === "Case" ? item.price * 10 : item.price;
      return acc + price * (item.adjustedQuantity || item.quantity);
    }, 0),
    serviceFee: fees.serviceFee, // Keep the same service fee
    creditCardFee: fees.creditCardFee, // Keep the same credit card fee
    total: 0 // Will be calculated below
  } : undefined;

  // Calculate the adjusted total if there are adjustments
  if (adjustedFees) {
    adjustedFees.total = adjustedFees.subtotal + adjustedFees.serviceFee + adjustedFees.creditCardFee;
  }

  return (
    <div className="space-y-6">
      {items.map(item => (
        <OrderItemComponent
          key={item.id}
          item={item}
          onQuantityChange={(itemId, change) => {
            const updatedItems = items.map(i => 
              i.id === itemId ? { ...i, adjustedQuantity: (i.adjustedQuantity || 0) + change } : i
            );
            onItemsChange(updatedItems);
          }}
          onUnitChange={(itemId, unit) => {
            const updatedItems = items.map(i => 
              i.id === itemId ? { ...i, unit } : i
            );
            onItemsChange(updatedItems);
          }}
          onStatusChange={(itemId, newStatus, adjustedQty) => {
            const updatedItems = items.map(i => 
              i.id === itemId ? { ...i, status: newStatus, adjustedQuantity: adjustedQty } : i
            );
            onItemsChange(updatedItems);
          }}
          onDelete={(itemId) => {
            const updatedItems = items.filter(i => i.id !== itemId);
            onItemsChange(updatedItems);
          }}
          itemStatuses={itemStatuses}
          role={role}
        />
      ))}
      
      <OrderSummary
        fees={fees}
        total={total}
        role={role}
        adjustedFees={adjustedFees}
      />
    </div>
  );
};
