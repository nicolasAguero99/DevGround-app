import { useEffect } from "react";

export function useCleanupOnUnmount(cleanup: () => void) {
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
}
