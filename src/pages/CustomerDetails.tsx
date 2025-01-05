import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomerInfo } from "@/components/customers/CustomerInfo";
import { CustomerLocations } from "@/components/customers/CustomerLocations";
import { useToast } from "@/hooks/use-toast";
import { getCustomers } from "@/data/mockCustomers";
import type { Customer } from "@/types/customer";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const customers = getCustomers();
    const foundCustomer = customers.find((c) => c.id === id);
    if (foundCustomer) {
      setCustomer(foundCustomer);
    }
  }, [id]);

  const handleCustomerUpdate = (data: { name: string; email: string; phone: string }) => {
    if (customer) {
      const updatedCustomer = {
        ...customer,
        ...data,
      };
      
      const customers = getCustomers();
      const updatedCustomers = customers.map((c) =>
        c.id === customer.id ? updatedCustomer : c
      );
      
      localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      setCustomer(updatedCustomer);
      
      toast({
        title: "Success",
        description: "Customer information updated successfully",
      });
    }
  };

  if (!customer) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Customer not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <CustomerInfo customer={customer} onCustomerUpdate={handleCustomerUpdate} />
      <CustomerLocations locations={customer.locations} onLocationsChange={(locations) => {
        const updatedCustomer = { ...customer, locations };
        setCustomer(updatedCustomer);
        
        const customers = getCustomers();
        const updatedCustomers = customers.map((c) =>
          c.id === customer.id ? updatedCustomer : c
        );
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      }} />
    </div>
  );
};

export default CustomerDetails;