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

export function CustomerSelector({ value, onChange }: CustomerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      try {
        const parsedCustomers = JSON.parse(storedCustomers);
        setCustomers(Array.isArray(parsedCustomers) ? parsedCustomers : []);
      } catch (error) {
        console.error("Error parsing customers from localStorage:", error);
        setCustomers([]);
      }
    } else {
      setCustomers([
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
      ]);
    }
    setIsLoading(false);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchValue.toLowerCase())
  );

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

  if (!customers.length) {
    return (
      <Button
        variant="outline"
        role="combobox"
        className="w-full justify-between"
        disabled
      >
        No customers available
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