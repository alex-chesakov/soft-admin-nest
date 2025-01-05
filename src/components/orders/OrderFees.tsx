import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import { OrderItem as OrderItemType } from "@/types/order";
import { ProductSearchBar } from "./ProductSearchBar";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";
import { useToast } from "@/hooks/use-toast";
import { OrderItemComponent } from "./OrderItem";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import ProofOfCollection from "./ProofOfCollection";

interface OrderFeesProps {
  items: OrderItemType[];
  fees: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  total: number;
  onItemsChange?: (items: OrderItemType[]) => void;
}

export const OrderFees = ({ items, fees, total, onItemsChange }: OrderFeesProps) => {
  const itemStatuses = loadDictionaryItems('item-statuses');
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleProductSelect = (newProduct: OrderItemType) => {
    if (onItemsChange) {
      const existingProduct = items.find(
        (item) => item.productName === newProduct.productName
      );

      if (existingProduct) {
        const updatedItems = items.map((item) =>
          item.productName === newProduct.productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        onItemsChange(updatedItems);
      } else {
        const randomStatus = itemStatuses[Math.floor(Math.random() * itemStatuses.length)];
        const productWithStatus: OrderItemType = {
          ...newProduct,
          id: "CRT006",
          status: randomStatus.name,
          unit: "Unit" as const
        };
        onItemsChange([...items, productWithStatus]);
      }
    }
  };

  const handleStatusChange = (itemId: string, newStatus: string, adjustedQty?: number) => {
    if (onItemsChange) {
      const updatedItems = items.map((item) =>
        item.id === itemId 
          ? { 
              ...item, 
              status: newStatus,
              adjustedQuantity: adjustedQty !== undefined ? adjustedQty : item.adjustedQuantity
            }
          : item
      );
      onItemsChange(updatedItems);
      toast({
        title: "Status updated",
        description: `Item status changed to ${newStatus}${adjustedQty ? ` with adjusted quantity: ${adjustedQty}` : ''}`,
      });
    }
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    if (onItemsChange) {
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      onItemsChange(updatedItems);
    }
  };

  const handleUnitChange = (itemId: string, unit: "Unit" | "Case") => {
    if (onItemsChange) {
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          const basePrice = unit === "Case" ? item.price / 10 : item.price * 10;
          return {
            ...item,
            unit,
            price: unit === "Case" ? basePrice * 10 : basePrice / 10
          };
        }
        return item;
      });
      onItemsChange(updatedItems);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (onItemsChange) {
      const updatedItems = items.filter((item) => item.id !== itemId);
      onItemsChange(updatedItems);
    }
  };

  const handleChargeClient = () => {
    setIsConfirmOpen(false);
    toast({
      title: "Processing charge",
      description: "Client charge initiated",
    });
  };
  const [isProofDialogOpen, setIsProofDialogOpen] = useState(false);

  const handleCollectionComplete = () => {
    setIsProofDialogOpen(true);
  };

  const handleProofComplete = () => {
    setIsProofDialogOpen(false);
    toast({
      title: "Collection Complete",
      description: "Collection has been marked as complete",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            Order Items
          </CardTitle>
          <ProductSearchBar onProductSelect={handleProductSelect} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <OrderItemComponent
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onUnitChange={handleUnitChange}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteItem}
              itemStatuses={itemStatuses}
            />
          ))}
          <div className="pt-4 space-y-2 border-t">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p>${fees.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Service Fee</p>
              <p>${fees.serviceFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Credit Card Fee (2.5%)</p>
              <p>${fees.creditCardFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <p>Estimated Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                onClick={handleCollectionComplete}
                className="bg-green-500 hover:bg-green-600 text-white h-8 text-sm px-3"
              >
                Collection Complete
              </Button>
              <Button 
                onClick={() => setIsConfirmOpen(true)}
                className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white h-8 text-sm px-3"
              >
                Charge Client
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Charge</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to charge the client ${total.toFixed(2)}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleChargeClient}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isProofDialogOpen} onOpenChange={setIsProofDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Upload Proof of Collection</DialogTitle>
          </DialogHeader>
          <ProofOfCollection onComplete={handleProofComplete} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};
