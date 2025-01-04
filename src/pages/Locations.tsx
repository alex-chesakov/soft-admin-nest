import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationSelector } from "@/components/locations/LocationSelector";
import { CitiesList } from "@/components/locations/CitiesList";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

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

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Location preferences have been saved",
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
          <Button 
            onClick={handleSave}
            className="w-full sm:w-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Locations;