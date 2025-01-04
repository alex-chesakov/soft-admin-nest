import { Card } from "@/components/ui/card";
import { Collector } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CollectorsListProps {
  collectors: Collector[];
  onEdit: (collector: Collector) => void;
  onDelete: (collectorId: string) => void;
}

export const CollectorsList = ({ collectors, onEdit, onDelete }: CollectorsListProps) => {
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
                    <div className="flex flex-wrap gap-2 mt-2">
                      {collector.locations && collector.locations.length > 0 ? (
                        collector.locations.map((location) => (
                          <Badge key={location} variant="secondary">
                            {location}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No locations assigned</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(collector)}
                    className="hover:bg-muted"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(collector.id)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};