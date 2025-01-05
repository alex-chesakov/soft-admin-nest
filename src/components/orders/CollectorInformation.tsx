import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog } from "lucide-react";
import ProofOfCollection from "./ProofOfCollection";

interface CollectorInformationProps {
  collector?: {
    name: string;
    phone: string;
    email: string;
  };
  onSave: (data: {
    name: string;
    phone: string;
    email: string;
  }) => void;
}

const CollectorInformation = ({
  collector,
  onSave,
}: CollectorInformationProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserCog className="h-5 w-5" />
            Collector Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {collector ? (
            <div className="space-y-2">
              <p className="font-medium">{collector.name}</p>
              <p className="text-sm text-gray-500">{collector.email}</p>
              <p className="text-sm text-gray-500">{collector.phone}</p>
            </div>
          ) : (
            <p className="text-gray-500">No collector assigned</p>
          )}
        </CardContent>
      </Card>
      <ProofOfCollection />
    </div>
  );
};

export default CollectorInformation;