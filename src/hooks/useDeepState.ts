import { useRef, useState } from "react";
import { isEqualValue } from "_/utilities/isEqual";

// state updates (and triggers a re-render) if the contained value if the data has a different value
export const useDeepState = <T = undefined>(
  defaultValue: T,
  maxDepth = Number.POSITIVE_INFINITY
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const deepRef = useRef(defaultValue);
  const [increment, setIncrement] = useState(Number.MIN_SAFE_INTEGER);

  return [
    deepRef.current,
    (setStateAction) => {
      const isASetFn =
        typeof setStateAction === "function" && typeof deepRef.current !== "function";

      const newValue: T = isASetFn
        ? (setStateAction as (prevState: T) => T)(deepRef.current)
        : (setStateAction as T);

      if (!isEqualValue(deepRef.current, newValue, maxDepth)) {
        deepRef.current = newValue;
        setIncrement(increment + 1);
      }
    },
  ];
};
