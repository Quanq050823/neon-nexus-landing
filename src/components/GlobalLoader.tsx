import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface GlobalLoaderProps {
  onComplete: () => void;
}

const GlobalLoader = ({ onComplete }: GlobalLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    gsap.to({ value: 0 }, {
      value: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].value));
      },
      onComplete: () => {
        setTimeout(() => {
          gsap.to('.loader-container', {
            opacity: 0,
            duration: 0.5,
            onComplete,
          });
        }, 200);
      }
    });
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-6xl font-black mb-8 glow-primary">
          <span className="gradient-text">APEX</span> HERO
        </h2>
        
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-muted-foreground font-semibold">{progress}%</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
