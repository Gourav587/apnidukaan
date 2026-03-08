import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// Generate a short notification beep using Web Audio API
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Two-tone chime
    const playTone = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(880, now, 0.15);        // A5
    playTone(1174.66, now + 0.15, 0.2); // D6

    setTimeout(() => ctx.close(), 1000);
  } catch {
    // Silently fail if audio not available
  }
}

export function useOrderNotifications() {
  const queryClient = useQueryClient();
  const initialLoadDone = useRef(false);

  const handleNewOrder = useCallback((payload: any) => {
    if (!initialLoadDone.current) return;

    const order = payload.new;
    playNotificationSound();

    toast.success("🛒 New Order Received!", {
      description: `${order.customer_name || "Customer"} — ₹${order.total}`,
      duration: 8000,
      action: {
        label: "View",
        onClick: () => {
          window.location.href = "/admin/orders";
        },
      },
    });

    // Refresh order-related queries
    queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
  }, [queryClient]);

  useEffect(() => {
    // Small delay so existing rows don't trigger notifications
    const timer = setTimeout(() => {
      initialLoadDone.current = true;
    }, 2000);

    const channel = supabase
      .channel("admin-order-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        handleNewOrder
      )
      .subscribe();

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [handleNewOrder]);
}
