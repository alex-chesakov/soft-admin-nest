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
import { CustomerInfo } from "./CustomerInfo";

interface CustomerListProps {
  customers: Customer[];
  onCustomerUpdate: (customer: Customer) => void;
}

export const CustomerList = ({ customers, onCustomerUpdate }: CustomerListProps) => {
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
                to={`/users/${customer.id}`} 
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