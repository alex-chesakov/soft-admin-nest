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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const products = [
  { id: "8", name: "Wireless Headphones", price: 199.99, status: "In Stock", stock: 45 },
  { id: "9", name: "Mechanical Keyboard", price: 149.99, status: "Low Stock", stock: 5 },
  { id: "10", name: "Gaming Mouse", price: 79.99, status: "Out of Stock", stock: 0 },
  { id: "11", name: "Monitor Stand", price: 49.99, status: "In Stock", stock: 20 },
  { id: "12", name: "USB Microphone", price: 129.99, status: "In Stock", stock: 15 },
  { id: "13", name: "Webcam HD", price: 89.99, status: "Low Stock", stock: 3 },
  { id: "14", name: "Desk Mat", price: 29.99, status: "In Stock", stock: 30 },
  { id: "15", name: "Cable Management Kit", price: 19.99, status: "Out of Stock", stock: 0 },
];

interface ProductSearchBarProps {
  onProductSelect: (product: OrderItem) => void;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "In Stock":
      return "success";
    case "Low Stock":
      return "warning";
    case "Out of Stock":
      return "destructive";
    default:
      return "default";
  }
};

export const ProductSearchBar = ({ onProductSelect }: ProductSearchBarProps) => {
  const [value, setValue] = useState("");
  const [selectedUnits, setSelectedUnits] = useState<Record<string, "unit" | "case">>({});
  const [open, setOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      onProductSelect({
        id: product.id,
        productName: product.name,
        price: selectedUnits[product.id] === "case" ? product.price * 6 : product.price,
        quantity: 1,
        unit: selectedUnits[product.id] === "case" ? "Case" : "Unit"
      });
      setValue("");
      setOpen(false);
    }
  };

  const toggleUnit = (productId: string) => {
    setSelectedUnits(prev => ({
      ...prev,
      [productId]: prev[productId] === "case" ? "unit" : "case"
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-muted-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="relative w-full">
          <Command className="border rounded-md">
            <CommandInput
              placeholder="Search products..."
              value={value}
              onValueChange={setValue}
            />
            <CommandList>
              <CommandEmpty>No products found.</CommandEmpty>
              <CommandGroup>
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2 flex-1 mr-4">
                      <div className="flex flex-col">
                        <span>{product.name}</span>
                        <Badge variant={getStatusBadgeVariant(product.status)} className="w-fit mt-1">
                          {product.status}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs ml-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleUnit(product.id);
                        }}
                      >
                        {selectedUnits[product.id] === "case" ? "Case" : "Unit"}
                      </Button>
                      <span>
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
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};