import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";
import { CollectorOrderFilters } from "./CollectorOrderFilters";

interface OrderFiltersProps {
  locations: string[];
  collectors: string[];
  statuses: string[];
  onStatusChange: (status: string) => void;
  role?: 'admin' | 'collector';
}

export const OrderFilters = ({ 
  locations, 
  collectors, 
  statuses, 
  onStatusChange,
  role = 'admin'
}: OrderFiltersProps) => {
  const [orderStatuses, setOrderStatuses] = useState<{ id: string; name: string }[]>([]);
  const paymentStatuses = ["All Payment Statuses", "paid", "pending", "failed"];
  const [collectorFilter, setCollectorFilter] = useState('all');

  useEffect(() => {
    const loadedStatuses = loadDictionaryItems('order-statuses');
    setOrderStatuses([{ id: '0', name: 'All Statuses' }, ...loadedStatuses]);
  }, []);

  if (role === 'collector') {
    return (
      <CollectorOrderFilters
        onFilterChange={(filter) => {
          setCollectorFilter(filter);
          // Map collector filters to corresponding status changes
          switch (filter) {
            case 'today':
              onStatusChange('today');
              break;
            case 'tomorrow':
              onStatusChange('tomorrow');
              break;
            default:
              onStatusChange('all');
          }
        }}
        activeFilter={collectorFilter}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search orders..." className="pl-8" />
      </div>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location} value={location.toLowerCase()}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Collector" />
        </SelectTrigger>
        <SelectContent>
          {collectors.map((collector) => (
            <SelectItem key={collector} value={collector.toLowerCase()}>
              {collector}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {orderStatuses.map((status) => (
            <SelectItem key={status.id} value={status.name.toLowerCase()}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Payment Status" />
        </SelectTrigger>
        <SelectContent>
          {paymentStatuses.map((status) => (
            <SelectItem key={status} value={status.toLowerCase()}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Order Date
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Delivery Date
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};