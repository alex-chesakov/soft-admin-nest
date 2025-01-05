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
  onAdd: (name: string, description: string) => void;
}

export const AddItemDialog = ({ onAdd }: AddItemDialogProps) => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");

  const handleAddItem = () => {
    if (newItemName && newItemDescription) {
      onAdd(newItemName, newItemDescription);
      setNewItemName("");
      setNewItemDescription("");
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
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
              placeholder="Enter item description"
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