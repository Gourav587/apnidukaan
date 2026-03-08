import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface Props {
  swipeDistance: number;
  isSwiping: boolean;
  threshold?: number;
}

const SwipeBackIndicator = ({ swipeDistance, isSwiping, threshold = 80 }: Props) => {
  if (!isSwiping || swipeDistance <= 5) return null;
  const ready = swipeDistance >= threshold;

  return (
    <motion.div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] pointer-events-none md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`flex items-center justify-center h-10 w-10 rounded-full shadow-lg transition-colors ${
          ready ? "bg-primary text-primary-foreground scale-110" : "bg-card text-muted-foreground border"
        }`}
        style={{ transform: `translateX(${Math.min(swipeDistance * 0.4, 40)}px)` }}
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.div>
    </motion.div>
  );
};

export default SwipeBackIndicator;
