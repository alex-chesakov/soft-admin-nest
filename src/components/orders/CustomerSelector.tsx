import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCustomers } from "@/data/mockCustomers";

interface CustomerSelectorProps {
  initialValue?: string;
  onSelect: (customer: { name: string; email: string; phone: string }) => void;
}

export function CustomerSelector({ initialValue = "", onSelect }: CustomerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [customers, setCustomers] = useState<Array<{ name: string; email: string; phone: string }>>([]);

  useEffect(() => {
    // Initialize customers and ensure it's never undefined
    const loadedCustomers = getCustomers();
    if (Array.isArray(loadedCustomers)) {
      setCustomers(loadedCustomers);
      console.log('Loaded customers:', loadedCustomers);
    } else {
      console.log('No customers found, using empty array');
      setCustomers([]);
    }
  }, []);

  // Add console.log to help debug
  console.log('CustomerSelector render - value:', value, 'customers:', customers);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? customers.find((customer) => customer.name === value)?.name
            : "Select customer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search customer..." />
          <CommandEmpty>No customer found.</CommandEmpty>
          <CommandGroup>
            {customers.map((customer) => (
              <CommandItem
                key={customer.email}
                value={customer.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onSelect(customer);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === customer.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {customer.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}