import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomerInfo } from "@/components/customers/CustomerInfo";
import { CustomerLocations } from "@/components/customers/CustomerLocations";
import { useToast } from "@/hooks/use-toast";

interface Location {
  name: string;
  address: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  locations?: Location[];
}

const initialLocations = [
  { name: "Home Office", address: "123 Main St, San Francisco, CA 94105" },
  { name: "Downtown Branch", address: "456 Market St, San Francisco, CA 94103" },
  { name: "South Bay Office", address: "789 Castro St, Mountain View, CA 94041" },
  { name: "East Bay Location", address: "321 Broadway, Oakland, CA 94612" },
  { name: "North Bay Site", address: "654 Grant Ave, San Rafael, CA 94901" }
];

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();
  const [locations, setLocations] = useState(initialLocations);

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      try {
        const customers = JSON.parse(storedCustomers);
        const foundCustomer = customers.find((c: Customer) => c.id === id);
        if (foundCustomer) {
          setCustomer({
            ...foundCustomer,
            locations: locations
          });
        }
      } catch (error) {
        console.error("Error parsing customers from localStorage:", error);
      }
    }
  }, [id, locations]);

  const handleCustomerUpdate = (data: { name: string; email: string; phone: string }) => {
    if (customer) {
      const updatedCustomer = {
        ...customer,
        ...data
      };
      
      const storedCustomers = localStorage.getItem("customers");
      if (storedCustomers) {
        try {
          const customers = JSON.parse(storedCustomers);
          const updatedCustomers = customers.map((c: Customer) =>
            c.id === customer.id ? updatedCustomer : c
          );
          localStorage.setItem("customers", JSON.stringify(updatedCustomers));
          setCustomer(updatedCustomer);
          toast({
            title: "Success",
            description: "Customer information updated successfully",
          });
        } catch (error) {
          console.error("Error updating customer:", error);
          toast({
            title: "Error",
            description: "Failed to update customer information",
            variant: "destructive",
          });
        }
      }
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
      <CustomerLocations locations={locations} onLocationsChange={setLocations} />
    </div>
  );
};

export default CustomerDetails;