import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ArtGallery } from "@/components/ArtGallery";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();
  
  // Placeholder gallery items
  const galleryItems = [
    {
      id: "1",
      title: "Nature's Dance",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
    },
    {
      id: "2",
      title: "Urban Dreams",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
    },
    {
      id: "3",
      title: "Digital Harmony",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
    },
  ];

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    toast({
      title: "Image selected",
      description: "Your image is ready for transformation",
    });
  };

  const handleTransform = () => {
    // Placeholder for transformation logic
    toast({
      title: "Coming Soon",
      description: "The AI transformation feature will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-kalamkari-bg">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-kalamkari-text">
            FolkFusion
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Transform your contemporary art into beautiful Kalamkari style
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <ImageUpload onImageSelect={handleImageSelect} />
          {selectedImage && (
            <div className="mt-4 text-center">
              <Button onClick={handleTransform} className="bg-primary text-white">
                Transform to Kalamkari Style
              </Button>
            </div>
          )}
        </div>

        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-semibold text-center text-kalamkari-text">
            Gallery
          </h2>
          <ArtGallery pieces={galleryItems} />
        </section>

        <section className="mt-16 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-kalamkari-text">
            About Kalamkari Art
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Kalamkari is an ancient Indian art form of hand-painting or block-printing
            on cotton textile using natural dyes. The word Kalamkari comes from 'kalam'
            meaning pen, and 'kari' meaning craftsmanship.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;