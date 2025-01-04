import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultLocations } from "@/types/location";
import { useState } from "react";
import { Collector } from "@/types/user";

interface CollectorFormProps {
  collector: Partial<Collector>;
  setCollector: (collector: Partial<Collector>) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const CollectorForm = ({ collector, setCollector, onSubmit, isEditing }: CollectorFormProps) => {
  const [open, setOpen] = useState(false);
  const locations = defaultLocations.map(loc => loc.id);

  const handleLocationSelect = (locationId: string) => {
    const currentLocations = collector.locations || [];
    setCollector({
      ...collector,
      locations: currentLocations.includes(locationId)
        ? currentLocations.filter(loc => loc !== locationId)
        : [...currentLocations, locationId]
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {collector.locations?.length
                ? `${collector.locations.length} selected`
                : "Select locations..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {defaultLocations.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => handleLocationSelect(location.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (collector.locations || []).includes(location.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {location.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'}</Button>
    </div>
  );
};