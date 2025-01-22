import { useState } from "react";
import { Card } from "@/components/ui/card";

interface ArtPiece {
  id: string;
  title: string;
  originalUrl: string;
  transformedUrl: string;
}

export const ArtGallery = ({ pieces }: { pieces: ArtPiece[] }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pieces.map((piece) => (
        <Card
          key={piece.id}
          className="overflow-hidden transition-transform duration-300 hover:scale-105"
          onMouseEnter={() => setHoveredId(piece.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative aspect-square">
            <img
              src={hoveredId === piece.id ? piece.transformedUrl : piece.originalUrl}
              alt={piece.title}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{piece.title}</h3>
            <p className="text-sm text-gray-500">
              Hover to see the {hoveredId === piece.id ? "transformed" : "original"} version
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};