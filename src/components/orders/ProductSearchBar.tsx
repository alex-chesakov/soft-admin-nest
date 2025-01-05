import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { OrderItem } from "@/types/order";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: 8, name: "Wireless Headphones", price: 199.99 },
  { id: 9, name: "Mechanical Keyboard", price: 149.99 },
  { id: 10, name: "Gaming Mouse", price: 79.99 },
  { id: 11, name: "Monitor Stand", price: 49.99 },
  { id: 12, name: "USB Microphone", price: 129.99 },
  { id: 13, name: "Webcam HD", price: 89.99 },
  { id: 14, name: "Desk Mat", price: 29.99 },
  { id: 15, name: "Cable Management Kit", price: 19.99 },
];

interface ProductSearchBarProps {
  onProductSelect: (product: OrderItem) => void;
}

export const ProductSearchBar = ({ onProductSelect }: ProductSearchBarProps) => {
  const [value, setValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<"unit" | "case">("unit");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleProductSelect = (productName: string) => {
    const product = products.find((p) => p.name === productName);
    if (product) {
      onProductSelect({
        id: product.id,
        productName: product.name,
        price: selectedUnit === "case" ? product.price * 6 : product.price, // Assuming a case contains 6 units
        quantity: 1,
      });
      setValue("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="relative w-96">
          <Command className="border rounded-md">
            <CommandInput
              placeholder="Add product..."
              value={value}
              onValueChange={setValue}
            />
            <div className="absolute left-0 right-0 top-[100%] mt-1 z-50">
              <CommandList className={value ? "visible bg-popover border rounded-md shadow-md" : "hidden"}>
                <CommandEmpty>No products found.</CommandEmpty>
                <CommandGroup>
                  {filteredProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.name}
                      className="flex justify-between items-center"
                    >
                      <div className="flex justify-between flex-1 mr-4">
                        <span>{product.name}</span>
                        <span>${selectedUnit === "case" ? (product.price * 6).toFixed(2) : product.price.toFixed(2)}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleProductSelect(product.name);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </div>
          </Command>
        </div>
        <div className="flex rounded-md overflow-hidden">
          <Button
            variant={selectedUnit === "unit" ? "default" : "outline"}
            className="rounded-r-none"
            onClick={() => setSelectedUnit("unit")}
          >
            Unit
          </Button>
          <Button
            variant={selectedUnit === "case" ? "default" : "outline"}
            className="rounded-l-none"
            onClick={() => setSelectedUnit("case")}
          >
            Case
          </Button>
        </div>
      </div>
    </div>
  );
};