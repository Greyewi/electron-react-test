import { useEffect, useRef } from 'react';

export const useFocus = (dep: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [dep]);

  return inputRef;
};
