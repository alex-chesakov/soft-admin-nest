import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from "lucide-react";
import { useState } from "react";

interface RequirementsEditDialogProps {
  requirements: string[];
  onSave: (requirements: string[]) => void;
}

export const RequirementsEditDialog = ({
  requirements,
  onSave,
}: RequirementsEditDialogProps) => {
  const [localRequirements, setLocalRequirements] = useState(requirements);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(localRequirements.filter(req => req.trim() !== ''));
  };

  const addRequirement = () => {
    setLocalRequirements([...localRequirements, '']);
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
              <Input
                value={req}
                onChange={(e) => updateRequirement(index, e.target.value)}
                placeholder="Enter requirement"
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