import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-6"
    >
      <div className="flex justify-center mb-8">
        <Logo />
      </div>
      <div className="inline-flex items-center space-x-2 bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/50 shadow-lg">
        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        <span className="text-sm font-medium bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          AI-Powered Art Transformation
        </span>
      </div>
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
        Transform Your Art
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Transform your contemporary art into beautiful traditional styles using our
        AI-powered platform. Join our creative community and explore the fusion of
        tradition and technology.
      </p>
    </motion.div>
  );
};