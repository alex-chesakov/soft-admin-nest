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
}

export const OrderItemComponent = ({
  item,
  onQuantityChange,
  onUnitChange,
  onStatusChange,
  onDelete,
  itemStatuses,
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

  return (
    <div className="flex justify-between items-start border-b pb-4 last:border-0">
      <div className="space-y-1 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{item.productName}</p>
          {item.productStatus && (
            <Badge variant={getStatusBadgeVariant(item.productStatus)}>
              {item.productStatus}
            </Badge>
          )}
        </div>
        <p className="font-medium">BIN: {item.id}</p>
        <p className="text-sm text-gray-500 mt-2">Price: ${displayPrice.toFixed(2)}/{item.unit || 'Unit'}</p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Booked Qty:</label>
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
          </div>
          {item.adjustedQuantity !== undefined && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Adjusted Qty:</label>
              <span className="text-sm font-medium">{item.adjustedQuantity}</span>
            </div>
          )}
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
        </div>
      </div>
      <div className="text-right space-y-2">
        <ItemStatusPopover
          status={item.status || 'Not collected'}
          statusColor={getItemStatusColor(item.status || 'Not collected')}
          onStatusChange={(newStatus, adjustedQty) => onStatusChange(item.id, newStatus, adjustedQty)}
          statuses={itemStatuses}
        />
        <p className="font-medium">${(displayPrice * item.quantity).toFixed(2)}</p>
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