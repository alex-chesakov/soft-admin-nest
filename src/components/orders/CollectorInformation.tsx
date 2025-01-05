import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, UserCog, UserPlus } from "lucide-react";
import { CollectorInfoEditDialog } from "./CollectorInfoEditDialog";
import ProofOfCollection from "./ProofOfCollection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [isCollectorOpen, setIsCollectorOpen] = useState(true);
  const [isProofOpen, setIsProofOpen] = useState(true);

  return (
    <div className="space-y-6">
      <Collapsible open={isCollectorOpen} onOpenChange={setIsCollectorOpen}>
        <Card>
          <CardHeader>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <CardTitle className="flex items-center justify-between text-lg w-full">
                <div className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  Collector Information
                </div>
                {role === 'admin' && collector?.name && (
                  <CollectorInfoEditDialog collector={collector} onSave={onSave} />
                )}
              </CardTitle>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                isCollectorOpen ? "transform rotate-180" : ""
              )} />
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              {collector?.name ? (
                <div className="space-y-2">
                  <p className="font-medium">{collector.name}</p>
                  <p className="text-sm text-gray-500">{collector.email}</p>
                  <p className="text-sm text-gray-500">{collector.phone}</p>
                  {collector.collectionWindow && (
                    <div className="mt-4">
                      <h3 className="font-bold text-base mb-1">Collection Window</h3>
                      <p className="text-sm text-gray-500">{collector.collectionWindow}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  {role === 'admin' && (
                    <CollectorInfoEditDialog onSave={onSave}>
                      <Button variant="destructive">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign Collector
                      </Button>
                    </CollectorInfoEditDialog>
                  )}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={isProofOpen} onOpenChange={setIsProofOpen}>
        <Card>
          <CardHeader>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                Proof of Collection
              </CardTitle>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                isProofOpen ? "transform rotate-180" : ""
              )} />
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <ProofOfCollection role={role} />
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default CollectorInformation;