import { useEffect, useRef, useState } from 'react';

export default function useIsOverflow<T extends HTMLParagraphElement>(): [
  React.RefObject<T>,
  boolean
] {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const ref = useRef<T>(null);
  const scrollHeight = ref.current?.scrollHeight;

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const isOverflow = element.scrollHeight > element.clientHeight;
      setIsOverflow(isOverflow);
    }
  }, [scrollHeight]);

  return [ref, isOverflow];
}
