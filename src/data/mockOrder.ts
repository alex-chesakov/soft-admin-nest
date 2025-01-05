import { Order } from "@/types/order";

export const mockOrder: Order = {
  id: "ORD-001",
  customerName: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  date: "2024-02-20",
  status: "processing",
  total: 399.99,
  items: [
    { id: 1, productName: "Product 1", quantity: 2, price: 99.99 },
    { id: 2, productName: "Product 2", quantity: 1, price: 100.01 },
    { id: 3, productName: "Organic Coffee Beans", quantity: 3, price: 15.99 },
    { id: 4, productName: "Fresh Avocados", quantity: 5, price: 2.99 },
    { id: 5, productName: "Whole Grain Bread", quantity: 2, price: 4.99 },
    { id: 6, productName: "Free Range Eggs", quantity: 2, price: 6.99 },
    { id: 7, productName: "Greek Yogurt", quantity: 4, price: 3.99 },
    { id: 8, productName: "Organic Honey", quantity: 1, price: 8.99 },
    { id: 9, productName: "Almond Milk", quantity: 2, price: 4.50 },
    { id: 10, productName: "Quinoa Pack", quantity: 1, price: 7.99 },
    { id: 11, productName: "Chia Seeds", quantity: 2, price: 5.99 },
    { id: 12, productName: "Coconut Water", quantity: 6, price: 3.49 }
  ],
  requirements: [
    "Handle with care",
    "Temperature controlled",
    "Signature required"
  ],
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  collector: {
    name: "Alice Smith",
    phone: "+1 234 567 8901",
    email: "alice@example.com"
  },
  deliveryDate: "2024-02-22",
  deliveryWindow: "09:00 AM - 12:00 PM",
  paymentStatus: "paid",
  fees: {
    subtotal: 281.29,
    serviceFee: 56.26,
    creditCardFee: 12.44
  },
  pickupLocations: [
    {
      name: "Restaurant Depo",
      address: "1300 Mariposa ave, San Jose"
    },
    {
      name: "Costco",
      address: "150 Lawrence station drive, Sunnyvale"
    }
  ],
  deliveryLocation: {
    name: "Main Kitchen",
    address: "2500 El Camino Real, Palo Alto, CA 94306"
  }
};