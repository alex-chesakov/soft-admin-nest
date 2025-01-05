import { Badge } from "@/components/ui/badge";
import { OrderStatusEditDialog } from "./OrderStatusEditDialog";

interface OrderHeaderProps {
  id: string;
  date: string;
  status: string;
  onStatusUpdate: (status: string) => void;
}

export const OrderHeader = ({ id, date, status, onStatusUpdate }: OrderHeaderProps) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success";
      case "cancelled":
        return "destructive";
      case "in transit":
      case "in progress":
      case "collector assigned":
        return "warning";
      case "new order":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Order {id}</h1>
        <p className="text-gray-500">Placed on {date}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={getStatusVariant(status)}>
          {status}
        </Badge>
        <OrderStatusEditDialog status={status} onSave={onStatusUpdate} />
      </div>
    </div>
  );
};