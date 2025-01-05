import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DictionaryTable } from "@/components/dictionaries/DictionaryTable";
import { AddItemDialog } from "@/components/dictionaries/AddItemDialog";
import { loadDictionaryItems, saveDictionaryItems, getNextId } from "@/utils/dictionaryStorage";

interface DictionaryItem {
  id: string;
  name: string;
}

const Dictionaries = () => {
  const [selectedDictionary, setSelectedDictionary] = useState<string>("");
  const [items, setItems] = useState<DictionaryItem[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedDictionary) {
      const savedItems = loadDictionaryItems(selectedDictionary);
      setItems(savedItems);
      setHasUnsavedChanges(false);
    }
  }, [selectedDictionary]);

  const handleDictionaryChange = (value: string) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to switch dictionaries?");
      if (!confirmed) return;
    }
    setSelectedDictionary(value);
  };

  const handleAddItem = (name: string) => {
    const newItem: DictionaryItem = {
      id: getNextId(items),
      name,
    };
    setItems([...items, newItem]);
    setHasUnsavedChanges(true);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      saveDictionaryItems(selectedDictionary, items);
      
      toast({
        title: "Changes saved successfully",
        description: `Updated ${selectedDictionary} dictionary`,
      });
      
      setHasUnsavedChanges(false);
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const getDictionaryDisplayName = (value: string) => {
    switch (value) {
      case "order-requirements":
        return "Order Requirements";
      case "delivery-windows":
        return "Delivery Windows";
      case "collection-windows":
        return "Collection Windows";
      case "order-statuses":
        return "Order Statuses";
      case "item-statuses":
        return "Item Statuses";
      default:
        return value;
    }
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
                <SelectItem value="collection-windows">Collection Windows</SelectItem>
                <SelectItem value="order-statuses">Order Statuses</SelectItem>
                <SelectItem value="item-statuses">Item Statuses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedDictionary && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {getDictionaryDisplayName(selectedDictionary)}
                </h3>
                <AddItemDialog onAdd={handleAddItem} />
              </div>

              <DictionaryTable items={items} onDelete={handleDeleteItem} />

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dictionaries;