import { useEffect, useState } from "react";

const useLoading = (recipesLoaded: number): boolean => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (recipesLoaded === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [recipesLoaded]);

  return isLoading;
};

export default useLoading;
