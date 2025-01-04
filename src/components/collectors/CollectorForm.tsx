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
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  
  // Initialize locations array if undefined
  const locations = collector.locations || [];

  useEffect(() => {
    // Load available cities from localStorage
    const savedCities = localStorage.getItem('selectedCities');
    if (savedCities) {
      setAvailableCities(JSON.parse(savedCities));
    }
  }, []);

  const handleLocationSelect = (city: string) => {
    console.log("Selecting city:", city);
    if (!locations.includes(city)) {
      setCollector({
        ...collector,
        locations: [...locations, city]
      });
    }
    setOpen(false);
  };

  const handleLocationRemove = (cityToRemove: string) => {
    console.log("Removing city:", cityToRemove);
    setCollector({
      ...collector,
      locations: locations.filter(city => city !== cityToRemove)
    });
  };

  // Basic form fields
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">First Name</Label>
        <Input
          id="name"
          value={collector.name || ""}
          onChange={(e) => setCollector({ ...collector, name: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={collector.lastName || ""}
          onChange={(e) => setCollector({ ...collector, lastName: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Login (Email)</Label>
        <Input
          id="email"
          type="email"
          value={collector.email || ""}
          onChange={(e) => setCollector({ ...collector, email: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={collector.phone || ""}
          onChange={(e) => setCollector({ ...collector, phone: e.target.value })}
        />
      </div>
      {!isEditing && (
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={collector.password || ""}
            onChange={(e) => setCollector({ ...collector, password: e.target.value })}
          />
        </div>
      )}

      {/* Locations Section */}
      <div className="grid gap-2">
        <Label>Locations</Label>
        {/* Display selected locations */}
        <div className="flex flex-wrap gap-2 mb-2">
          {locations.map((location) => (
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

        {/* Location selector */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              Select locations...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput 
                placeholder="Search locations..." 
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>No locations found.</CommandEmpty>
                <CommandGroup>
                  {availableCities
                    .filter(city => 
                      !locations.includes(city) && 
                      city.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((city) => (
                      <CommandItem
                        key={city}
                        value={city}
                        onSelect={() => handleLocationSelect(city)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            locations.includes(city) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {city}
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