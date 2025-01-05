import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderDetailsEditDialogProps {
  deliveryDate: string;
  deliveryWindow: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  onSave: (data: {
    deliveryDate: string;
    deliveryWindow: string;
    paymentStatus: 'paid' | 'pending' | 'failed';
  }) => void;
}

export const OrderDetailsEditDialog = ({
  deliveryDate,
  deliveryWindow,
  paymentStatus,
  onSave,
}: OrderDetailsEditDialogProps) => {
  const [deliveryWindows, setDeliveryWindows] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const windows = loadDictionaryItems('delivery-windows');
    setDeliveryWindows(windows);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave({
      deliveryDate: formData.get('deliveryDate') as string,
      deliveryWindow: formData.get('deliveryWindow') as string,
      paymentStatus: formData.get('paymentStatus') as 'paid' | 'pending' | 'failed',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Order Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="deliveryDate">Delivery Date</Label>
            <Input
              id="deliveryDate"
              name="deliveryDate"
              defaultValue={deliveryDate}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deliveryWindow">Delivery Window</Label>
            <Select name="deliveryWindow" defaultValue={deliveryWindow}>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery window" />
              </SelectTrigger>
              <SelectContent>
                {deliveryWindows.map((window) => (
                  <SelectItem key={window.id} value={window.name}>
                    {window.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              defaultValue={paymentStatus}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};