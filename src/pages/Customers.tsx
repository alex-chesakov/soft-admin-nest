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
        name: "Home Office",
        address: "123 Main St, San Francisco, CA 94105"
      },
      {
        name: "Downtown Branch",
        address: "456 Market St, San Francisco, CA 94103"
      },
      {
        name: "South Bay Office",
        address: "789 Castro St, Mountain View, CA 94041"
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
        name: "Fashion District Store",
        address: "123 Fashion Ave, Los Angeles, CA 90015"
      },
      {
        name: "Beverly Hills Boutique",
        address: "456 Rodeo Dr, Beverly Hills, CA 90210"
      },
      {
        name: "Venice Beach Shop",
        address: "789 Ocean Front Walk, Venice, CA 90291"
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
        name: "Gaslamp Quarter Office",
        address: "321 Fifth Ave, San Diego, CA 92101"
      },
      {
        name: "Mission Valley Center",
        address: "654 Mission Center Rd, San Diego, CA 92108"
      },
      {
        name: "Coronado Branch",
        address: "987 Orange Ave, Coronado, CA 92118"
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
        name: "Midtown Headquarters",
        address: "741 J St, Sacramento, CA 95814"
      },
      {
        name: "Arden Fair Location",
        address: "852 Arden Way, Sacramento, CA 95815"
      },
      {
        name: "Natomas Branch",
        address: "963 Truxel Rd, Sacramento, CA 95834"
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
        name: "Jack London Square",
        address: "147 Water St, Oakland, CA 94607"
      },
      {
        name: "Rockridge District",
        address: "258 College Ave, Oakland, CA 94618"
      },
      {
        name: "Temescal Store",
        address: "369 Telegraph Ave, Oakland, CA 94609"
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
        name: "Santana Row Office",
        address: "159 Santana Row, San Jose, CA 95128"
      },
      {
        name: "Downtown SJ Branch",
        address: "357 Santa Clara St, San Jose, CA 95113"
      },
      {
        name: "Willow Glen Store",
        address: "753 Lincoln Ave, San Jose, CA 95125"
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
        name: "Tower District Office",
        address: "951 Olive Ave, Fresno, CA 93728"
      },
      {
        name: "River Park Branch",
        address: "753 Nees Ave, Fresno, CA 93720"
      },
      {
        name: "Fashion Fair Location",
        address: "357 Shaw Ave, Fresno, CA 93710"
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