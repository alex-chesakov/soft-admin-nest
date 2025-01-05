import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, UserPlus } from "lucide-react";
import { CollectorInfoEditDialog } from "./CollectorInfoEditDialog";
import ProofOfCollection from "./ProofOfCollection";

interface CollectorInformationProps {
  collector?: {
    name: string;
    phone: string;
    email: string;
    collectionWindow?: string;
  };
  onSave: (data: {
    name: string;
    phone: string;
    email: string;
    collectionWindow?: string;
  }) => void;
  role?: 'admin' | 'collector';
}

const CollectorInformation = ({
  collector,
  onSave,
  role = 'admin'
}: CollectorInformationProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Collector Information
            </div>
            {role === 'admin' && collector && (
              <CollectorInfoEditDialog collector={collector} onSave={onSave} />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {collector ? (
            <div className="space-y-2">
              <p className="font-medium">{collector.name}</p>
              <p className="text-sm text-gray-500">{collector.email}</p>
              <p className="text-sm text-gray-500">{collector.phone}</p>
              {collector.collectionWindow && (
                <p className="text-sm text-gray-500">Collection Window: {collector.collectionWindow}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <p className="text-gray-500">No collector assigned</p>
              {role === 'admin' && (
                <CollectorInfoEditDialog onSave={onSave}>
                  <Button variant="outline" className="w-full max-w-sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign Collector
                  </Button>
                </CollectorInfoEditDialog>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <ProofOfCollection role={role} />
    </div>
  );
};

export default CollectorInformation;