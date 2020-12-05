import { useEffect } from 'react';

const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.target && !e.target.contains(ref.current)) return;
      handler();
    };

    window.addEventListener('mousedown', listener);
    window.addEventListener('touchstart', listener);

    return () => {
      window.removeEventListener('mousedown', listener);
      window.removeEventListener('touchstart', listener);
    };
  });
};

export default useOutsideClick;
