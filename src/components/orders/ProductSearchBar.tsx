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
  const [selectedUnits, setSelectedUnits] = useState<Record<number, "unit" | "case">>({});

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleProductSelect = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      onProductSelect({
        id: product.id,
        productName: product.name,
        price: selectedUnits[product.id] === "case" ? product.price * 6 : product.price,
        quantity: 1,
      });
      setValue("");
    }
  };

  const toggleUnit = (productId: number) => {
    setSelectedUnits(prev => ({
      ...prev,
      [productId]: prev[productId] === "case" ? "unit" : "case"
    }));
  };

  return (
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
                  <div className="flex items-center gap-2 flex-1 mr-4">
                    <span>{product.name}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleUnit(product.id);
                      }}
                    >
                      {selectedUnits[product.id] === "case" ? "Case" : "Unit"}
                    </Button>
                    <span className="ml-auto">
                      ${selectedUnits[product.id] === "case" ? (product.price * 6).toFixed(2) : product.price.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleProductSelect(product.id);
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
  );
};