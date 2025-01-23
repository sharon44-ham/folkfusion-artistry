import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ArtGallery } from "@/components/ArtGallery";
import { StyleSelector } from "@/components/StyleSelector";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Heart, Share2, Trophy, Palette } from "lucide-react";
import { transformImage, checkPredictionStatus } from "@/services/replicateService";
import { artStyles, ArtStyle } from "@/types/artStyles";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [transformationProgress, setTransformationProgress] = useState<number>(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const { toast } = useToast();

  const galleryItems = [
    {
      id: "1",
      title: "Nature's Dance",
      description: "A vibrant fusion of contemporary patterns with traditional Kalamkari motifs",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
      likes: 245,
      artist: "Maya P.",
    },
    {
      id: "2",
      title: "Urban Dreams",
      description: "Modern cityscapes reimagined through the lens of ancient artistry",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
      likes: 189,
      artist: "Raj K.",
    },
    {
      id: "3",
      title: "Digital Harmony",
      description: "Where pixels meet handcrafted excellence",
      originalUrl: "/placeholder.svg",
      transformedUrl: "/placeholder.svg",
      likes: 312,
      artist: "Sarah M.",
    },
  ];

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    toast({
      title: "Image selected",
      description: "Now choose an art style for transformation",
    });
  };

  const handleStyleSelect = (style: ArtStyle) => {
    setSelectedStyleId(style.id);
    toast({
      title: `${style.name} style selected`,
      description: "Click transform to begin the artistic process",
    });
  };

  const handleTransform = async () => {
    if (!selectedImage || !selectedStyleId) {
      toast({
        title: "Missing requirements",
        description: "Please select both an image and art style",
        variant: "destructive",
      });
      return;
    }

    setIsTransforming(true);
    setTransformationProgress(0);

    try {
      const imageUrl = "YOUR_UPLOADED_IMAGE_URL";
      
      const style = artStyles.find(s => s.id === selectedStyleId);
      if (!style) throw new Error("Style not found");

      const prediction = await transformImage(
        imageUrl,
        style.modelId,
        `Transform this image in the style of ${style.name} art`
      );

      const pollInterval = setInterval(async () => {
        const status = await checkPredictionStatus(prediction.id);
        
        if (status.status === "succeeded") {
          clearInterval(pollInterval);
          setIsTransforming(false);
          setTransformationProgress(100);
          
          const newArtwork = {
            id: prediction.id,
            title: `${style.name} Transformation`,
            originalUrl: imageUrl,
            transformedUrl: status.output[0],
            artist: "AI Artist",
            likes: 0,
          };
          
          toast({
            title: "Transformation complete!",
            description: "Your artwork has been created successfully",
          });
        } else if (status.status === "failed") {
          clearInterval(pollInterval);
          setIsTransforming(false);
          throw new Error("Transformation failed");
        } else {
          setTransformationProgress((prev) => Math.min(prev + 10, 90));
        }
      }, 2000);
    } catch (error) {
      console.error("Transformation error:", error);
      setIsTransforming(false);
      toast({
        title: "Transformation failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <main className="container mx-auto px-4 py-8 space-y-12">
        <Header />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-8"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-kalamkari-text">
            Choose Your Art Style
          </h2>
          <StyleSelector
            onStyleSelect={handleStyleSelect}
            selectedStyleId={selectedStyleId}
          />
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-auto max-w-2xl bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/50"
        >
          <ImageUpload onImageSelect={handleImageSelect} />
          {selectedImage && selectedStyleId && (
            <div className="mt-4 space-y-4">
              {isTransforming ? (
                <div className="space-y-2">
                  <Progress value={transformationProgress} />
                  <p className="text-sm text-center text-gray-600">
                    Transforming your artwork... {transformationProgress}%
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleTransform}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                  disabled={isTransforming}
                >
                  <Palette className="mr-2" />
                  Transform Artwork
                </Button>
              )}
            </div>
          )}
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16"
        >
          <h2 className="mb-8 text-2xl font-semibold text-center text-kalamkari-text">
            Community Gallery
          </h2>
          <ArtGallery pieces={galleryItems} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center bg-white/30 backdrop-blur-sm rounded-xl p-8 border border-white/50"
        >
          <h2 className="mb-4 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            About Kalamkari Art
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 leading-relaxed">
            Kalamkari is an ancient Indian art form of hand-painting or block-printing
            on cotton textile using natural dyes. The word Kalamkari comes from 'kalam'
            meaning pen, and 'kari' meaning craftsmanship. This traditional art form
            dates back to over 3000 years and continues to inspire artists worldwide.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
              <Trophy className="mr-2" />
              Join Challenge
            </Button>
            <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
              Learn More
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
