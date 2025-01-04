import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage administrator accounts and permissions.</p>
            <Button asChild>
              <Link to="/users/admins">Manage Admins</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collectors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage collector accounts and assignments.</p>
            <Button asChild>
              <Link to="/users/collectors">Manage Collectors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;