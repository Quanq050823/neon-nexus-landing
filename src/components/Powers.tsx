import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Eye, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const powers = [
  {
    icon: Zap,
    title: 'Quantum Speed',
    description: 'Move at velocities that break the laws of physics. Harness quantum tunneling to phase through matter.',
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Energy Shield',
    description: 'Project impenetrable force fields powered by pure electromagnetic energy. Deflect any attack.',
    color: 'accent',
  },
  {
    icon: Eye,
    title: 'Enhanced Vision',
    description: 'See across the full electromagnetic spectrum. Track targets through walls with thermal imaging.',
    color: 'cyber',
  },
  {
    icon: Cpu,
    title: 'Neural Link',
    description: 'Interface directly with any digital system. Process information at superhuman speeds.',
    color: 'secondary',
  },
];

const Powers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  const getGlowClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'glow-primary';
      case 'accent':
        return 'glow-accent';
      case 'cyber':
        return 'glow-cyber';
      default:
        return '';
    }
  };

  return (
    <section ref={sectionRef} className="py-32 px-6 relative">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="gradient-text">SUPERHUMAN</span> ABILITIES
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Next-generation powers engineered through advanced biotechnology and quantum physics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {powers.map((power, index) => {
            const Icon = power.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 group h-full">
                  <CardContent className="p-8">
                    <div className={`mb-6 ${getGlowClass(power.color)}`}>
                      <Icon 
                        className={`w-16 h-16 text-${power.color} group-hover:scale-110 transition-transform duration-300`} 
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-foreground">
                      {power.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {power.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Powers;
