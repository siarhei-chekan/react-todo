import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoading, cb) => {
  const observer = useRef();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    
    if (observer.current) {
      observer.current.disconnect();
    }

    function callback(entries) {
      if (entries[0].isIntersecting && canLoad) {
        cb();
      }
    }
    
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(ref.current);    
  }, [isLoading]);
};