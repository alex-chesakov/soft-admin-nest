import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    deliveryDate,
    deliveryWindow,
    paymentStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-transparent">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Order Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="deliveryDate" className="text-sm font-medium">
              Delivery Date
            </label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={(e) =>
                setFormData({ ...formData, deliveryDate: e.target.value })
              }
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="deliveryWindow" className="text-sm font-medium">
              Delivery Window
            </label>
            <input
              type="text"
              id="deliveryWindow"
              name="deliveryWindow"
              value={formData.deliveryWindow}
              onChange={(e) =>
                setFormData({ ...formData, deliveryWindow: e.target.value })
              }
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="paymentStatus" className="text-sm font-medium">
              Payment Status
            </label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              defaultValue={paymentStatus}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentStatus: e.target.value as 'paid' | 'pending' | 'failed',
                })
              }
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