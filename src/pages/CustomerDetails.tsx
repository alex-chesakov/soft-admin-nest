import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LocationsEditDialog } from "@/components/orders/LocationsEditDialog";
import { CustomerEditDialog } from "@/components/customers/CustomerEditDialog";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  locations?: Array<{ name: string; address: string }>;
}

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      try {
        const customers = JSON.parse(storedCustomers);
        const foundCustomer = customers.find((c: Customer) => c.id === id);
        if (foundCustomer) {
          setCustomer({
            ...foundCustomer,
            locations: foundCustomer.locations || []
          });
        }
      } catch (error) {
        console.error("Error parsing customers from localStorage:", error);
      }
    }
  }, [id]);

  const handleCustomerUpdate = (data: { name: string; email: string; phone: string }) => {
    if (customer) {
      const updatedCustomer = {
        ...customer,
        ...data
      };
      
      // Update customer in localStorage
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

  const handleLocationsSave = (data: {
    pickupLocations: { name: string; address: string }[];
    deliveryLocation: { name: string; address: string };
  }) => {
    if (customer) {
      const updatedCustomer = {
        ...customer,
        locations: [...data.pickupLocations, data.deliveryLocation]
      };
      
      // Update customer in localStorage
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
            description: "Customer locations updated successfully",
          });
        } catch (error) {
          console.error("Error updating customer locations:", error);
          toast({
            title: "Error",
            description: "Failed to update customer locations",
            variant: "destructive",
          });
        }
      }
    }
  };

  if (!customer) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Customer not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Customer Details Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Customer Details</CardTitle>
          </div>
          <CustomerEditDialog customer={customer} onSave={handleCustomerUpdate} />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-base">{customer.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-base">{customer.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-base">{customer.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Locations Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <CardTitle>Locations</CardTitle>
          </div>
          <LocationsEditDialog
            pickupLocations={customer.locations?.slice(0, -1) || []}
            deliveryLocation={customer.locations?.[customer.locations.length - 1] || { name: '', address: '' }}
            onSave={handleLocationsSave}
          />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="space-y-4">
              {customer.locations && customer.locations.length > 0 ? (
                customer.locations.map((location, index) => (
                  <div key={index} className="space-y-2 p-3 rounded-lg border">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location Name</label>
                      <p className="text-base">{location.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Address</label>
                      <p className="text-base">{location.address}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No locations assigned</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetails;