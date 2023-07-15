import { useWindowSize } from "./useWindowSize.js";

export function useIsMobile() {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  return isMobile;
}
