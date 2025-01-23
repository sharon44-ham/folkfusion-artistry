import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2"
    >
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
        <div className="absolute inset-0 bg-accent/50 rounded-lg transform -rotate-12"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          F
        </div>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
        FolkFusion
      </span>
    </motion.div>
  );
};