import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react";
import { useState } from "react";

interface ProofOfCollectionProps {
  onComplete?: () => void;
}

const ProofOfCollection = ({ onComplete }: ProofOfCollectionProps) => {
  const [images] = useState<string[]>([]);

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
          {[0, 1].map((index) => (
            <div key={index} className="relative aspect-video rounded-lg border bg-muted">
              {images[index] ? (
                <img
                  src={images[index]}
                  alt={`POC ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-gray-400">No image</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProofOfCollection;