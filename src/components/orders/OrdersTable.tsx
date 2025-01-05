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
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: number;
  location?: string;
  collector?: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  deliveryDate: string;
  deliveryWindow: string;
}

interface OrdersTableProps {
  orders: Order[];
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'pending':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'failed':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return '';
  }
};

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const navigate = useNavigate();

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
              <Badge
                variant={
                  order.status === "completed"
                    ? "default"
                    : order.status === "pending"
                    ? "secondary"
                    : order.status === "processing"
                    ? "outline"
                    : "destructive"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                className={cn(getPaymentStatusColor(order.paymentStatus))}
                variant="outline"
              >
                {order.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell>{order.location}</TableCell>
            <TableCell>{order.collector}</TableCell>
            <TableCell>{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
            <TableCell>{order.deliveryWindow}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};