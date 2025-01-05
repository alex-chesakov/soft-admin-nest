import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { LocationSelector } from "../collectors/LocationSelector";

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
          <DialogTitle>Edit Locations</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <LocationSelector
            locations={locations.map(location => location.name)}
            availableCities={[]}
            onLocationSelect={(city) => {
              setLocations([...locations, { name: city, address: '' }]);
            }}
            onLocationRemove={(city) => {
              setLocations(locations.filter(location => location.name !== city));
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
