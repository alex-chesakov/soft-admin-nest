import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usStates } from "@/data/locations";

interface LocationSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
}

export const LocationSelector = ({ selectedState, onStateChange }: LocationSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select State</label>
      <Select value={selectedState} onValueChange={onStateChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          {usStates.map((state) => (
            <SelectItem key={state.code} value={state.code}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};