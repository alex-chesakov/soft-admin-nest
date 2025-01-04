import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCitiesByState } from "@/data/locations";
import { useEffect, useState } from "react";

interface CitiesListProps {
  selectedState: string;
}

export const CitiesList = ({ selectedState }: CitiesListProps) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const cities = getCitiesByState(selectedState);

  useEffect(() => {
    const savedCities = localStorage.getItem('selectedCities');
    if (savedCities) {
      setSelectedCities(JSON.parse(savedCities));
    }
  }, []);

  const handleCityToggle = (city: string) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    
    setSelectedCities(updatedCities);
    localStorage.setItem('selectedCities', JSON.stringify(updatedCities));
  };

  if (!selectedState) {
    return <p className="text-muted-foreground">Please select a state to view cities.</p>;
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Cities</label>
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={city}
                checked={selectedCities.includes(city)}
                onCheckedChange={() => handleCityToggle(city)}
              />
              <Label htmlFor={city}>{city}</Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};