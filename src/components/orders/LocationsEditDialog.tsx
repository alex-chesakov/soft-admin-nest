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
import { Plus, Edit2, Trash2 } from "lucide-react";
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
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
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
    setNewLocation({ name: '', address: '' });
    
    toast({
      title: "Success",
      description: "Location added successfully",
    });
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
  };

  const handleUpdateLocation = () => {
    if (!editingLocation) return;

    const updatedLocations = locations.map((loc) =>
      loc === locations.find((l) => l.name === editingLocation.name && l.address === editingLocation.address)
        ? editingLocation
        : loc
    );
    
    setLocations(updatedLocations);
    setEditingLocation(null);
    
    toast({
      title: "Success",
      description: "Location updated successfully",
    });
  };

  const handleDeleteLocation = (locationToDelete: Location) => {
    const updatedLocations = locations.filter(
      (loc) => !(loc.name === locationToDelete.name && loc.address === locationToDelete.address)
    );
    setLocations(updatedLocations);
    
    toast({
      title: "Success",
      description: "Location deleted successfully",
    });
  };

  const handleSave = () => {
    onSave({
      pickupLocations: locations.slice(0, -1),
      deliveryLocation: locations[locations.length - 1] || { name: '', address: '' }
    });
    setOpen(false);
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
          <DialogTitle>Manage Locations</DialogTitle>
          <DialogDescription>
            Add, edit, or remove locations from the list.
          </DialogDescription>
        </DialogHeader>
        
        {/* Add New Location Form */}
        {!editingLocation && (
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
        )}

        {/* Edit Location Form */}
        {editingLocation && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Location Name</Label>
              <Input
                id="edit-name"
                value={editingLocation.name}
                onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Location Address</Label>
              <Input
                id="edit-address"
                value={editingLocation.address}
                onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdateLocation}>Update Location</Button>
              <Button variant="outline" onClick={() => setEditingLocation(null)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Locations List */}
        <div className="mt-6">
          <Label>Current Locations</Label>
          <div className="mt-2 space-y-2">
            {locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditLocation(location)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteLocation(location)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="mt-4">Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
};