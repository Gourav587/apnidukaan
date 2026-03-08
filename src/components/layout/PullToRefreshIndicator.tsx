import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface Props {
  pullDistance: number;
  isRefreshing: boolean;
  threshold?: number;
}

const PullToRefreshIndicator = ({ pullDistance, isRefreshing, threshold = 80 }: Props) => {
  if (pullDistance <= 0 && !isRefreshing) return null;
  const progress = Math.min(pullDistance / threshold, 1);
  const ready = progress >= 1;

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[60] flex items-center justify-center pointer-events-none md:hidden"
      style={{ height: pullDistance }}
      animate={{ opacity: pullDistance > 10 ? 1 : 0 }}
    >
      <motion.div
        className={`flex items-center justify-center h-8 w-8 rounded-full shadow-lg ${
          ready || isRefreshing ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border"
        }`}
        animate={{ rotate: isRefreshing ? 360 : progress * 180 }}
        transition={isRefreshing ? { repeat: Infinity, duration: 0.8, ease: "linear" } : { duration: 0 }}
      >
        <RotateCcw className="h-4 w-4" />
      </motion.div>
    </motion.div>
  );
};

export default PullToRefreshIndicator;
