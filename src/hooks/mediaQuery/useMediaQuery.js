// Code inspired by: https://usehooks.com/useMedia/
// Chrome/Safari event handling: https://stackoverflow.com/a/60000747
import { useEffect, useState } from 'react';

/**
 * @param {(string|string[])} query
 * @example
 * const isSmall = useQuery("(max-width: 480px)");
 * const [isSmall, isMedium] = useQuery(["(max-width: 480px)", "(max-width: 768px)"]);
 */
export default queries => {
  let isArray = true;
  if (typeof queries === 'string') {
    queries = [queries];
    isArray = false;
  }

  const mediaQueryLists = queries.map(query => window.matchMedia(query));

  const [matches, setMatches] = useState(mediaQueryLists.map(mql => mql.matches));

  useEffect(() => {
    const handler = () => setMatches(mediaQueryLists.map(mql => mql.matches));

    try {
      // Chrome & Firefox
      mediaQueryLists.forEach(mql => mql.addEventListener('change', handler));
    } catch (_) {
      // Safari
      mediaQueryLists.forEach(mql => mql.addListener(handler));
    }

    return () =>
      mediaQueryLists.forEach(mql => {
        try {
          // Chrome & Firefox
          mql.removeEventListener('change', handler);
        } catch (_) {
          // Safari
          mql.removeListener(handler);
        }
      });
  });

  return isArray ? matches : matches[0];
};
