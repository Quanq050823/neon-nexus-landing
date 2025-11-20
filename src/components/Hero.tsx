import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    }, '-=0.6')
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.4');

    // Parallax mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Apply parallax effect
    gsap.to(imageRef.current, {
      x: mousePosition.x * 30,
      y: mousePosition.y * 30,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [mousePosition]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      {/* Neon grid overlay */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-6 glow-primary"
        >
          <span className="gradient-text">APEX</span> HERO
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold"
        >
          The next evolution of power. Engineered for the future, built to protect humanity.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.7)] transition-all duration-300"
          >
            Discover Powers
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold shadow-[0_0_20px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_40px_hsl(var(--accent)/0.5)] transition-all duration-300"
          >
            Watch Origin
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-glow-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
