import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationsEditDialog } from "@/components/orders/LocationsEditDialog";
import { MapPin, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

interface Location {
  name: string;
  address: string;
}

interface CustomerLocationsProps {
  locations: Location[];
  onLocationsChange: (locations: Location[]) => void;
}

export const CustomerLocations = ({ locations, onLocationsChange }: CustomerLocationsProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationCreate = (data: { pickupLocations: Location[]; deliveryLocation: Location }) => {
    const newLocations = [...locations];
    if (data.deliveryLocation.name && data.deliveryLocation.address) {
      newLocations.push(data.deliveryLocation);
      onLocationsChange(newLocations);
    }
  };

  const handleLocationEdit = (data: { pickupLocations: Location[]; deliveryLocation: Location }, index: number) => {
    const newLocations = [...locations];
    if (data.deliveryLocation.name && data.deliveryLocation.address) {
      newLocations[index] = data.deliveryLocation;
      onLocationsChange(newLocations);
    }
  };

  const handleLocationDelete = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index);
    onLocationsChange(newLocations);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <CardTitle>Locations</CardTitle>
        </div>
        <LocationsEditDialog
          pickupLocations={locations.slice(0, -1)}
          deliveryLocation={locations[locations.length - 1] || { name: '', address: '' }}
          onSave={handleLocationCreate}
          mode="create"
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
                  <LocationsEditDialog
                    pickupLocations={[]}
                    deliveryLocation={location}
                    onSave={(data) => handleLocationEdit(data, index)}
                    mode="edit"
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    }
                  />
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
  );
};