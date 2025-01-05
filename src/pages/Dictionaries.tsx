import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Dictionaries = () => {
  const [selectedDictionary, setSelectedDictionary] = useState<string>("");

  const handleDictionaryChange = (value: string) => {
    setSelectedDictionary(value);
    console.log("Selected dictionary:", value);
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

          {selectedDictionary === "order-requirements" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Order Requirements</h3>
              <p className="text-muted-foreground">
                Manage order requirements dictionary items here.
              </p>
            </div>
          )}

          {selectedDictionary === "delivery-windows" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Windows</h3>
              <p className="text-muted-foreground">
                Manage delivery windows dictionary items here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dictionaries;