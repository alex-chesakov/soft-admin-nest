import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone } from "lucide-react";

interface CollectorInformationProps {
  collector: {
    name: string;
    email: string;
    phone: string;
  };
}

export const CollectorInformation = ({ collector }: CollectorInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Collector Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-500" />
          <span>{collector.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{collector.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-gray-500" />
          <span>{collector.phone}</span>
        </div>
      </CardContent>
    </Card>
  );
};