import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  locations: Array<{
    name: string;
    address: string;
  }>;
}

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    orders: 5,
    totalSpent: 599.99,
    lastOrder: "2024-02-20",
    locations: [
      {
        name: "San Francisco HQ",
        address: "123 Market Street, San Francisco, CA 94105"
      },
      {
        name: "Silicon Valley Office",
        address: "456 Castro Street, Mountain View, CA 94041"
      }
    ]
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    orders: 3,
    totalSpent: 299.99,
    lastOrder: "2024-02-19",
    locations: [
      {
        name: "LA Downtown",
        address: "789 Broadway, Los Angeles, CA 90012"
      },
      {
        name: "Santa Monica Branch",
        address: "321 Ocean Avenue, Santa Monica, CA 90401"
      },
      {
        name: "Pasadena Store",
        address: "567 Colorado Blvd, Pasadena, CA 91101"
      }
    ]
  },
  {
    id: "CUST-003",
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+1 234 567 8902",
    orders: 8,
    totalSpent: 899.99,
    lastOrder: "2024-02-21",
    locations: [
      {
        name: "San Diego Main",
        address: "890 Harbor Drive, San Diego, CA 92101"
      },
      {
        name: "La Jolla Office",
        address: "234 Prospect Street, La Jolla, CA 92037"
      }
    ]
  },
  {
    id: "CUST-004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 234 567 8903",
    orders: 4,
    totalSpent: 449.99,
    lastOrder: "2024-02-18",
    locations: [
      {
        name: "Sacramento Central",
        address: "432 Capitol Mall, Sacramento, CA 95814"
      },
      {
        name: "Folsom Branch",
        address: "765 Blue Ravine Road, Folsom, CA 95630"
      },
      {
        name: "Davis Location",
        address: "543 University Avenue, Davis, CA 95616"
      }
    ]
  },
  {
    id: "CUST-005",
    name: "David Brown",
    email: "david@example.com",
    phone: "+1 234 567 8904",
    orders: 6,
    totalSpent: 749.99,
    lastOrder: "2024-02-22",
    locations: [
      {
        name: "Oakland Office",
        address: "876 Broadway, Oakland, CA 94607"
      },
      {
        name: "Berkeley Store",
        address: "198 Shattuck Avenue, Berkeley, CA 94704"
      }
    ]
  },
  {
    id: "CUST-006",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 234 567 8905",
    orders: 2,
    totalSpent: 199.99,
    lastOrder: "2024-02-17",
    locations: [
      {
        name: "San Jose Main",
        address: "321 First Street, San Jose, CA 95113"
      },
      {
        name: "Palo Alto Branch",
        address: "654 University Avenue, Palo Alto, CA 94301"
      },
      {
        name: "Cupertino Store",
        address: "987 Stevens Creek Blvd, Cupertino, CA 95014"
      }
    ]
  },
  {
    id: "CUST-007",
    name: "Robert Wilson",
    email: "robert@example.com",
    phone: "+1 234 567 8906",
    orders: 7,
    totalSpent: 849.99,
    lastOrder: "2024-02-23",
    locations: [
      {
        name: "Fresno Headquarters",
        address: "543 Van Ness Avenue, Fresno, CA 93721"
      },
      {
        name: "Clovis Branch",
        address: "876 Shaw Avenue, Clovis, CA 93612"
      }
    ]
  }
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