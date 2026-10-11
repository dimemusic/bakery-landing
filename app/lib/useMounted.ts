import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** false on the server and during hydration, true afterwards. Lets client-only data (the stored cart) avoid a flash of wrong content. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
