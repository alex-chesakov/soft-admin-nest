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
      if (storedCustomers) {
        const parsedCustomers = JSON.parse(storedCustomers);
        setCustomers(Array.isArray(parsedCustomers) && parsedCustomers.length > 0 
          ? parsedCustomers 
          : defaultCustomers
        );
      } else {
        setCustomers(defaultCustomers);
      }
    } catch (error) {
      console.error("Error loading customers:", error);
      setCustomers(defaultCustomers);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Ensure we're working with a valid array
  const safeCustomers = Array.isArray(customers) && customers.length > 0 
    ? customers 
    : [];

  // Safe filtering with null checks
  const filteredCustomers = safeCustomers.filter(customer => {
    if (!customer || typeof customer !== 'object') return false;
    
    const searchLower = searchValue.toLowerCase();
    const nameMatch = customer.name?.toLowerCase()?.includes(searchLower) ?? false;
    const emailMatch = customer.email?.toLowerCase()?.includes(searchLower) ?? false;
    const phoneMatch = customer.phone?.toLowerCase()?.includes(searchLower) ?? false;
    
    return nameMatch || emailMatch || phoneMatch;
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