import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ArtGallery } from "@/components/ArtGallery";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();
  
  // Featured gallery items with artistic descriptions
  const galleryItems = [
    {
      id: "1",
      title: "Nature's Dance",
      description: "A vibrant fusion of contemporary patterns with traditional Kalamkari motifs",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
    },
    {
      id: "2",
      title: "Urban Dreams",
      description: "Modern cityscapes reimagined through the lens of ancient artistry",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
    },
    {
      id: "3",
      title: "Digital Harmony",
      description: "Where pixels meet handcrafted excellence",
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
    toast({
      title: "Coming Soon",
      description: "The AI transformation feature will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kalamkari-bg to-purple-50">
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Art Transformation</span>
          </div>
          <h1 className="text-5xl font-bold text-kalamkari-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            FolkFusion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your contemporary art into beautiful Kalamkari style using our
            AI-powered platform
          </p>
        </div>

        {/* Featured Works Carousel */}
        <div className="py-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-kalamkari-text">
            Featured Transformations
          </h2>
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {galleryItems.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={item.originalUrl}
                        alt={item.title}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Upload Section */}
        <div className="mx-auto max-w-2xl bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <ImageUpload onImageSelect={handleImageSelect} />
          {selectedImage && (
            <div className="mt-4 text-center">
              <Button
                onClick={handleTransform}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                Transform to Kalamkari Style
              </Button>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-semibold text-center text-kalamkari-text">
            Community Gallery
          </h2>
          <ArtGallery pieces={galleryItems} />
        </section>

        {/* About Section */}
        <section className="mt-16 text-center bg-white/30 backdrop-blur-sm rounded-xl p-8">
          <h2 className="mb-4 text-2xl font-semibold text-kalamkari-text">
            About Kalamkari Art
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 leading-relaxed">
            Kalamkari is an ancient Indian art form of hand-painting or block-printing
            on cotton textile using natural dyes. The word Kalamkari comes from 'kalam'
            meaning pen, and 'kari' meaning craftsmanship. This traditional art form
            dates back to over 3000 years and continues to inspire artists worldwide.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;