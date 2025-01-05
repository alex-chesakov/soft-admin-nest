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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleProductSelect = (productName: string) => {
    const product = products.find((p) => p.name === productName);
    if (product) {
      onProductSelect({
        id: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
      });
      setValue("");
    }
  };

  return (
    <div className="relative w-72">
      <Command className="border rounded-md">
        <CommandInput
          placeholder="Add product..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList className={value ? "visible" : "hidden"}>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup>
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={handleProductSelect}
              >
                <div className="flex justify-between w-full">
                  <span>{product.name}</span>
                  <span>${product.price}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};