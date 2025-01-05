import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RequirementsEditDialogProps {
  requirements: string[];
  onSave: (requirements: string[]) => void;
}

export const RequirementsEditDialog = ({
  requirements,
  onSave,
}: RequirementsEditDialogProps) => {
  const [localRequirements, setLocalRequirements] = useState(requirements);
  const [dictionaryItems, setDictionaryItems] = useState<{ id: string; name: string }[]>([]);
  const [selectedRequirement, setSelectedRequirement] = useState<string>("");

  useEffect(() => {
    const items = loadDictionaryItems("order-requirements");
    setDictionaryItems(items);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(localRequirements.filter(req => req.trim() !== ''));
  };

  const addRequirement = () => {
    if (selectedRequirement && !localRequirements.includes(selectedRequirement)) {
      setLocalRequirements([...localRequirements, selectedRequirement]);
      setSelectedRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setLocalRequirements(localRequirements.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Requirements</DialogTitle>
          <DialogDescription>
            Select requirements from the dictionary or remove existing ones.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {localRequirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={req}
                readOnly
                className="bg-gray-50"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeRequirement(index)}
              >
                ×
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Select
              value={selectedRequirement}
              onValueChange={setSelectedRequirement}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a requirement" />
              </SelectTrigger>
              <SelectContent>
                {dictionaryItems.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={addRequirement}
              disabled={!selectedRequirement}
            >
              Add
            </Button>
          </div>
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};