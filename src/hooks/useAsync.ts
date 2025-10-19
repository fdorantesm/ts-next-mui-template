'use client';

import { useCallback, useEffect, useMemo, useReducer } from "react";

import { useIsMounted } from "./useIsMounted";

type AsyncStatus = "idle" | "pending" | "success" | "error";

type AsyncState<T> = {
  status: AsyncStatus;
  data: T | null;
  error: unknown;
};

const initialState: AsyncState<unknown> = {
  status: "idle",
  data: null,
  error: null,
};

type AsyncAction<T> =
  | { type: "pending" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: unknown }
  | { type: "reset" };

function asyncReducer<T>(state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> {
  switch (action.type) {
    case "pending":
      return { status: "pending", data: state.data, error: null };
    case "success":
      return { status: "success", data: action.payload, error: null };
    case "error":
      return { status: "error", data: state.data, error: action.payload };
    case "reset":
      return { status: "idle", data: null, error: null };
    default:
      return state;
  }
}

type UseAsyncOptions<T, Args extends unknown[]> = {
  /** Optional initial data to seed the async state. */
  initialData?: T;
  /** Optional callback invoked when the promise resolves. */
  onSuccess?: (value: T) => void;
  /** Optional callback invoked when the promise rejects. */
  onError?: (error: unknown) => void;
  /** Immediately execute when the hook mounts; provide arguments for the async function. */
  immediateArgs?: Args;
};

type UseAsyncReturn<T, Args extends unknown[]> = AsyncState<T> & {
  run: (...args: Args) => Promise<T>;
  reset: () => void;
};

/**
 * Runs async functions with managed loading/success/error state and guards against unmounted updates.
 */
export function useAsync<T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<T>,
  {
    initialData,
    onSuccess,
    onError,
    immediateArgs,
  }: UseAsyncOptions<T, Args> = {},
): UseAsyncReturn<T, Args> {
  const isMounted = useIsMounted();

  const [state, dispatch] = useReducer(
    asyncReducer<T>,
    {
      ...initialState,
      data: (initialData ?? null) as T | null,
    },
  );

  const run = useCallback(
    async (...args: Args) => {
      dispatch({ type: "pending" });
      try {
        const result = await asyncFn(...args);

        if (isMounted()) {
          dispatch({ type: "success", payload: result });
          onSuccess?.(result);
        }

        return result;
      } catch (error) {
        if (isMounted()) {
          dispatch({ type: "error", payload: error });
          onError?.(error);
        }

        throw error;
      }
    },
    [asyncFn, isMounted, onError, onSuccess],
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  useEffect(() => {
    if (immediateArgs) {
      void run(...immediateArgs);
    }
  }, [immediateArgs, run]);

  return useMemo(
    () => ({
      status: state.status,
      data: state.data,
      error: state.error,
      run,
      reset,
    }),
    [state, run, reset],
  );
}
