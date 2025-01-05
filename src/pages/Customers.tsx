import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerList } from "@/components/customers/CustomerList";
import { mockCustomers, getCustomers } from "@/data/mockCustomers";
import type { Customer } from "@/types/customer";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  useEffect(() => {
    const loadedCustomers = getCustomers();
    setCustomers(loadedCustomers);
    // Store customers in localStorage for use in CustomerSelector
    localStorage.setItem("customers", JSON.stringify(loadedCustomers));
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
          <CustomerList customers={customers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;