import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, timeout = 500): Readonly<T> {
  const [state, setState] = useState(value);

  useEffect(() => {
    const tick = setTimeout(() => setState(value), timeout);

    return () => clearTimeout(tick);
  }, [value, timeout]);

  if (timeout <= 0) return value;

  return state;
}
