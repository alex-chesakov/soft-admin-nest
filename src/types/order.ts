export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled" | "in transit" | "collector assigned" | "new order" | "collected" | "in progress";
  total: number;
  items: OrderItem[];
  requirements?: string[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  collector?: {
    name: string;
    phone: string;
    email: string;
  };
  location: string;
  deliveryDate: string;
  deliveryWindow: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  fees?: {
    subtotal: number;
    serviceFee: number;
    creditCardFee: number;
  };
  pickupLocations: { name: string; address: string }[];
  deliveryLocation: { name: string; address: string };
}