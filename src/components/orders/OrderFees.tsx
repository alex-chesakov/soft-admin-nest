import { OrderItem } from "@/types/order";
import { OrderSummary } from "./OrderSummary";
import { OrderItemComponent } from "./OrderItem";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";

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
      const quantity = item.adjustedQuantity !== undefined ? item.adjustedQuantity : item.quantity;
      return acc + (price * quantity);
    }, 0),
    serviceFee: fees.serviceFee,
    creditCardFee: fees.creditCardFee,
    total: 0
  } : undefined;

  // Calculate the adjusted total if there are adjustments
  if (adjustedFees) {
    adjustedFees.total = adjustedFees.subtotal + adjustedFees.serviceFee + adjustedFees.creditCardFee;
  }

  // Load item statuses from dictionary storage
  const itemStatuses = loadDictionaryItems('item-statuses');

  return (
    <div className="space-y-6">
      {items.map(item => (
        <OrderItemComponent
          key={item.id}
          item={item}
          onQuantityChange={(itemId, change) => {
            const updatedItems = items.map(i => {
              if (i.id === itemId) {
                const currentQuantity = i.adjustedQuantity !== undefined ? i.adjustedQuantity : i.quantity;
                const newQuantity = currentQuantity + change;
                return { ...i, adjustedQuantity: newQuantity >= 0 ? newQuantity : 0 };
              }
              return i;
            });
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