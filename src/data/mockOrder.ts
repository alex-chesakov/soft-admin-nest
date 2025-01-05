export const mockOrder = {
  id: "ORD-001",
  customerName: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  date: "2024-02-20",
  status: "pending",
  total: 599.97,
  items: [
    { id: 1, productName: "Premium Laptop", quantity: 1, price: 499.99 },
    { id: 2, productName: "Wireless Mouse", quantity: 2, price: 49.99 }
  ],
  requirements: ["Handle with care", "Signature required"],
  location: "New York",
  collector: {
    name: "Alice Smith",
    phone: "+1987654321",
    email: "alice@example.com"
  },
  paymentStatus: "paid",
  deliveryDate: "2024-02-22",
  deliveryWindow: "09:00 AM - 12:00 PM",
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA"
  },
  pickupLocations: [
    { name: "Warehouse A", address: "456 Storage St" }
  ],
  deliveryLocation: { name: "Office", address: "789 Work Ave" },
  fees: {
    subtotal: 549.98,
    serviceFee: 29.99,
    creditCardFee: 20.00
  }
};