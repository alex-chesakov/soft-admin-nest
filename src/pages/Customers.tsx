import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerList } from "@/components/customers/CustomerList";
import { mockCustomers, getCustomers } from "@/data/mockCustomers";
import type { Customer } from "@/types/customer";
import { useToast } from "@/hooks/use-toast";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const { toast } = useToast();

  useEffect(() => {
    const loadedCustomers = getCustomers();
    setCustomers(loadedCustomers);
  }, []);

  const handleCustomerUpdate = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    
    toast({
      title: "Success",
      description: "Customer information updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerList 
            customers={customers} 
            onCustomerUpdate={handleCustomerUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;