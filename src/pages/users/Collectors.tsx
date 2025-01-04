import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

const Collectors = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Collectors Management</CardTitle>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Create new collector
          </Button>
        </CardHeader>
        <CardContent>
          <p>Collector list will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Collectors;