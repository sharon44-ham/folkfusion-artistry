import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { ArtStyle, artStyles } from "@/types/artStyles";

interface StyleSelectorProps {
  onStyleSelect: (style: ArtStyle) => void;
  selectedStyleId: string | null;
}

export const StyleSelector = ({ onStyleSelect, selectedStyleId }: StyleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artStyles.map((style) => (
        <motion.div
          key={style.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStyleSelect(style)}
        >
          <Card
            className={`cursor-pointer overflow-hidden transition-all duration-300
              ${
                selectedStyleId === style.id
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:shadow-lg"
              }`}
          >
            <div className="aspect-square relative">
              <img
                src={style.imageUrl}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">{style.name}</h3>
                  </div>
                  <p className="text-sm mt-2 text-white/80">{style.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};