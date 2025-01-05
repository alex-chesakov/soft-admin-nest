import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react";

const ProofOfCollection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Image className="h-5 w-5" />
          Proof of Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-video rounded-lg border bg-muted">
            <img
              src="/placeholder.svg"
              alt="POC 1"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative aspect-video rounded-lg border bg-muted">
            <img
              src="/placeholder.svg"
              alt="POC 2"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProofOfCollection;