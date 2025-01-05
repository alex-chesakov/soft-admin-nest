import { Order } from "@/types/order";

export const mockOrder: Order = {
  id: "ORD-001",
  customerName: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  date: "2024-02-20",
  status: "processing",
  total: 599.99,
  location: "New York", // Added the required location field
  items: [
    {
      id: 1,
      productName: "Product 1",
      quantity: 2,
      price: 299.99,
    },
  ],
  requirements: [
    "Handle with care",
    "Fragile items inside",
  ],
  fees: {
    subtotal: 599.98,
    serviceFee: 29.99,
    creditCardFee: 15.75,
  },
  deliveryDate: "2024-02-25",
  deliveryWindow: "9:00 AM - 12:00 PM",
  paymentStatus: "paid",
  pickupLocations: [
    {
      name: "Warehouse A",
      address: "123 Storage St",
    },
  ],
  deliveryLocation: {
    name: "Customer Address",
    address: "123 Main St",
  },
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  collector: {
    name: "Jane Smith",
    phone: "+1 234 567 8901",
    email: "jane@example.com",
  },
};