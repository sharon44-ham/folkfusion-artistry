import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArtPiece {
  id: string;
  title: string;
  description?: string;
  originalUrl: string;
  transformedUrl: string;
  likes?: number;
  artist?: string;
}

export const ArtGallery = ({ pieces }: { pieces: ArtPiece[] }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleShare = (title: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Sharing ${title}`);
  };

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="overflow-hidden transition-all duration-300 hover:scale-105 bg-white/50 backdrop-blur-sm border border-white/50"
            onMouseEnter={() => setHoveredId(piece.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-square">
              <img
                src={hoveredId === piece.id ? piece.transformedUrl : piece.originalUrl}
                alt={piece.title}
                className="h-full w-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    onClick={(e) => toggleFavorite(piece.id, e)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(piece.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    onClick={(e) => handleShare(piece.title, e)}
                  >
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold">{piece.title}</h3>
                  {piece.description && (
                    <p className="text-sm text-white/80">{piece.description}</p>
                  )}
                  {piece.artist && (
                    <p className="text-sm text-white/60 mt-2">by {piece.artist}</p>
                  )}
                  {piece.likes !== undefined && (
                    <div className="flex items-center gap-1 mt-2">
                      <Heart className="h-4 w-4" />
                      <span>{piece.likes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};