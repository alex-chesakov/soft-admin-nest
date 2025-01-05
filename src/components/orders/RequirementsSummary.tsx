import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequirementsEditDialog } from "./RequirementsEditDialog";

interface RequirementsSummaryProps {
  requirements: string[];
  onUpdate: (requirements: string[]) => void;
  role?: 'admin' | 'collector';
}

export const RequirementsSummary = ({
  requirements,
  onUpdate,
  role = 'admin',
}: RequirementsSummaryProps) => {
  const handleRequirementsUpdate = (updatedRequirements: string[]) => {
    console.log('Updating requirements:', updatedRequirements);
    onUpdate(updatedRequirements);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Info className="h-5 w-5 text-muted-foreground" />
          Order Requirements
          {role === 'admin' && (
            <RequirementsEditDialog
              requirements={requirements}
              onSave={handleRequirementsUpdate}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {requirements.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {requirements.map((requirement, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {requirement}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No requirements specified</p>
        )}
      </CardContent>
    </Card>
  );
};