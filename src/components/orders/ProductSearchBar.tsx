import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { OrderItem } from "@/types/order";

// Sample products data - in a real app, this would come from an API or database
const availableProducts = [
  { id: 1, name: "Premium Laptop", price: 1299.99 },
  { id: 2, name: "Wireless Mouse", price: 49.99 },
  { id: 3, name: "4K Monitor", price: 499.99 },
  { id: 4, name: "Mechanical Keyboard", price: 129.99 },
  { id: 5, name: "Gaming Console", price: 499.99 },
  { id: 6, name: "Gaming Controller", price: 59.99 },
  { id: 7, name: "Gaming Headset", price: 89.99 },
  { id: 8, name: "Smart Watch", price: 299.99 },
  { id: 9, name: "Watch Band", price: 29.99 },
  { id: 10, name: "Screen Protector", price: 19.99 },
  { id: 11, name: "Professional Camera", price: 999.99 },
  { id: 12, name: "Camera Lens", price: 599.99 },
];

interface ProductSearchBarProps {
  onProductAdd: (item: OrderItem) => void;
  existingItems: OrderItem[];
}

export const ProductSearchBar = ({ onProductAdd, existingItems }: ProductSearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Filter out products that are already in the order
  const availableProductsFiltered = availableProducts.filter(
    (product) => !existingItems.some((item) => item.productName === product.name)
  );

  const handleProductSelect = (productName: string) => {
    const product = availableProducts.find((p) => p.name === productName);
    if (product) {
      onProductAdd({
        id: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
      });
      setOpen(false);
      setValue("");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <Search className="mr-2 h-4 w-4" />
            {value || "Search products..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search products..." 
              value={value}
              onValueChange={setValue}
            />
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              {availableProductsFiltered
                .filter((product) =>
                  product.name.toLowerCase().includes(value.toLowerCase())
                )
                .map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={handleProductSelect}
                    className="cursor-pointer"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {product.name} - ${product.price}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};