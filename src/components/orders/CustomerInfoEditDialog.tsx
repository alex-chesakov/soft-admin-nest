import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from "lucide-react";
import { CustomerSelector } from "./CustomerSelector";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerInfoEditDialogProps {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  onSave: (data: {
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  }) => void;
}

export const CustomerInfoEditDialog = ({
  customerName,
  email,
  phone,
  shippingAddress,
  onSave,
}: CustomerInfoEditDialogProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState(customerName);
  const [selectedEmail, setSelectedEmail] = useState(email);
  const [selectedPhone, setSelectedPhone] = useState(phone);
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState<{ name: string; address: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    // Get customer locations from localStorage
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      try {
        const customers = JSON.parse(storedCustomers);
        const currentCustomer = customers.find((c: any) => c.name === selectedCustomer);
        if (currentCustomer && Array.isArray(currentCustomer.locations)) {
          setLocations(currentCustomer.locations);
          // Set first location as default if none selected
          if (!selectedLocation && currentCustomer.locations.length > 0) {
            setSelectedLocation(currentCustomer.locations[0].name);
          }
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error parsing customers:", error);
        setLocations([]);
      }
    }
  }, [selectedCustomer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedLocationData = locations.find(loc => loc.name === selectedLocation);
    
    onSave({
      customerName: selectedCustomer,
      email: selectedEmail,
      phone: selectedPhone,
      shippingAddress: {
        street: selectedLocationData?.address || shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
        country: shippingAddress.country,
      },
    });
    setOpen(false);
  };

  const handleCustomerSelect = (name: string, email: string, phone: string) => {
    setSelectedCustomer(name);
    setSelectedEmail(email);
    setSelectedPhone(phone);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Customer</Label>
              <CustomerSelector 
                value={selectedCustomer} 
                onChange={handleCustomerSelect}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={selectedPhone}
                onChange={(e) => setSelectedPhone(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Shipping Address</h4>
            <div className="grid gap-2">
              <Label htmlFor="location">Select Location</Label>
              <Select 
                value={selectedLocation} 
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.name} value={location.name}>
                      {location.name} - {location.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};