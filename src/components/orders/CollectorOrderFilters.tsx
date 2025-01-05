import { Button } from "@/components/ui/button";

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
    </div>
  );
};