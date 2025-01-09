import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemStatusPopover } from "./ItemStatusPopover";
import { getItemStatusColor } from "@/utils/dictionaryStorage";
import { OrderItem as OrderItemType } from "@/types/order";
import { Badge } from "@/components/ui/badge";

interface OrderItemProps {
  item: OrderItemType & { adjustedQuantity?: number };
  onQuantityChange: (itemId: string, change: number) => void;
  onUnitChange: (itemId: string, unit: "Unit" | "Case") => void;
  onStatusChange: (itemId: string, newStatus: string, adjustedQty?: number) => void;
  onDelete: (itemId: string) => void;
  itemStatuses: Array<{ id: string; name: string }>;
  role?: 'admin' | 'collector';
}

export const OrderItemComponent = ({
  item,
  onQuantityChange,
  onUnitChange,
  onStatusChange,
  onDelete,
  itemStatuses,
  role = 'admin'
}: OrderItemProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'in stock':
        return 'success';
      case 'low stock':
        return 'warning';
      case 'out of stock':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const displayPrice = item.unit === "Case" ? item.price * 10 : item.price;
  const originalTotal = displayPrice * item.quantity;
  const adjustedTotal = item.adjustedQuantity ? displayPrice * item.adjustedQuantity : null;

  return (
    <div className="flex flex-col border-b pb-4 last:border-0 relative min-h-[160px]">
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap pr-[140px]">
          <p className="font-medium">{item.productName}</p>
          {item.productStatus && (
            <Badge variant={getStatusBadgeVariant(item.productStatus)}>
              {item.productStatus}
            </Badge>
          )}
        </div>
        <p className="font-medium">BIN: {item.id}</p>
        <p className="text-sm text-gray-500 mt-2">Price: ${displayPrice.toFixed(2)}/{item.unit || 'Unit'}</p>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <label className={`text-sm text-gray-500 ${item.adjustedQuantity ? 'line-through text-gray-400' : ''}`}>Booked Qty:</label>
            {role === 'admin' && !item.adjustedQuantity ? (
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => onQuantityChange(item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) - item.quantity)}
                  className="w-16 h-8 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => onQuantityChange(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <span className={`text-sm font-medium ${item.adjustedQuantity ? 'line-through text-gray-400' : ''}`}>{item.quantity}</span>
            )}
          </div>
          {item.adjustedQuantity !== undefined && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-green-600">Adjusted Qty:</label>
              <span className="text-sm font-medium text-green-600">{item.adjustedQuantity}</span>
            </div>
          )}
          {role === 'admin' && !item.adjustedQuantity && (
            <Select
              value={item.unit || "Unit"}
              onValueChange={(value) => onUnitChange(item.id, value as "Unit" | "Case")}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Unit">Unit</SelectItem>
                <SelectItem value="Case">Case</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="absolute right-0 top-0 flex flex-col items-end gap-2 w-[140px]">
        <ItemStatusPopover
          status={item.status || 'Not collected'}
          statusColor={getItemStatusColor(item.status || 'Not collected')}
          onStatusChange={(newStatus, adjustedQty) => onStatusChange(item.id, newStatus, adjustedQty)}
          statuses={itemStatuses}
        />
        <div className="flex flex-col items-end gap-1">
          <span className={adjustedTotal ? 'text-xs font-medium line-through text-gray-400' : 'font-medium'}>
            ${originalTotal.toFixed(2)}
          </span>
          {adjustedTotal && (
            <span className="font-medium text-green-600">
              ${adjustedTotal.toFixed(2)}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};