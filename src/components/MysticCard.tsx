import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Moon, Star } from 'lucide-react';
import mysticAvatar from '@/assets/mystic-avatar.jpg';

const MysticCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const runesRef = useRef<HTMLDivElement>(null);
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

      // Gentle floating rotation
      gsap.to(card, {
        rotateZ: (x - centerX) / 50,
        y: (y - centerY) / 30,
        duration: 0.5,
        ease: 'power1.out',
      });

      // Orbs follow cursor
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
          const delay = index * 0.1;
          gsap.to(orb, {
            x: (x - centerX) * (0.3 + index * 0.1),
            y: (y - centerY) * (0.3 + index * 0.1),
            duration: 0.6 + delay,
            ease: 'power2.out',
          });
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);

      // Float up
      gsap.to(card, {
        y: -20,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Ethereal glow on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.15,
          filter: 'brightness(1.3) saturate(1.5)',
          duration: 0.6,
        });
      }

      // Animate magic orbs
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
          gsap.fromTo(
            orb,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 0.9,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'back.out(3)',
            }
          );

          // Continuous floating
          gsap.to(orb, {
            y: '+=20',
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // Animate runes
      if (runesRef.current) {
        const runes = runesRef.current.querySelectorAll('.rune');
        runes.forEach((rune, index) => {
          gsap.fromTo(
            rune,
            { scale: 0, rotation: 0, opacity: 0 },
            {
              scale: 1,
              rotation: 360,
              opacity: 0.7,
              duration: 1,
              delay: index * 0.15,
              ease: 'back.out(2)',
            }
          );

          // Continuous rotation
          gsap.to(rune, {
            rotation: '+=360',
            duration: 8 + index * 2,
            repeat: -1,
            ease: 'none',
          });
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      gsap.to(card, {
        rotateZ: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          filter: 'brightness(1) saturate(1)',
          duration: 0.6,
        });
      }

      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.orb');
        gsap.killTweensOf(orbs);
        gsap.to(orbs, {
          scale: 0,
          opacity: 0,
          x: 0,
          y: 0,
          duration: 0.4,
        });
      }

      if (runesRef.current) {
        const runes = runesRef.current.querySelectorAll('.rune');
        gsap.killTweensOf(runes);
        gsap.to(runes, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
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
    { icon: Sparkles, label: 'Magic', value: 'Ancient', color: 'accent' },
    { icon: Moon, label: 'Wisdom', value: '9.7/10', color: 'secondary' },
    { icon: Star, label: 'Rank', value: 'Mystic', color: 'accent' },
  ];

  return (
    <div className="flex justify-center items-center py-20">
      <div ref={cardRef} className="relative">
        <Card className="relative w-[400px] bg-gradient-to-br from-indigo-950/70 via-card/90 to-violet-950/70 backdrop-blur-xl border-2 border-violet-500/50 overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.4)]">
          {/* Magic orbs */}
          <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="orb absolute w-12 h-12 rounded-full opacity-0"
                style={{
                  left: `${20 + (i % 4) * 25}%`,
                  top: `${20 + Math.floor(i / 4) * 60}%`,
                  background: `radial-gradient(circle, hsl(var(--accent)), transparent)`,
                  boxShadow: `0 0 30px hsl(var(--accent))`,
                }}
              />
            ))}
          </div>

          {/* Floating runes */}
          <div ref={runesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rune absolute w-8 h-8 opacity-0"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  color: 'hsl(var(--accent))',
                  fontSize: '24px',
                  textShadow: '0 0 20px hsl(var(--accent))',
                }}
              >
                ✦
              </div>
            ))}
          </div>

          <CardContent className="p-0 relative z-10">
            <div className="relative h-[500px] overflow-hidden">
              <div
                ref={imageRef}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${mysticAvatar})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Ethereal pulse */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-40' : 'opacity-0'
                }`}
                style={{
                  background: `radial-gradient(circle at center, hsl(var(--accent)), transparent 70%)`,
                  animation: isHovered ? 'pulse 2s ease-in-out infinite' : 'none',
                }}
              />

              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white font-bold shadow-[0_0_30px_rgba(139,92,246,0.7)] border-0 animate-pulse">
                  CHANNELING
                </Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-4xl font-black mb-2 glow-accent">ARCANE SAGE</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Mystic Class • Spell Weaver
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-accent/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-accent">{stat.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="px-6 pb-6">
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-secondary to-accent transition-all duration-1000 ${
                    isHovered ? 'w-full' : 'w-[90%]'
                  }`}
                  style={{
                    boxShadow: isHovered ? '0 0 20px hsl(var(--accent))' : 'none',
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Mana: {isHovered ? '100%' : '90%'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MysticCard;
