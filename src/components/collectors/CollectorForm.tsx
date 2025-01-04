import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Collector } from "@/types/user";
import { getAllCities } from "@/data/locations";
import { LocationSelector } from "./LocationSelector";

interface CollectorFormProps {
  collector: Partial<Collector>;
  setCollector: (collector: Partial<Collector>) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const CollectorForm = ({ collector, setCollector, onSubmit, isEditing }: CollectorFormProps) => {
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  
  // Initialize locations array if undefined
  const locations = collector.locations || [];

  useEffect(() => {
    // Get all available cities
    const cities = getAllCities();
    setAvailableCities(cities);
  }, []);

  const handleLocationSelect = (selectedCity: string) => {
    if (!locations.includes(selectedCity)) {
      const updatedLocations = [...locations, selectedCity];
      setCollector({
        ...collector,
        locations: updatedLocations
      });
      console.log("Updated locations:", updatedLocations);
    }
  };

  const handleLocationRemove = (cityToRemove: string) => {
    const updatedLocations = locations.filter(city => city !== cityToRemove);
    setCollector({
      ...collector,
      locations: updatedLocations
    });
    console.log("Removed city, updated locations:", updatedLocations);
  };

  return (
    <div className="grid gap-4 py-4">
      {/* Basic form fields */}
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
        <LocationSelector
          locations={locations}
          availableCities={availableCities}
          onLocationSelect={handleLocationSelect}
          onLocationRemove={handleLocationRemove}
        />
      </div>

      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'}</Button>
    </div>
  );
};