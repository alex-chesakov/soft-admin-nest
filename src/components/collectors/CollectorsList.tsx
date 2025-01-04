import { Card } from "@/components/ui/card";
import { Collector } from "@/types/user";
import { defaultLocations } from "@/types/location";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface CollectorsListProps {
  collectors: Collector[];
  onEdit: (collector: Collector) => void;
}

export const CollectorsList = ({ collectors, onEdit }: CollectorsListProps) => {
  return (
    <div className="space-y-4">
      {collectors.length === 0 ? (
        <p className="text-muted-foreground">No collectors found.</p>
      ) : (
        <div className="grid gap-4">
          {collectors.map((collector, index) => (
            <Card
              key={collector.id}
              className="p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 text-sm font-medium text-muted-foreground bg-muted rounded-full">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">
                      {collector.name} {collector.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {collector.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {collector.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Locations: {collector.locations.map(id => 
                        defaultLocations.find(l => l.id === id)?.name
                      ).join(', ')}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(collector)}
                  className="hover:bg-muted"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};