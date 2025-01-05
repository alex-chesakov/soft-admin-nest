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

interface LocationsEditDialogProps {
  pickupLocations: { name: string; address: string }[];
  deliveryLocation: { name: string; address: string };
  onSave: (data: {
    pickupLocations: { name: string; address: string }[];
    deliveryLocation: { name: string; address: string };
  }) => void;
}

export const LocationsEditDialog = ({
  pickupLocations,
  deliveryLocation,
  onSave,
}: LocationsEditDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedPickupLocations = pickupLocations.map((_, index) => ({
      name: formData.get(`pickup${index}Name`) as string,
      address: formData.get(`pickup${index}Address`) as string,
    }));

    onSave({
      pickupLocations: updatedPickupLocations,
      deliveryLocation: {
        name: formData.get('deliveryName') as string,
        address: formData.get('deliveryAddress') as string,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Locations</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Pickup Locations</h4>
            {pickupLocations.map((location, index) => (
              <div key={index} className="space-y-2">
                <div className="grid gap-2">
                  <Label htmlFor={`pickup${index}Name`}>Location Name</Label>
                  <Input
                    id={`pickup${index}Name`}
                    name={`pickup${index}Name`}
                    defaultValue={location.name}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`pickup${index}Address`}>Address</Label>
                  <Input
                    id={`pickup${index}Address`}
                    name={`pickup${index}Address`}
                    defaultValue={location.address}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Delivery Location</h4>
            <div className="grid gap-2">
              <Label htmlFor="deliveryName">Location Name</Label>
              <Input
                id="deliveryName"
                name="deliveryName"
                defaultValue={deliveryLocation.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deliveryAddress">Address</Label>
              <Input
                id="deliveryAddress"
                name="deliveryAddress"
                defaultValue={deliveryLocation.address}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};