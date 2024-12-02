import { useState, useEffect } from "react";
function useDebounce(value, delay) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [value]);
  return debounce;
}

export default useDebounce