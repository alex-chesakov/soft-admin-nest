import { Badge } from "@/components/ui/badge";
import { OrderStatusEditDialog } from "./OrderStatusEditDialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface OrderHeaderProps {
  id: string;
  date: string;
  status: string;
  onStatusUpdate: (status: string) => void;
}

export const OrderHeader = ({ id, date, status: initialStatus, onStatusUpdate }: OrderHeaderProps) => {
  const [status, setStatus] = useState(initialStatus);
  const { toast } = useToast();

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

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    onStatusUpdate(newStatus);
    toast({
      title: "Order status updated",
      description: `Status changed to ${newStatus}`,
    });
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
        <OrderStatusEditDialog status={status} onSave={handleStatusUpdate} />
      </div>
    </div>
  );
};