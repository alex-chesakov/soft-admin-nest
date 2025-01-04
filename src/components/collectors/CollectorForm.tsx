import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Collector } from "@/types/user";
import { Badge } from "@/components/ui/badge";

interface CollectorFormProps {
  collector: Partial<Collector>;
  setCollector: (collector: Partial<Collector>) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const CollectorForm = ({ collector, setCollector, onSubmit, isEditing }: CollectorFormProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  
  // Ensure locations is always initialized as an array
  const currentLocations = collector.locations || [];

  useEffect(() => {
    // Get selected cities from localStorage
    const savedCities = localStorage.getItem('selectedCities');
    if (savedCities) {
      setAvailableCities(JSON.parse(savedCities));
    }
  }, []);

  const handleLocationSelect = (city: string) => {
    if (!currentLocations.includes(city)) {
      setCollector({
        ...collector,
        locations: [...currentLocations, city]
      });
    }
    setSearchValue("");
    setOpen(false);
  };

  const handleLocationRemove = (cityToRemove: string) => {
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
          {currentLocations.map((location) => (
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
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              Select location...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search location..." 
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {availableCities
                    .filter(city => 
                      !currentLocations.includes(city) && 
                      city.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((location) => (
                      <CommandItem
                        key={location}
                        value={location}
                        onSelect={() => handleLocationSelect(location)}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            currentLocations.includes(location) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {location}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'}</Button>
    </div>
  );
};