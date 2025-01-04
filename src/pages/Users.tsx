import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Users = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Users management content will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;