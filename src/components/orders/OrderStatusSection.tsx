import { useState, useEffect } from "react";
import { OrderHeader } from "./OrderHeader";

interface OrderStatusSectionProps {
  id: string;
  date: string;
  initialStatus: string;
}

export const OrderStatusSection = ({ id, date, initialStatus }: OrderStatusSectionProps) => {
  const [status, setStatus] = useState(() => {
    // Try to get saved status from localStorage, fallback to initialStatus
    const savedStatus = localStorage.getItem(`order-status-${id}`);
    return savedStatus || initialStatus;
  });

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    // Save to localStorage
    localStorage.setItem(`order-status-${id}`, newStatus);
    // Here you would typically make an API call to update the status
    console.log('Status updated and saved:', newStatus);
  };

  // Update localStorage if initialStatus changes
  useEffect(() => {
    if (!localStorage.getItem(`order-status-${id}`)) {
      localStorage.setItem(`order-status-${id}`, initialStatus);
    }
  }, [id, initialStatus]);

  return (
    <OrderHeader 
      id={id} 
      date={date} 
      status={status}
      onStatusUpdate={handleStatusUpdate}
    />
  );
};