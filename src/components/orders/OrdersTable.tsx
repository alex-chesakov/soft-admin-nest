import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { useMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const navigate = useNavigate();
  const isMobile = useMobile();

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

  if (isMobile) {
    return (
      <div className="space-y-4">
        {orders?.map((order) => (
          <Card
            key={order.id}
            className="p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customerName}</p>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <div className="text-sm">
                <p>Items: {order.items.length}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Location: {order.location}</p>
                <p>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Collector</TableHead>
          <TableHead>Delivery Date</TableHead>
          <TableHead>Time Window</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow 
            key={order.id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>{order.paymentStatus}</TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell>{order.items.length}</TableCell>
            <TableCell>{order.location}</TableCell>
            <TableCell>{order.collector?.name || 'Unassigned'}</TableCell>
            <TableCell>{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
            <TableCell>{order.deliveryWindow}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};