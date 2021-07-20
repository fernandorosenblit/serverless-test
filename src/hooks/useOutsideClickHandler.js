import { useEffect } from 'react';

const useOutsideClickHandler = (ref, actionHandler) => {
  useEffect(() => {
    const handleClickOutside = ev => {
      if (ref?.current && !ref.current.contains(ev.target)) {
        actionHandler && actionHandler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, actionHandler]);
};

export default useOutsideClickHandler;
