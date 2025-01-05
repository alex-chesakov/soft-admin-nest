import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface LocationSelectorProps {
  locations: string[];
  availableCities: string[];
  onLocationSelect: (city: string) => void;
  onLocationRemove: (city: string) => void;
}

export const LocationSelector = ({
  locations = [],
  availableCities = [],
  onLocationSelect,
  onLocationRemove,
}: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleLocationSelect = (selectedCity: string) => {
    onLocationSelect(selectedCity);
    setOpen(false);
    setSearchValue("");
  };

  // Ensure we're working with arrays and remove duplicates
  const safeLocations = Array.from(new Set(Array.isArray(locations) ? locations : []));
  const safeAvailableCities = Array.from(new Set(Array.isArray(availableCities) ? availableCities : []));

  // Filter out already selected locations and match search value
  const filteredCities = safeAvailableCities
    .filter(city => 
      !safeLocations.includes(city) && 
      city.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {safeLocations.length > 0 ? `${safeLocations.length} location(s) selected` : "Select locations..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search locations..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup>
                {filteredCities.map((city) => (
                  <CommandItem
                    key={`location-${city}`}
                    value={city}
                    onSelect={() => handleLocationSelect(city)}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        safeLocations.includes(city) ? "opacity-100" : "opacity-0"
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

      {/* Display selected locations */}
      <div className="mt-4">
        {safeLocations.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Selected locations:</p>
            <div className="flex flex-wrap gap-2">
              {safeLocations.map((location) => (
                <Badge 
                  key={`selected-${location}`} 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {location}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => onLocationRemove(location)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};