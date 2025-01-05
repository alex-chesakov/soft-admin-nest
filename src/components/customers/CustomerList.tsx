import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types/customer";

interface CustomerListProps {
  customers: Customer[];
}

export const CustomerList = ({ customers }: CustomerListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Total Spent</TableHead>
          <TableHead>Last Order</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">
              <Link 
                to={`/customers/${customer.id}`} 
                className="text-primary hover:underline"
              >
                {customer.name}
              </Link>
            </TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.orders}</TableCell>
            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
            <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};