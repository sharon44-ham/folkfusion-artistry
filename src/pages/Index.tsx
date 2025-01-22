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
import { motion } from "framer-motion";
import { Heart, Share2, Sparkles, Trophy, Palette } from "lucide-react";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Featured gallery items with artistic descriptions
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
      description: "Your image is ready for transformation",
    });
  };

  const handleTransform = () => {
    toast({
      title: "Coming Soon",
      description: "The AI transformation feature will be available soon!",
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
    toast({
      title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites",
      description: "Your preferences have been updated",
    });
  };

  const handleShare = (title: string) => {
    // Simulated share functionality
    toast({
      title: "Sharing coming soon!",
      description: `Soon you'll be able to share "${title}" with others!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/50 shadow-lg">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              AI-Powered Art Transformation
            </span>
          </div>
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            FolkFusion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your contemporary art into beautiful Kalamkari style using our
            AI-powered platform. Join our creative community and explore the fusion of
            tradition and technology.
          </p>
        </motion.div>

        {/* Featured Works Carousel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-8"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-kalamkari-text">
            Featured Transformations
          </h2>
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {galleryItems.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-2"
                  >
                    <div className="rounded-xl overflow-hidden bg-white/70 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/50">
                      <div className="relative">
                        <img
                          src={item.originalUrl}
                          alt={item.title}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                            onClick={() => toggleFavorite(item.id)}
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                favorites.includes(item.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-600"
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                            onClick={() => handleShare(item.title)}
                          >
                            <Share2 className="h-5 w-5 text-gray-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-gray-500">by {item.artist}</span>
                          <span className="text-sm text-primary flex items-center gap-1">
                            <Heart className="h-4 w-4" /> {item.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/50 backdrop-blur-sm border-white/50" />
            <CarouselNext className="bg-white/50 backdrop-blur-sm border-white/50" />
          </Carousel>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-auto max-w-2xl bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/50"
        >
          <ImageUpload onImageSelect={handleImageSelect} />
          {selectedImage && (
            <div className="mt-4 text-center">
              <Button
                onClick={handleTransform}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <Palette className="mr-2" />
                Transform to Kalamkari Style
              </Button>
            </div>
          )}
        </motion.div>

        {/* Gallery Section */}
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

        {/* About Section */}
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