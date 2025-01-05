import { columns } from "@/components/customers/columns";
import { DataTable } from "@/components/customers/data-table";
import { useEffect } from "react";

const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    orders: 5,
    totalSpent: 499.99,
    lastOrder: "2024-02-20",
    locations: [
      { name: "Home Office", address: "123 Main St, San Francisco, CA 94105" },
      { name: "Downtown Branch", address: "456 Market St, San Francisco, CA 94103" }
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
      { name: "Main Store", address: "789 Oak St, Los Angeles, CA 90012" },
      { name: "Warehouse", address: "321 Pine St, Los Angeles, CA 90014" }
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
      { name: "Corporate HQ", address: "567 Tech Blvd, San Jose, CA 95110" },
      { name: "R&D Center", address: "890 Innovation Dr, San Jose, CA 95112" },
      { name: "Distribution Center", address: "234 Logistics Way, San Jose, CA 95131" }
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
      { name: "Retail Store", address: "432 Shopping Ave, Sacramento, CA 95814" },
      { name: "Storage Facility", address: "765 Warehouse Rd, Sacramento, CA 95811" }
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
      { name: "Main Office", address: "543 Business Park, San Diego, CA 92101" },
      { name: "South Branch", address: "876 Harbor Dr, San Diego, CA 92102" },
      { name: "North Branch", address: "198 Coast Hwy, San Diego, CA 92106" }
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
      { name: "Shop Front", address: "321 Retail Row, Oakland, CA 94612" },
      { name: "Storage Unit", address: "654 Industrial Pkwy, Oakland, CA 94621" }
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
      { name: "Head Office", address: "987 Corporate Dr, Berkeley, CA 94704" },
      { name: "Research Lab", address: "654 Science Park, Berkeley, CA 94720" },
      { name: "Warehouse B", address: "321 Storage Lane, Berkeley, CA 94710" }
    ]
  }
];

export default function CustomersPage() {
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(mockCustomers));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={mockCustomers} />
    </div>
  );
}