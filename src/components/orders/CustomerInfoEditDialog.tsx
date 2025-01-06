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
import { useToast } from "@/hooks/use-toast";
import { getCustomers } from "@/data/mockCustomers";

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
  onLocationUpdate?: (location: { name: string; address: string }) => void;
}

export const CustomerInfoEditDialog = ({
  customerName,
  email,
  phone,
  shippingAddress,
  onSave,
  onLocationUpdate,
}: CustomerInfoEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer] = useState(customerName);
  const [selectedEmail] = useState(email);
  const [selectedPhone] = useState(phone);
  const [locations, setLocations] = useState<{ name: string; address: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const customers = getCustomers();
    const currentCustomer = customers.find((c) => c.name === selectedCustomer);
    if (currentCustomer && Array.isArray(currentCustomer.locations)) {
      setLocations(currentCustomer.locations);
      if (!selectedLocation && currentCustomer.locations.length > 0) {
        setSelectedLocation(currentCustomer.locations[0].name);
      }
    } else {
      setLocations([]);
    }
  }, [selectedCustomer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedLocationData = locations.find(loc => loc.name === selectedLocation);
    
    if (selectedLocationData && onLocationUpdate) {
      onLocationUpdate(selectedLocationData);
    }
    
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

    toast({
      title: "Success",
      description: "Customer information updated successfully",
    });
    
    setOpen(false);
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
              <Input
                value={selectedCustomer}
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={selectedEmail}
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={selectedPhone}
                readOnly
                className="bg-gray-100"
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