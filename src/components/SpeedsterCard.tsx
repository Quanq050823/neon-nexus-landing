import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Gauge, Star } from 'lucide-react';
import speedsterAvatar from '@/assets/speedster-avatar.jpg';

const SpeedsterCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Rapid jitter effect
      gsap.to(card, {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        duration: 0.05,
      });

      // Speed trails follow mouse
      if (trailsRef.current) {
        const trails = trailsRef.current.querySelectorAll('.trail');
        trails.forEach((trail, index) => {
          gsap.to(trail, {
            x: x - rect.width / 2 + (Math.random() - 0.5) * 100,
            y: y - rect.height / 2 + (Math.random() - 0.5) * 100,
            duration: 0.1 + index * 0.05,
          });
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);

      // Rapid vibration
      gsap.to(card, {
        scale: 1.05,
        duration: 0.1,
        ease: 'power4.out',
      });

      // Blur effect on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          filter: 'blur(2px)',
          scale: 1.15,
          duration: 0.2,
        });
      }

      // Animate speed trails
      if (trailsRef.current) {
        const trails = trailsRef.current.querySelectorAll('.trail');
        trails.forEach((trail, index) => {
          gsap.fromTo(
            trail,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 0.8,
              duration: 0.3,
              delay: index * 0.02,
              ease: 'power2.out',
            }
          );
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          filter: 'blur(0px)',
          scale: 1,
          duration: 0.3,
        });
      }

      if (trailsRef.current) {
        const trails = trailsRef.current.querySelectorAll('.trail');
        gsap.to(trails, {
          scaleX: 0,
          opacity: 0,
          duration: 0.2,
        });
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
  }, []);

  const stats = [
    { icon: Zap, label: 'Speed', value: 'Mach 5', color: 'cyber' },
    { icon: Gauge, label: 'Agility', value: '10/10', color: 'primary' },
    { icon: Star, label: 'Rank', value: 'A+', color: 'accent' },
  ];

  return (
    <div className="flex justify-center items-center py-20">
      <div ref={cardRef} className="relative">
        <Card className="relative w-[400px] bg-gradient-to-br from-yellow-950/60 via-card/90 to-cyan-950/60 backdrop-blur-xl border-2 border-cyber/50 overflow-hidden shadow-[0_0_60px_rgba(0,255,255,0.3)]">
          {/* Speed trails */}
          <div ref={trailsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="trail absolute h-1 bg-gradient-to-r from-transparent via-cyber to-transparent opacity-0"
                style={{
                  left: '50%',
                  top: `${10 + i * 6}%`,
                  width: '200px',
                  transformOrigin: 'left center',
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
                  backgroundImage: `url(${speedsterAvatar})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Lightning effect */}
              <div
                className={`absolute inset-0 transition-opacity duration-100 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, hsl(var(--cyber)) 50%, transparent 100%)',
                  animation: isHovered ? 'lightning 0.15s infinite' : 'none',
                }}
              />

              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold shadow-[0_0_30px_rgba(0,255,255,0.6)] animate-glow-pulse border-0">
                  VELOCITY MAX
                </Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-4xl font-black mb-2 glow-cyber">LIGHTNING STRIKE</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Speedster Class • Quantum Runner
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-cyber/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-cyber group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-cyber">{stat.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="px-6 pb-6">
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-cyber transition-all duration-300 ${
                    isHovered ? 'w-full' : 'w-[92%]'
                  }`}
                  style={{
                    boxShadow: isHovered ? '0 0 20px hsl(var(--cyber))' : 'none',
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Velocity: {isHovered ? '100%' : '92%'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes lightning {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SpeedsterCard;
