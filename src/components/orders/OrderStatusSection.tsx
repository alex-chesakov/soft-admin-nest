import { useState } from "react";
import { OrderHeader } from "./OrderHeader";

interface OrderStatusSectionProps {
  id: string;
  date: string;
  initialStatus: string;
}

export const OrderStatusSection = ({ id, date, initialStatus }: OrderStatusSectionProps) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    // Here you would typically make an API call to update the status
    console.log('Status updated:', newStatus);
  };

  return (
    <OrderHeader 
      id={id} 
      date={date} 
      status={status}
      onStatusUpdate={handleStatusUpdate}
    />
  );
};