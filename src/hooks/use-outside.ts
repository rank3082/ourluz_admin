import { useRef, useEffect } from "react";

export function useOutsideAlerter(functionAction: <T>(args?: T) => unknown) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        functionAction();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [ref];
}
