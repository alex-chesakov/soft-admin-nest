import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Collector } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { getAllCities } from "@/data/locations";

interface CollectorFormProps {
  collector: Partial<Collector>;
  setCollector: (collector: Partial<Collector>) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const CollectorForm = ({ collector, setCollector, onSubmit, isEditing }: CollectorFormProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
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
    setOpen(false);
    setSearchValue("");
  };

  const handleLocationRemove = (cityToRemove: string) => {
    const currentLocations = collector.locations || [];
    setCollector({
      ...collector,
      locations: currentLocations.filter(city => city !== cityToRemove)
    });
  };

  // Filter locations and ensure it's never undefined
  const filteredLocations = availableCities.filter(city => 
    !collector.locations?.includes(city) && 
    city.toLowerCase().includes(searchValue.toLowerCase())
  );

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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              type="text"
              placeholder="Type to search locations..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setOpen(true);
              }}
              onClick={() => setOpen(true)}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command shouldFilter={false}>
              <CommandInput 
                placeholder="Search location..." 
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {filteredLocations.map((location) => (
                  <CommandItem
                    key={location}
                    value={location}
                    onSelect={() => handleLocationSelect(location)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (collector.locations || []).includes(location)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {location}
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