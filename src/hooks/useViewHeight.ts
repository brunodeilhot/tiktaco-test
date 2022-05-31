import { useEffect, useState } from "react";

const useViewHeight = (
  ref?: React.RefObject<HTMLDivElement>
): { viewHeight: number } => {
  const [viewHeight, setViewHeight] = useState<number>(
    ref ? window.innerHeight - (window.innerHeight * 0.1) : window.innerHeight
  );
  const [debouncedState, setDebounced] = useState<boolean>(false);

  const handleResize = () => {
    !ref && setViewHeight(window.innerHeight);
    ref && ref.current && setViewHeight(ref.current.clientHeight);
    setDebounced(false);
  };

  const handleDebounce = () => {
    if (debouncedState === false) {
      setDebounced(true);
      setTimeout(handleResize, 200);
    }
  };

  useEffect(() => {
    handleResize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useEffect(() => {
    window.addEventListener("resize", handleDebounce);

    return () => {
      window.removeEventListener("resize", handleDebounce);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { viewHeight };
};

export default useViewHeight;
