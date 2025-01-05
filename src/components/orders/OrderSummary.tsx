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
import { useToast } from "@/hooks/use-toast";

interface OrderSummaryProps {
  fees: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  total: number;
  role?: 'admin' | 'collector';
  onStatusUpdate?: (status: string) => void;
}

export const OrderSummary = ({ fees, total, role = 'admin', onStatusUpdate }: OrderSummaryProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProofDialogOpen, setIsProofDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleChargeClient = () => {
    setIsConfirmOpen(false);
    toast({
      title: "Processing charge",
      description: "Client charge initiated",
    });
  };

  const handleCollectionComplete = () => {
    setIsProofDialogOpen(true);
  };

  const handleProofComplete = () => {
    setIsProofDialogOpen(false);
    if (onStatusUpdate) {
      onStatusUpdate("Collected");
    }
    toast({
      title: "Collection Complete",
      description: "Collection has been marked as complete",
    });
  };

  return (
    <>
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
          {role === 'admin' && (
            <Button 
              onClick={() => setIsConfirmOpen(true)}
              className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white h-8 text-sm px-3"
            >
              Charge Client
            </Button>
          )}
        </div>
      </div>

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
          <ProofOfCollection onComplete={handleProofComplete} role={role} />
        </DialogContent>
      </Dialog>
    </>
  );
};