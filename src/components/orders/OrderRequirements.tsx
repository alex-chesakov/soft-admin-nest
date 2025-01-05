import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

interface OrderRequirementsProps {
  requirements: string[];
}

export const OrderRequirements = ({ requirements }: OrderRequirementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Order Requirements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {requirements.map((requirement, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-sm">•</span>
              <span className="text-sm">{requirement}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};