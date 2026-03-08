import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UseSwipeBackOptions {
  edgeWidth?: number;
  threshold?: number;
}

export function useSwipeBack({ edgeWidth = 30, threshold = 80 }: UseSwipeBackOptions = {}) {
  const navigate = useNavigate();
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const active = useRef(false);
  const locked = useRef(false); // locked direction

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const x = e.touches[0].clientX;
    if (x <= edgeWidth) {
      startX.current = x;
      startY.current = e.touches[0].clientY;
      active.current = true;
      locked.current = false;
    }
  }, [edgeWidth]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!active.current) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = Math.abs(e.touches[0].clientY - startY.current);

    // Lock direction after first significant move
    if (!locked.current && (dx > 10 || dy > 10)) {
      locked.current = true;
      if (dy > dx) {
        // Vertical scroll, cancel
        active.current = false;
        setSwipeDistance(0);
        setIsSwiping(false);
        return;
      }
      setIsSwiping(true);
    }

    if (dx > 0 && locked.current) {
      setSwipeDistance(Math.min(dx, 200));
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!active.current) return;
    active.current = false;
    if (swipeDistance >= threshold) {
      if (navigator.vibrate) navigator.vibrate(10);
      navigate(-1);
    }
    setSwipeDistance(0);
    setIsSwiping(false);
  }, [swipeDistance, threshold, navigate]);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { swipeDistance, isSwiping };
}
