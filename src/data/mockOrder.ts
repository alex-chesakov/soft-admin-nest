export const mockOrder = {
  id: "ORD-001",
  customerName: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  date: "2024-02-20",
  status: "in progress",
  total: 2499.91,
  items: [
    { id: "1", productName: "Premium Laptop", quantity: 1, price: 1299.99 },
    { id: "2", productName: "Wireless Mouse", quantity: 2, price: 49.99 },
    { id: "3", productName: "Laptop Stand", quantity: 1, price: 79.99 },
    { id: "4", productName: "External SSD 1TB", quantity: 1, price: 159.99 },
    { id: "5", productName: "USB-C Hub", quantity: 1, price: 69.99 },
    { id: "6", productName: "Laptop Backpack", quantity: 1, price: 89.99 },
    { id: "7", productName: "Wireless Keyboard", quantity: 1, price: 129.99 }
  ],
  requirements: ["Handle with care", "Signature required"],
  location: "New York",
  collector: {
    name: "Alice Smith",
    phone: "+1987654321",
    email: "alice@example.com"
  },
  paymentStatus: "paid" as const,
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
    subtotal: 2399.91,
    serviceFee: 49.99,
    creditCardFee: 50.01
  }
};