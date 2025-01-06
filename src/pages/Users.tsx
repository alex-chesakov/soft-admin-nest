import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Admin, Collector } from "@/types/user";
import { getCustomers } from "@/data/mockCustomers";

const Users = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [collectorCount, setCollectorCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    // Load admins from localStorage
    const savedAdmins = localStorage.getItem("admins");
    if (savedAdmins) {
      const admins: Admin[] = JSON.parse(savedAdmins);
      setAdminCount(admins.length);
    }

    // Load collectors from localStorage
    const savedCollectors = localStorage.getItem("collectors");
    if (savedCollectors) {
      const collectors: Collector[] = JSON.parse(savedCollectors);
      setCollectorCount(collectors.length);
    }

    // Load customers
    const customers = getCustomers();
    setCustomerCount(customers.length);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Admins ({adminCount})</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage administrator accounts and permissions.</p>
            <Button asChild>
              <Link to="/users/admins">Manage Admins</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collectors ({collectorCount})</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage collector accounts and assignments.</p>
            <Button asChild>
              <Link to="/users/collectors">Manage Collectors</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customers ({customerCount})</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage customer accounts and information.</p>
            <Button asChild>
              <Link to="/users/customers">Manage Customers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;