import { Image, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProofOfCollectionProps {
  onComplete?: () => void;
  role?: 'admin' | 'collector';
}

const ProofOfCollection = ({ onComplete, role = 'admin' }: ProofOfCollectionProps) => {
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImages(prev => [...prev, ...newImages].slice(0, 2));
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleComplete = () => {
    if (images.length < 2) {
      toast({
        title: "Error",
        description: "Please upload 2 images before completing",
        variant: "destructive",
      });
      return;
    }
    
    if (onComplete) {
      onComplete();
    }
    
    toast({
      title: "Success",
      description: "Collection proof uploaded successfully",
    });
  };

  return (
    <div>
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
                {role === 'admin' ? (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                ) : (
                  <p className="text-gray-500">No image</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {role === 'admin' && (
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={handleComplete}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProofOfCollection;