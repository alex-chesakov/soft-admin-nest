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
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  const [editOpen, setEditOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([...pickupLocations, deliveryLocation]);
  const [newLocation, setNewLocation] = useState({ name: '', address: '' });
  const [editingLocation, setEditingLocation] = useState<{ index: number; location: Location } | null>(null);
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

  const handleEditLocation = () => {
    if (!editingLocation) return;
    
    if (!editingLocation.location.name || !editingLocation.location.address) {
      toast({
        title: "Error",
        description: "Please fill in both location name and address",
        variant: "destructive",
      });
      return;
    }

    const updatedLocations = [...locations];
    updatedLocations[editingLocation.index] = editingLocation.location;
    
    setLocations(updatedLocations);
    onSave({
      pickupLocations: updatedLocations.slice(0, -1),
      deliveryLocation: updatedLocations[updatedLocations.length - 1] || { name: '', address: '' }
    });
    
    setEditingLocation(null);
    setEditOpen(false);
    
    toast({
      title: "Success",
      description: "Location updated successfully",
    });
  };

  const handleDeleteLocation = (index: number) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    onSave({
      pickupLocations: updatedLocations.slice(0, -1),
      deliveryLocation: updatedLocations[updatedLocations.length - 1] || { name: '', address: '' }
    });
    
    toast({
      title: "Success",
      description: "Location deleted successfully",
    });
  };

  return (
    <>
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

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update the location details below.
            </DialogDescription>
          </DialogHeader>
          
          {editingLocation && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Location Name</Label>
                <Input
                  id="edit-name"
                  value={editingLocation.location.name}
                  onChange={(e) => setEditingLocation({
                    ...editingLocation,
                    location: { ...editingLocation.location, name: e.target.value }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Location Address</Label>
                <Input
                  id="edit-address"
                  value={editingLocation.location.address}
                  onChange={(e) => setEditingLocation({
                    ...editingLocation,
                    location: { ...editingLocation.location, address: e.target.value }
                  })}
                />
              </div>
              <Button onClick={handleEditLocation}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="mt-4 space-y-2">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded">
            <div>
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-gray-500">{location.address}</div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingLocation({ index, location: { ...location } });
                  setEditOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteLocation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};