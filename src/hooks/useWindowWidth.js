import { useEffect, useState } from 'react';

const useWindowWidth = (mediaQueryString) => {
  const isWindowSizeReached = window.matchMedia(mediaQueryString).matches;
  const [isMatchedWidth, setMatchingWidth] = useState(isWindowSizeReached);

  useEffect(() => {
    const checkWindowSize = () => {
      const isWidthMatched = window.matchMedia(mediaQueryString).matches;
      setMatchingWidth(isWidthMatched);
    };

    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [mediaQueryString]);

  return [isMatchedWidth];
};

export default useWindowWidth;
