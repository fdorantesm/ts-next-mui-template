'use client';

import { useEffect, useRef } from "react";

type EventMap = WindowEventMap & DocumentEventMap;

type EventTargetLike = Window | Document | HTMLElement | EventTarget;

/**
 * Subscribes to DOM events with automatic cleanup when the component unmounts.
 */
export function useEventListener<K extends keyof EventMap>(
  eventName: K,
  listener: (event: EventMap[K]) => void,
  target?: EventTargetLike | null,
  options?: boolean | AddEventListenerOptions,
): void {
  const savedListener = useRef(listener);

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const eventTarget: EventTargetLike | undefined | null = target ?? (typeof window !== "undefined" ? window : undefined);

    if (!eventTarget?.addEventListener) {
      return undefined;
    }

    const handler = (event: Event): void => {
      savedListener.current(event as EventMap[K]);
    };

    eventTarget.addEventListener(eventName, handler, options);

    return () => {
      eventTarget.removeEventListener(eventName, handler, options);
    };
  }, [eventName, target, options]);
}

