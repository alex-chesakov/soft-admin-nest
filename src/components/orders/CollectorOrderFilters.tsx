import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectorOrderFiltersProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export const CollectorOrderFilters = ({
  onFilterChange,
  activeFilter
}: CollectorOrderFiltersProps) => {
  return (
    <div className="flex gap-4">
      <Button
        variant={activeFilter === 'all' ? 'default' : 'outline'}
        onClick={() => onFilterChange('all')}
      >
        All Orders
      </Button>
      <Button
        variant={activeFilter === 'today' ? 'default' : 'outline'}
        onClick={() => onFilterChange('today')}
      >
        Today
      </Button>
      <Button
        variant={activeFilter === 'tomorrow' ? 'default' : 'outline'}
        onClick={() => onFilterChange('tomorrow')}
      >
        Tomorrow
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[40px] p-0",
              activeFilter === 'custom' && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            initialFocus
            onSelect={(date) => {
              if (date) {
                onFilterChange(`custom-${date.toISOString()}`);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};