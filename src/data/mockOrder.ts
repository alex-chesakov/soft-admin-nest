
export const mockOrder = {
  id: "ORD-001",
  customerName: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  date: "2024-02-20",
  status: "in progress" as const,
  total: 2499.91,
  items: [
    { id: "1", productName: "Premium Laptop", quantity: 1, price: 1299.99, itemNumber: "LP-2024", upc: "123456789012" },
    { id: "2", productName: "Wireless Mouse", quantity: 2, price: 49.99, itemNumber: "WM-567", upc: "234567890123" },
    { id: "3", productName: "Laptop Stand", quantity: 1, price: 79.99, itemNumber: "LS-789", upc: "345678901234" },
    { id: "4", productName: "External SSD 1TB", quantity: 1, price: 159.99, itemNumber: "SSD-001", upc: "456789012345" },
    { id: "5", productName: "USB-C Hub", quantity: 1, price: 69.99, itemNumber: "HUB-45", upc: "567890123456" },
    { id: "6", productName: "Laptop Backpack", quantity: 1, price: 89.99, itemNumber: "BP-123", upc: "678901234567" },
    { id: "7", productName: "Wireless Keyboard", quantity: 1, price: 129.99, itemNumber: "WK-890", upc: "789012345678" }
  ],
  requirements: ["Handle with care", "Signature required"],
  location: "New York",
  collector: {
    name: "Alice Smith",
    phone: "+1987654321",
    email: "alice@example.com",
    collectionWindow: "09:00 AM - 11:00 AM"
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
