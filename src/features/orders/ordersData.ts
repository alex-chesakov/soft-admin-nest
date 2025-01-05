import { Order } from "@/types/order";

export const filterOrdersByStatus = (orders: Order[], status: string) => {
  if (!status || status.toLowerCase() === "all statuses") {
    return orders;
  }
  return orders.filter(order => 
    order.status.toLowerCase() === status.toLowerCase()
  );
};