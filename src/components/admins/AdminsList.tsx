import { Card } from "@/components/ui/card";
import { Admin } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface AdminsListProps {
  admins: Admin[];
  onEdit: (admin: Admin) => void;
  onDelete: (adminId: string) => void;
}

export const AdminsList = ({ admins, onEdit, onDelete }: AdminsListProps) => {
  return (
    <div className="space-y-4">
      {admins.length === 0 ? (
        <p className="text-muted-foreground">No admins found.</p>
      ) : (
        <div className="grid gap-4">
          {admins.map((admin, index) => (
            <Card
              key={admin.id}
              className="p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 text-sm font-medium text-muted-foreground bg-muted rounded-full">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {admin.email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(admin)}
                    className="hover:bg-muted"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(admin.id)}
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