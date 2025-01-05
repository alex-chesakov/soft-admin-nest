import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dictionaries = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dictionaries</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Dictionaries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Manage your system dictionaries here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dictionaries;