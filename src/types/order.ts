
export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  status?: string;
  unit?: "Unit" | "Case";
  adjustedQuantity?: number;
  productStatus?: string;
  item?: string;
  upc?: string;
  itemsPerCase?: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  status: "new order" | "in progress" | "collector assigned" | "in transit" | "collected" | "cancelled" | "delivered";
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
    collectionWindow?: string;
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
