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

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const navigate = useNavigate();

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'default';
    }
  };

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
            <TableCell>
              <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>
                {order.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell>{order.items.length}</TableCell>
            <TableCell>{order.deliveryLocation?.name}</TableCell>
            <TableCell>{order.collector?.name}</TableCell>
            <TableCell>{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
            <TableCell>{order.deliveryWindow}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};