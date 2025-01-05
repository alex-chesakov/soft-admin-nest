import { ChevronDown, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequirementsEditDialog } from "./RequirementsEditDialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [isOpen, setIsOpen] = useState(true);

  const handleRequirementsUpdate = (updatedRequirements: string[]) => {
    console.log('Updating requirements:', updatedRequirements);
    onUpdate(updatedRequirements);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <FileText className="h-5 w-5" />
              Order Requirements
              {role === 'admin' && (
                <RequirementsEditDialog
                  requirements={requirements}
                  onSave={handleRequirementsUpdate}
                />
              )}
            </CardTitle>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "transform rotate-180" : ""
            )} />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
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
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};