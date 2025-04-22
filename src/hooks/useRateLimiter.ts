import { useRef, useEffect, useCallback } from "react";

type ScheduledTask = {
  fn: () => void;
  time: number;
  resolve: () => void;
};

export function useRateLimiter(limit: number) {
  const queueRef = useRef<ScheduledTask[]>([]);
  const timestampsRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const now = Date.now();
      timestampsRef.current = timestampsRef.current.filter(ts => now - ts < 1000);

      while (queueRef.current.length > 0) {
        const next = queueRef.current[0];
        if (next.time > now) break;
        if (timestampsRef.current.length >= limit) break;

        const task = queueRef.current.shift();
        task?.fn();
        task?.resolve();
        timestampsRef.current.push(now);
      }
    }, 10);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [limit]);

  const schedule = useCallback((fn: () => void, delay: number): Promise<void> => {
    const execTime = Date.now() + delay;
    return new Promise(resolve => {
      queueRef.current.push({ fn, time: execTime, resolve });
    });
  }, []);

  return schedule;
}
