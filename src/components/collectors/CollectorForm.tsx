import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { defaultLocations } from "@/types/location";
import { Collector } from "@/types/user";

interface CollectorFormProps {
  collector: Partial<Collector>;
  setCollector: (collector: Partial<Collector>) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const CollectorForm = ({ collector, setCollector, onSubmit, isEditing }: CollectorFormProps) => {
  const handleLocationChange = (locationId: string) => {
    setCollector({
      ...collector,
      locations: collector.locations?.includes(locationId)
        ? collector.locations.filter(id => id !== locationId)
        : [...(collector.locations || []), locationId]
    });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">First Name</Label>
        <Input
          id="name"
          value={collector.name || ""}
          onChange={(e) =>
            setCollector({ ...collector, name: e.target.value })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={collector.lastName || ""}
          onChange={(e) =>
            setCollector({ ...collector, lastName: e.target.value })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Login (Email)</Label>
        <Input
          id="email"
          type="email"
          value={collector.email || ""}
          onChange={(e) =>
            setCollector({ ...collector, email: e.target.value })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={collector.phone || ""}
          onChange={(e) =>
            setCollector({ ...collector, phone: e.target.value })
          }
        />
      </div>
      {!isEditing && (
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={collector.password || ""}
            onChange={(e) =>
              setCollector({ ...collector, password: e.target.value })
            }
          />
        </div>
      )}
      <div className="grid gap-2">
        <Label>Locations</Label>
        <div className="grid gap-2">
          {defaultLocations.map((location) => (
            <div key={location.id} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location.id}`}
                checked={collector.locations?.includes(location.id)}
                onCheckedChange={() => handleLocationChange(location.id)}
              />
              <Label htmlFor={`location-${location.id}`}>{location.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'}</Button>
    </div>
  );
};