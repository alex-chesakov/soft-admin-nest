import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

const Admins = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Admins Management</CardTitle>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Create new admin
          </Button>
        </CardHeader>
        <CardContent>
          <p>Admin list will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admins;