import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Collector } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { getAllCities } from "@/data/locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CollectorFormProps {
  collector: Partial<Collector>;
  setCollector: (collector: Partial<Collector>) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const CollectorForm = ({ collector, setCollector, onSubmit, isEditing }: CollectorFormProps) => {
  // Get all available cities and ensure it's never undefined
  const availableCities = getAllCities() || [];

  const handleLocationSelect = (city: string) => {
    const currentLocations = collector.locations || [];
    if (!currentLocations.includes(city)) {
      setCollector({
        ...collector,
        locations: [...currentLocations, city]
      });
    }
  };

  const handleLocationRemove = (cityToRemove: string) => {
    const currentLocations = collector.locations || [];
    setCollector({
      ...collector,
      locations: currentLocations.filter(city => city !== cityToRemove)
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
        <div className="flex flex-wrap gap-2 mb-2">
          {(collector.locations || []).map((location) => (
            <Badge key={location} variant="secondary" className="flex items-center gap-1">
              {location}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleLocationRemove(location)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <Select onValueChange={handleLocationSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            {availableCities
              .filter(city => !(collector.locations || []).includes(city))
              .map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'}</Button>
    </div>
  );
};