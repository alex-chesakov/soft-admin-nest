import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerEditDialog } from "@/components/customers/CustomerEditDialog";
import { User } from "lucide-react";
import { Customer } from "@/types/customer";

interface CustomerInfoProps {
  customer: Customer;
  onCustomerUpdate: (customer: Customer) => void;
}

export const CustomerInfo = ({ customer, onCustomerUpdate }: CustomerInfoProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <CardTitle>Customer Details</CardTitle>
        </div>
        <CustomerEditDialog customer={customer} onSave={onCustomerUpdate} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-base">{customer.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-base">{customer.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Phone</label>
            <p className="text-base">{customer.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Total Orders</label>
            <p className="text-base">{customer.orders}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Total Spent</label>
            <p className="text-base">${customer.totalSpent.toFixed(2)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Last Order</label>
            <p className="text-base">{new Date(customer.lastOrder).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};