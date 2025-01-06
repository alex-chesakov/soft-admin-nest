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
    adjustedSubtotal?: number;
    adjustedServiceFee?: number;
    adjustedCreditCardFee?: number;
  };
  total: number;
  adjustedTotal?: number;
  role?: 'admin' | 'collector';
  statusSummary?: {
    notCollected: number;
    collectedAdjusted: number;
    collected: number;
  };
}

export const OrderSummary = ({ fees, total, adjustedTotal, role = 'admin', statusSummary }: OrderSummaryProps) => {
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
    toast({
      title: "Collection Complete",
      description: "Collection has been marked as complete",
    });
  };

  return (
    <>
      <div className="pt-4 space-y-2 border-t">
        {statusSummary && (
          <div className="pb-4 border-b space-y-1">
            <p className="text-sm text-gray-500">Collection Status Summary:</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">{statusSummary.notCollected}</p>
                <p className="text-xs text-gray-500">Not Collected</p>
              </div>
              <div>
                <p className="text-sm font-medium">{statusSummary.collectedAdjusted}</p>
                <p className="text-xs text-gray-500">Collected Adjusted</p>
              </div>
              <div>
                <p className="text-sm font-medium">{statusSummary.collected}</p>
                <p className="text-xs text-gray-500">Collected</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Subtotal</p>
          <div className="flex items-center gap-2">
            <p className={fees.adjustedSubtotal ? "line-through text-gray-400" : ""}>
              ${fees.subtotal.toFixed(2)}
            </p>
            {fees.adjustedSubtotal && (
              <p className="text-green-600">${fees.adjustedSubtotal.toFixed(2)}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Service Fee</p>
          <div className="flex items-center gap-2">
            <p className={fees.adjustedServiceFee ? "line-through text-gray-400" : ""}>
              ${fees.serviceFee.toFixed(2)}
            </p>
            {fees.adjustedServiceFee && (
              <p className="text-green-600">${fees.adjustedServiceFee.toFixed(2)}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Credit Card Fee (2.5%)</p>
          <div className="flex items-center gap-2">
            <p className={fees.adjustedCreditCardFee ? "line-through text-gray-400" : ""}>
              ${fees.creditCardFee.toFixed(2)}
            </p>
            {fees.adjustedCreditCardFee && (
              <p className="text-green-600">${fees.adjustedCreditCardFee.toFixed(2)}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <p>Estimated Total</p>
          <div className="flex items-center gap-2">
            <p className={adjustedTotal ? "line-through text-gray-400" : ""}>
              ${total.toFixed(2)}
            </p>
            {adjustedTotal && (
              <p className="text-green-600">${adjustedTotal.toFixed(2)}</p>
            )}
          </div>
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
              Are you sure you want to charge the client ${adjustedTotal ? adjustedTotal.toFixed(2) : total.toFixed(2)}?
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
    </>
  );
};
