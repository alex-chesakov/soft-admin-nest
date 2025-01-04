import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationSelector } from "@/components/locations/LocationSelector";
import { CitiesList } from "@/components/locations/CitiesList";
import { useToast } from "@/components/ui/use-toast";

const Locations = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const { toast } = useToast();

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    localStorage.setItem('selectedState', state);
    toast({
      title: "State Updated",
      description: `Selected state changed to ${state}`,
    });
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Location Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <LocationSelector 
            selectedState={selectedState} 
            onStateChange={handleStateChange} 
          />
          <CitiesList selectedState={selectedState} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Locations;