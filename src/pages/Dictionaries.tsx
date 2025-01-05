import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface DictionaryItem {
  id: string;
  name: string;
  description: string;
}

const Dictionaries = () => {
  const [selectedDictionary, setSelectedDictionary] = useState<string>("");
  const [items, setItems] = useState<DictionaryItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");

  const handleDictionaryChange = (value: string) => {
    setSelectedDictionary(value);
    // Mock data - in a real app, this would fetch from an API
    setItems([
      { id: "1", name: "Item 1", description: "Description 1" },
      { id: "2", name: "Item 2", description: "Description 2" },
    ]);
  };

  const handleAddItem = () => {
    if (newItemName && newItemDescription) {
      const newItem: DictionaryItem = {
        id: Date.now().toString(),
        name: newItemName,
        description: newItemDescription,
      };
      setItems([...items, newItem]);
      setNewItemName("");
      setNewItemDescription("");
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dictionaries</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Dictionaries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md">
            <label htmlFor="dictionary-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Dictionary
            </label>
            <Select onValueChange={handleDictionaryChange} value={selectedDictionary}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a dictionary to manage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order-requirements">Order Requirements</SelectItem>
                <SelectItem value="delivery-windows">Delivery Windows</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedDictionary && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {selectedDictionary === "order-requirements" ? "Order Requirements" : "Delivery Windows"}
                </h3>
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
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dictionaries;