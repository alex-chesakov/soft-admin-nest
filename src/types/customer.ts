export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  locations: Array<{
    name: string;
    address: string;
  }>;
}