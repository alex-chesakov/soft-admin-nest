import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  locations?: string[];
}

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      try {
        const customers = JSON.parse(storedCustomers);
        const foundCustomer = customers.find((c: Customer) => c.id === id);
        if (foundCustomer) {
          setCustomer(foundCustomer);
        }
      } catch (error) {
        console.error("Error parsing customers from localStorage:", error);
      }
    }
  }, [id]);

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
        <CardHeader className="flex flex-row items-center space-y-0 gap-2">
          <User className="h-5 w-5" />
          <CardTitle>Customer Details</CardTitle>
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
        <CardHeader className="flex flex-row items-center space-y-0 gap-2">
          <MapPin className="h-5 w-5" />
          <CardTitle>Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] rounded-md">
            <div className="space-y-2">
              {customer.locations && customer.locations.length > 0 ? (
                customer.locations.map((location, index) => (
                  <Badge key={index} variant="secondary" className="mr-2">
                    {location}
                  </Badge>
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