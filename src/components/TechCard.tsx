import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Cpu, Binary, Shield } from 'lucide-react';
import techAvatar from '@/assets/tech-avatar.jpg';

const TechCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Digital glitch effect
      if (isHovered && Math.random() > 0.9) {
        gsap.to(card, {
          x: (Math.random() - 0.5) * 8,
          duration: 0.05,
          ease: 'steps(2)',
        });
      }

      // Scanline follows cursor
      if (scanlineRef.current) {
        gsap.to(scanlineRef.current, {
          y: y - 50,
          duration: 0.1,
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);

      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Holographic scan effect
      if (scanlineRef.current) {
        gsap.fromTo(
          scanlineRef.current,
          { y: 0, opacity: 0 },
          {
            y: 500,
            opacity: 1,
            duration: 1.5,
            ease: 'linear',
            repeat: -1,
          }
        );
      }

      // RGB split effect on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.3,
        });
      }

      // Glitch effect
      if (glitchRef.current) {
        const glitchLoop = () => {
          gsap.to(glitchRef.current, {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            scaleX: 0.95 + Math.random() * 0.1,
            opacity: 0.5 + Math.random() * 0.5,
            duration: 0.1,
            onComplete: () => {
              if (isHovered) glitchLoop();
            },
          });
        };
        glitchLoop();
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      gsap.to(card, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.3,
        });
      }

      if (scanlineRef.current) {
        gsap.killTweensOf(scanlineRef.current);
        gsap.to(scanlineRef.current, { opacity: 0, duration: 0.2 });
      }

      if (glitchRef.current) {
        gsap.killTweensOf(glitchRef.current);
        gsap.to(glitchRef.current, { x: 0, y: 0, scaleX: 1, opacity: 0, duration: 0.2 });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  const stats = [
    { icon: Cpu, label: 'Processing', value: '2.5 PHz', color: 'primary' },
    { icon: Binary, label: 'Systems', value: '99.9%', color: 'cyber' },
    { icon: Shield, label: 'Security', value: 'Max', color: 'accent' },
  ];

  return (
    <div className="flex justify-center items-center py-20">
      <div ref={cardRef} className="relative">
        <Card className="relative w-[400px] bg-gradient-to-br from-purple-950/70 via-card/90 to-pink-950/70 backdrop-blur-xl border-2 border-purple-500/50 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.4)]">
          {/* Scanline effect */}
          <div
            ref={scanlineRef}
            className="absolute left-0 right-0 h-24 pointer-events-none opacity-0 z-20"
            style={{
              background: 'linear-gradient(180deg, transparent, hsl(var(--primary)) 50%, transparent)',
              boxShadow: '0 0 30px hsl(var(--primary))',
            }}
          />

          {/* Glitch layer */}
          <div
            ref={glitchRef}
            className="absolute inset-0 pointer-events-none opacity-0 z-10"
            style={{
              background: `url(${techAvatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'screen',
            }}
          />

          {/* Digital grid overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isHovered ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage:
                'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <CardContent className="p-0 relative z-10">
            <div className="relative h-[500px] overflow-hidden">
              {!imageLoaded && (
                <Skeleton className="absolute inset-0" />
              )}
              <div
                ref={imageRef}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `url(${techAvatar})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              <img 
                src={techAvatar} 
                alt="" 
                className="hidden" 
                onLoad={() => setImageLoaded(true)}
              />

              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-[0_0_25px_rgba(168,85,247,0.6)] animate-pulse border-0">
                  ONLINE
                </Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-4xl font-black mb-2 glow-primary">CYBER NEXUS</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Tech Class • Neural Interface
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-primary">{stat.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="px-6 pb-6">
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-primary transition-all duration-500 ${
                    isHovered ? 'w-full' : 'w-[88%]'
                  }`}
                  style={{
                    boxShadow: isHovered ? '0 0 20px hsl(var(--primary))' : 'none',
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                System Status: {isHovered ? '100%' : '88%'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechCard;
