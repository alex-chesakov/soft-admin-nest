import { Card } from "@/components/ui/card";
import { Admin } from "@/types/user";
import { Button } from "@/components/ui/button";

interface AdminsListProps {
  admins: Admin[];
  onEdit: (admin: Admin) => void;
}

export const AdminsList = ({ admins, onEdit }: AdminsListProps) => {
  return (
    <div className="space-y-4">
      {admins.length === 0 ? (
        <p className="text-muted-foreground">No admins found.</p>
      ) : (
        <div className="grid gap-4">
          {admins.map((admin, index) => (
            <Card
              key={admin.id}
              className="p-4 transition-colors hover:bg-muted/50 cursor-pointer"
              onClick={() => onEdit(admin)}
            >
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
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};