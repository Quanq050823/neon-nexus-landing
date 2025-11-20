import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Award } from 'lucide-react';
import heroAvatar from '@/assets/hero-avatar.jpg';

const HeroCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Move glow effect
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.3,
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      
      gsap.to(card, {
        scale: 1.05,
        z: 50,
        duration: 0.4,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Animate particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
          gsap.fromTo(
            particle,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.05,
              ease: 'back.out(2)',
            }
          );
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Hide particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        gsap.to(particles, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
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
    { icon: Zap, label: 'Power', value: '9.8/10', color: 'primary' },
    { icon: Shield, label: 'Defense', value: '9.5/10', color: 'accent' },
    { icon: Award, label: 'Rank', value: 'S-Class', color: 'cyber' },
  ];

  return (
    <div className="flex justify-center items-center py-20">
      <div 
        ref={cardRef}
        className="relative"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <Card className="relative w-[400px] bg-card/80 backdrop-blur-xl border-2 border-primary/30 overflow-hidden">
          {/* Hover glow effect */}
          <div
            ref={glowRef}
            className={`absolute w-[300px] h-[300px] rounded-full blur-3xl transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-50' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Particles container */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle absolute w-1 h-1 bg-primary rounded-full opacity-0"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: '0 0 10px hsl(var(--primary))',
                }}
              />
            ))}
          </div>

          <CardContent className="p-0 relative z-10">
            {/* Hero Image */}
            <div className="relative h-[500px] overflow-hidden">
              <div
                ref={imageRef}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroAvatar})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Animated border */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--primary)) 50%, transparent)',
                  animation: isHovered ? 'border-flow 2s linear infinite' : 'none',
                }}
              />

              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_hsl(var(--primary))] animate-glow-pulse">
                  ACTIVE
                </Badge>
              </div>

              {/* Hero title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-4xl font-black mb-2 glow-primary">
                  APEX GUARDIAN
                </h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Elite Class • Subject Zero
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="p-6 space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        className={`w-5 h-5 text-${stat.color} group-hover:scale-110 transition-transform`}
                        strokeWidth={2}
                      />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className={`text-lg font-bold text-${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Energy bar */}
            <div className="px-6 pb-6">
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-cyber transition-all duration-1000 ${
                    isHovered ? 'w-full' : 'w-[85%]'
                  }`}
                  style={{
                    boxShadow: isHovered ? '0 0 20px hsl(var(--primary))' : 'none',
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Energy Level: {isHovered ? '100%' : '85%'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: '0 0 60px hsl(var(--primary)), 0 0 100px hsl(var(--accent))',
            transform: 'scale(1.02)',
          }}
        />
      </div>

      <style>{`
        @keyframes border-flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCard;
