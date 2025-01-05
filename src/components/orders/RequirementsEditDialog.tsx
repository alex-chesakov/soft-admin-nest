import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";
import { useToast } from "@/hooks/use-toast";

interface RequirementsEditDialogProps {
  requirements: string[];
  onSave: (requirements: string[]) => void;
}

export const RequirementsEditDialog = ({
  requirements,
  onSave,
}: RequirementsEditDialogProps) => {
  const [localRequirements, setLocalRequirements] = useState<string[]>(
    requirements.filter(req => req.trim() !== '')
  );
  const [dictionaryItems, setDictionaryItems] = useState<Array<{ id: string; name: string }>>([]);
  const { toast } = useToast();

  useEffect(() => {
    const items = loadDictionaryItems("order-requirements");
    setDictionaryItems(items);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredRequirements = localRequirements.filter(req => req.trim() !== '');
    onSave(filteredRequirements);
    localStorage.setItem(`order-requirements-${requirements}`, JSON.stringify(filteredRequirements));
    toast({
      title: "Requirements updated",
      description: "Changes have been saved successfully",
    });
  };

  const addRequirement = () => {
    if (localRequirements.every(req => req.trim() !== '')) {
      setLocalRequirements([...localRequirements, '']);
    }
  };

  const removeRequirement = (index: number) => {
    setLocalRequirements(localRequirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...localRequirements];
    newRequirements[index] = value;
    setLocalRequirements(newRequirements);
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
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {localRequirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <Select
                value={req}
                onValueChange={(value) => updateRequirement(index, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select requirement" />
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
                size="icon"
                onClick={() => removeRequirement(index)}
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addRequirement}
          >
            Add Requirement
          </Button>
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};