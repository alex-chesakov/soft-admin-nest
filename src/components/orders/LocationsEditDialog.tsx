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
  mode: 'create' | 'edit';
  trigger?: React.ReactNode;
}

export const LocationsEditDialog = ({
  pickupLocations = [],
  deliveryLocation = { name: '', address: '' },
  onSave,
  mode = 'create',
  trigger,
}: LocationsEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([...pickupLocations, deliveryLocation]);
  const [newLocation, setNewLocation] = useState(mode === 'edit' ? deliveryLocation : { name: '', address: '' });
  const { toast } = useToast();

  const handleSave = () => {
    if (!newLocation.name || !newLocation.address) {
      toast({
        title: "Error",
        description: "Please fill in both location name and address",
        variant: "destructive",
      });
      return;
    }

    const updatedLocations = mode === 'edit' ? locations : [...locations, newLocation];
    setLocations(updatedLocations);
    onSave({
      pickupLocations: updatedLocations.slice(0, -1),
      deliveryLocation: newLocation
    });
    setNewLocation({ name: '', address: '' });
    setOpen(false);
    
    toast({
      title: "Success",
      description: `Location ${mode === 'create' ? 'added' : 'updated'} successfully`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add New Location' : 'Edit Location'}</DialogTitle>
          <DialogDescription>
            Fill in the location details below.
          </DialogDescription>
        </DialogHeader>
        
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
          <Button onClick={handleSave}>
            {mode === 'create' ? 'Create Location' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};