import { Badge } from "@/components/ui/badge";

interface OrderHeaderProps {
  id: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}

export const OrderHeader = ({ id, date, status }: OrderHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Order {id}</h1>
        <p className="text-gray-500">Placed on {date}</p>
      </div>
      <Badge
        variant={
          status === "completed"
            ? "default"
            : status === "pending"
            ? "secondary"
            : status === "processing"
            ? "outline"
            : "destructive"
        }
      >
        {status}
      </Badge>
    </div>
  );
};