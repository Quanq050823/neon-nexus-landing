import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Mountain, Trophy } from 'lucide-react';
import titanAvatar from '@/assets/titan-avatar.jpg';

const TitanCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shockwavesRef = useRef<HTMLDivElement>(null);
  const cracksRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Heavy shaking effect
      if (isHovered) {
        gsap.to(card, {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
          rotation: (Math.random() - 0.5) * 2,
          duration: 0.1,
          ease: 'steps(3)',
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);

      // Ground slam impact
      gsap.fromTo(
        card,
        { y: -30, scale: 0.9 },
        {
          y: 0,
          scale: 1.05,
          duration: 0.4,
          ease: 'bounce.out',
        }
      );

      // Image impact zoom
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.2,
          duration: 0.4,
          ease: 'power4.out',
        });
      }

      // Shockwave rings
      if (shockwavesRef.current) {
        const waves = shockwavesRef.current.querySelectorAll('.shockwave');
        waves.forEach((wave, index) => {
          gsap.fromTo(
            wave,
            { scale: 0, opacity: 1 },
            {
              scale: 2.5,
              opacity: 0,
              duration: 1.5,
              delay: index * 0.15,
              ease: 'power2.out',
              repeat: -1,
              repeatDelay: 1,
            }
          );
        });
      }

      // Ground cracks
      if (cracksRef.current) {
        const cracks = cracksRef.current.querySelectorAll('.crack');
        cracks.forEach((crack, index) => {
          gsap.fromTo(
            crack,
            { scaleY: 0, opacity: 0 },
            {
              scaleY: 1,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.08,
              ease: 'power3.out',
            }
          );
        });
      }

      // Continuous heavy breathing effect
      const breathe = () => {
        gsap.to(card, {
          scale: 1.06,
          duration: 1.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            if (isHovered) breathe();
          },
        });
      };
      breathe();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.5,
        });
      }

      if (shockwavesRef.current) {
        const waves = shockwavesRef.current.querySelectorAll('.shockwave');
        gsap.killTweensOf(waves);
        gsap.to(waves, { scale: 0, opacity: 0, duration: 0.3 });
      }

      if (cracksRef.current) {
        const cracks = cracksRef.current.querySelectorAll('.crack');
        gsap.to(cracks, { scaleY: 0, opacity: 0, duration: 0.3 });
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
    { icon: Flame, label: 'Power', value: 'MAX', color: 'destructive' },
    { icon: Mountain, label: 'Defense', value: '10/10', color: 'secondary' },
    { icon: Trophy, label: 'Rank', value: 'Titan', color: 'cyber' },
  ];

  return (
    <div className="flex justify-center items-center py-20">
      <div ref={cardRef} className="relative">
        <Card className="relative w-[400px] bg-gradient-to-br from-orange-950/70 via-card/90 to-red-950/70 backdrop-blur-xl border-2 border-orange-600/50 overflow-hidden shadow-[0_0_55px_rgba(234,88,12,0.4)]">
          {/* Shockwave rings */}
          <div ref={shockwavesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="shockwave absolute left-1/2 top-1/2 w-4 h-4 rounded-full border-4 border-destructive opacity-0"
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>

          {/* Ground cracks */}
          <div ref={cracksRef} className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="crack absolute bottom-0 w-1 bg-gradient-to-t from-destructive to-transparent opacity-0"
                style={{
                  left: `${10 + i * 12}%`,
                  height: `${50 + Math.random() * 100}px`,
                  transformOrigin: 'bottom',
                  boxShadow: '0 0 10px hsl(var(--destructive))',
                }}
              />
            ))}
          </div>

          <CardContent className="p-0 relative z-10">
            <div className="relative h-[500px] overflow-hidden">
              <div
                ref={imageRef}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${titanAvatar})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Heat distortion effect */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-50' : 'opacity-0'
                }`}
                style={{
                  background: `radial-gradient(ellipse at bottom, hsl(var(--destructive)), transparent 60%)`,
                  filter: 'blur(20px)',
                }}
              />

              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold shadow-[0_0_30px_rgba(234,88,12,0.7)] border-0">
                  UNSTOPPABLE
                </Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-4xl font-black mb-2" style={{ color: 'hsl(var(--destructive))', textShadow: '0 0 30px hsl(var(--destructive))' }}>
                  TITAN FORCE
                </h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Strength Class • Indestructible
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-destructive/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-destructive">{stat.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="px-6 pb-6">
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-destructive transition-all duration-700 ${
                    isHovered ? 'w-full' : 'w-[95%]'
                  }`}
                  style={{
                    boxShadow: isHovered ? '0 0 20px hsl(var(--destructive))' : 'none',
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Strength: {isHovered ? '100%' : '95%'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Impact crater effect */}
        <div
          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-8 rounded-full transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse, hsl(var(--destructive) / 0.3), transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      </div>
    </div>
  );
};

export default TitanCard;
