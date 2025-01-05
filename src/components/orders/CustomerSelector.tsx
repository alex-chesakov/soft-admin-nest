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
import { mockCustomers } from "@/data/mockCustomers";

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
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchValue, setSearchValue] = useState("");

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
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search customers..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandEmpty>No customer found.</CommandEmpty>
          <CommandGroup>
            {customers
              .filter(customer => {
                const searchLower = searchValue.toLowerCase();
                return (
                  customer.name.toLowerCase().includes(searchLower) ||
                  customer.email.toLowerCase().includes(searchLower) ||
                  customer.phone.toLowerCase().includes(searchLower)
                );
              })
              .map((customer) => (
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