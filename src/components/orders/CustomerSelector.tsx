import { useState } from "react";
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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+1 234 567 8900" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 8901" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com", phone: "+1 234 567 8902" },
  { id: "4", name: "Bob Wilson", email: "bob@example.com", phone: "+1 234 567 8903" },
];

interface CustomerSelectorProps {
  onSelect: (user: User) => void;
  initialValue?: string;
}

export const CustomerSelector = ({ onSelect, initialValue }: CustomerSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? mockUsers.find((user) => user.name === value)?.name
            : "Select customer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search customers..." />
          <CommandEmpty>No customer found.</CommandEmpty>
          <CommandGroup>
            {mockUsers.map((user) => (
              <CommandItem
                key={user.id}
                value={user.name}
                onSelect={() => {
                  setValue(user.name);
                  setOpen(false);
                  onSelect(user);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};