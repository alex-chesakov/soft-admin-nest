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
import { useState, useEffect } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface CustomerSelectorProps {
  value: string;
  onChange: (value: string, email: string, phone: string) => void;
}

export function CustomerSelector({ value = '', onChange }: CustomerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const defaultCustomers = [
      {
        id: "CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
      },
      {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 234 567 8901",
      },
    ];

    try {
      const storedCustomers = localStorage.getItem("customers");
      const parsedCustomers = storedCustomers ? JSON.parse(storedCustomers) : [];
      
      // Ensure we always have an array of customers
      setCustomers(Array.isArray(parsedCustomers) && parsedCustomers.length > 0 
        ? parsedCustomers 
        : defaultCustomers
      );
    } catch (error) {
      console.error("Error loading customers:", error);
      setCustomers(defaultCustomers);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Ensure we're working with a valid array and valid customer objects
  const safeCustomers = (Array.isArray(customers) ? customers : []).filter(customer => 
    customer && 
    typeof customer === 'object' && 
    typeof customer.name === 'string' &&
    typeof customer.email === 'string' &&
    typeof customer.phone === 'string'
  );

  // Safe filtering with null checks
  const filteredCustomers = safeCustomers.filter(customer => {
    const searchLower = searchValue.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <Button
        variant="outline"
        role="combobox"
        className="w-full justify-between"
        disabled
      >
        Loading customers...
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select customer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Search customers..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandEmpty>No customer found.</CommandEmpty>
          <CommandGroup>
            {filteredCustomers.map((customer) => (
              <CommandItem
                key={customer.id}
                value={customer.name}
                onSelect={() => {
                  onChange(customer.name, customer.email, customer.phone);
                  setOpen(false);
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