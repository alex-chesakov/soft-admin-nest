import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Location {
  name: string;
  address: string;
}

interface LocationsEditDialogProps {
  pickupLocations: Location[];
  deliveryLocation: Location;
  onSave: (data: { pickupLocations: Location[]; deliveryLocation: Location }) => void;
}

export const LocationsEditDialog = ({
  pickupLocations,
  deliveryLocation,
  onSave,
}: LocationsEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([...pickupLocations, deliveryLocation]);
  const [newLocation, setNewLocation] = useState({ name: '', address: '' });
  const { toast } = useToast();

  const handleCreateLocation = () => {
    if (!newLocation.name || !newLocation.address) {
      toast({
        title: "Error",
        description: "Please fill in both location name and address",
        variant: "destructive",
      });
      return;
    }

    const updatedLocations = [...locations, newLocation];
    setLocations(updatedLocations);
    onSave({
      pickupLocations: updatedLocations.slice(0, -1),
      deliveryLocation: updatedLocations[updatedLocations.length - 1] || { name: '', address: '' }
    });
    setNewLocation({ name: '', address: '' });
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Location added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>
            Fill in the location details below.
          </DialogDescription>
        </DialogHeader>
        
        {/* Add New Location Form */}
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Location Name</Label>
            <Input
              id="name"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Location Address</Label>
            <Input
              id="address"
              value={newLocation.address}
              onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
            />
          </div>
          <Button onClick={handleCreateLocation}>Create Location</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};