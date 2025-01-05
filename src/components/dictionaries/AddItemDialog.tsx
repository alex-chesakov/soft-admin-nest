import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddItemDialogProps {
  onAdd: (name: string) => void;
}

export const AddItemDialog = ({ onAdd }: AddItemDialogProps) => {
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = () => {
    if (newItemName) {
      onAdd(newItemName);
      setNewItemName("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Dictionary Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter item name"
            />
          </div>
          <Button onClick={handleAddItem} className="w-full">
            Add Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};