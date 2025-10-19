'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for countdown functionality with date target
 */
export function useCountdownDate(targetDate: Date) {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
}

/**
 * Hook for countdown functionality with seconds
 */
export function useCountdownSeconds(initialSeconds: number) {
  const [countdown, setCountdown] = useState(initialSeconds);
  const [counting, setCounting] = useState(false);

  const startCountdown = useCallback(() => {
    setCountdown(initialSeconds);
    setCounting(true);
  }, [initialSeconds]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (counting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCounting(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counting, countdown]);

  return {
    countdown,
    counting,
    startCountdown,
  };
}
