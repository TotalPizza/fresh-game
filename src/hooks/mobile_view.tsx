import { useState, useEffect } from 'react';

export function UseMobileView() {
    // make sure your function is being called client side only
    if (typeof window !== 'undefined') {
        const ratio = window.innerWidth / window.innerHeight
        if(window.innerWidth <= 650){
          return true
        }
        if(window.innerHeight <= 667){
          return false
        }
        if(ratio <= 0.90){
          return true
        }
        return false
    } 
    return false
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(UseMobileView());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(UseMobileView());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
