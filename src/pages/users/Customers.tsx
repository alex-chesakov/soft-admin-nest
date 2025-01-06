import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerList } from "@/components/customers/CustomerList";
import { getCustomers } from "@/data/mockCustomers";
import { Customer } from "@/types/customer";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const loadedCustomers = getCustomers();
    setCustomers(loadedCustomers);
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Customers Management</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerList customers={customers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;