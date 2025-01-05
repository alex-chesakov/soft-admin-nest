import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User, Edit2, Trash2 } from "lucide-react";
import { LocationsEditDialog } from "@/components/orders/LocationsEditDialog";
import { CustomerEditDialog } from "@/components/customers/CustomerEditDialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  locations?: Array<{ name: string; address: string }>;
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
  const [editingLocation, setEditingLocation] = useState<{ name: string; address: string } | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

  const handleLocationDelete = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
    toast({
      title: "Success",
      description: "Location deleted successfully",
    });
  };

  const handleLocationEdit = (location: { name: string; address: string }) => {
    setEditingLocation(location);
    setIsEditDialogOpen(true);
  };

  const handleLocationUpdate = (updatedLocation: { name: string; address: string }) => {
    const newLocations = locations.map((loc) =>
      loc === editingLocation ? updatedLocation : loc
    );
    setLocations(newLocations);
    setIsEditDialogOpen(false);
    setEditingLocation(null);
    toast({
      title: "Success",
      description: "Location updated successfully",
    });
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <CardTitle>Locations</CardTitle>
          </div>
          <LocationsEditDialog
            pickupLocations={locations.slice(0, -1)}
            deliveryLocation={locations[locations.length - 1] || { name: '', address: '' }}
            onSave={() => {}}
          />
        </CardHeader>
        <CardContent>
          {locations.length > 0 ? (
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-base font-medium">{location.name}</p>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLocationEdit(location)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLocationDelete(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No locations assigned</p>
          )}
        </CardContent>
      </Card>

      {isEditDialogOpen && editingLocation && (
        <LocationsEditDialog
          pickupLocations={[]}
          deliveryLocation={editingLocation}
          onSave={(data) => handleLocationUpdate(data.deliveryLocation)}
        />
      )}
    </div>
  );
};

export default CustomerDetails;