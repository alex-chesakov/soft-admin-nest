import { Badge } from "@/components/ui/badge";
import { OrderStatusEditDialog } from "./OrderStatusEditDialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface OrderHeaderProps {
  id: string;
  date: string;
  status: string;
  onStatusUpdate: (status: string) => void;
  role?: 'admin' | 'collector';
}

export const OrderHeader = ({ 
  id, 
  date, 
  status: initialStatus, 
  onStatusUpdate,
  role = 'admin',
}: OrderHeaderProps) => {
  const [status, setStatus] = useState(initialStatus);
  const { toast } = useToast();

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "collected":
        return "success";
      case "cancelled":
        return "destructive";
      case "in progress":
        return "warning";
      case "collector assigned":
        return "secondary";
      case "new order":
        return "default";
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

  const handleStartCollection = () => {
    handleStatusUpdate("in progress");
    toast({
      title: "Collection Started",
      description: "You have started the collection process",
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Order {id}</h1>
          <Badge variant={getStatusVariant(status)}>
            {status}
          </Badge>
        </div>
        <p className="text-gray-500">Placed on {date}</p>
      </div>
      <div className="flex items-center gap-4">
        {role === 'collector' && (
          <Button 
            onClick={handleStartCollection}
            className="bg-green-500 hover:bg-green-600"
            size="sm"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Collection
          </Button>
        )}
        {role === 'admin' && (
          <OrderStatusEditDialog status={status} onSave={handleStatusUpdate} />
        )}
      </div>
    </div>
  );
};