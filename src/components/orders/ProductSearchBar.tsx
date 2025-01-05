import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const mockProducts: Product[] = [
  { id: "P1", name: "Premium Laptop", price: 1299.99, status: "In Stock" },
  { id: "P2", name: "Wireless Mouse", price: 49.99, status: "Low Stock" },
  { id: "P3", name: "Laptop Stand", price: 79.99, status: "Out of Stock" },
  { id: "P4", name: "External SSD 1TB", price: 159.99, status: "In Stock" },
  { id: "P5", name: "USB-C Hub", price: 69.99, status: "In Stock" },
];

interface ProductSearchBarProps {
  onProductSelect: (product: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }) => void;
}

export const ProductSearchBar = ({ onProductSelect }: ProductSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product: Product) => {
    onProductSelect({
      id: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price,
    });
    setSearchTerm("");
    setOpen(false);
  };

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-muted-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleProductSelect(product)}
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <Badge className={getStatusColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};