import { useState, useEffect } from 'react';

export const useImagePreloader = (imageSrc: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      // Still set as loaded even on error to prevent infinite loading
      setIsLoaded(true);
    };
    
    img.src = imageSrc;
    
    // If image is already cached, it loads immediately
    if (img.complete) {
      setIsLoaded(true);
    }
  }, [imageSrc]);

  return isLoaded;
};
