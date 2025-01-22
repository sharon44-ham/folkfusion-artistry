import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ArtPiece {
  id: string;
  title: string;
  description?: string;
  originalUrl: string;
  transformedUrl: string;
}

export const ArtGallery = ({ pieces }: { pieces: ArtPiece[] }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
            className="overflow-hidden transition-all duration-300 hover:scale-105 bg-white/50 backdrop-blur-sm"
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
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold">{piece.title}</h3>
                  {piece.description && (
                    <p className="text-sm text-white/80">{piece.description}</p>
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