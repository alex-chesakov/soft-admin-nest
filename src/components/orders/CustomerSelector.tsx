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
import { Admin, Collector } from "@/types/user";

interface CustomerSelectorProps {
  value: string;
  onChange: (value: string, email: string, phone: string) => void;
}

export function CustomerSelector({ value, onChange }: CustomerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<(Admin | Collector)[]>([]);

  useEffect(() => {
    // Load users from localStorage with proper initialization
    const admins: Admin[] = JSON.parse(localStorage.getItem("admins") || "[]");
    const collectors: Collector[] = JSON.parse(localStorage.getItem("collectors") || "[]");
    setUsers([...admins, ...collectors]);
  }, []);

  // Ensure we have users before rendering the Command component
  if (users.length === 0) {
    return (
      <Button
        variant="outline"
        role="combobox"
        className="w-full justify-between"
      >
        No users available
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
          <CommandInput placeholder="Search users..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {users.map((user) => (
              <CommandItem
                key={user.id}
                value={user.name}
                onSelect={() => {
                  onChange(
                    user.name,
                    user.email,
                    'phone' in user ? user.phone : ''
                  );
                  setOpen(false);
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
}