import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
}

// Mock data for demonstration
const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    orders: 5,
    totalSpent: 599.99,
    lastOrder: "2024-02-20",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    orders: 3,
    totalSpent: 299.99,
    lastOrder: "2024-02-19",
  },
  {
    id: "CUST-003",
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+1 234 567 8902",
    orders: 8,
    totalSpent: 899.99,
    lastOrder: "2024-02-21",
  },
  {
    id: "CUST-004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 234 567 8903",
    orders: 4,
    totalSpent: 449.99,
    lastOrder: "2024-02-18",
  },
  {
    id: "CUST-005",
    name: "David Brown",
    email: "david@example.com",
    phone: "+1 234 567 8904",
    orders: 6,
    totalSpent: 749.99,
    lastOrder: "2024-02-22",
  },
  {
    id: "CUST-006",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 234 567 8905",
    orders: 2,
    totalSpent: 199.99,
    lastOrder: "2024-02-17",
  },
  {
    id: "CUST-007",
    name: "Robert Wilson",
    email: "robert@example.com",
    phone: "+1 234 567 8906",
    orders: 7,
    totalSpent: 849.99,
    lastOrder: "2024-02-23",
  },
];

const Customers = () => {
  useEffect(() => {
    // Store customers in localStorage for use in CustomerSelector
    localStorage.setItem("customers", JSON.stringify(mockCustomers));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
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
              {mockCustomers.map((customer) => (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;