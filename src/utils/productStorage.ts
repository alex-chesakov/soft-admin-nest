import { OrderItem } from "@/types/order";

const PRODUCTS_STORAGE_KEY = 'order-products';

export const saveOrderProducts = (orderId: string, products: OrderItem[]) => {
  const existingData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  const allProducts = existingData ? JSON.parse(existingData) : {};
  
  allProducts[orderId] = products;
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(allProducts));
};

export const getOrderProducts = (orderId: string): OrderItem[] => {
  const existingData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!existingData) return [];
  
  const allProducts = JSON.parse(existingData);
  return allProducts[orderId] || [];
};

export const getAllOrderProducts = (): Record<string, OrderItem[]> => {
  const existingData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  return existingData ? JSON.parse(existingData) : {};
};