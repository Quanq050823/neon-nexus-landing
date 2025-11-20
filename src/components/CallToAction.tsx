import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { 
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-cyber/20 animate-pulse" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.3) 0%, transparent 50%)
          `,
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center bg-card/30 backdrop-blur-md border-2 border-primary/50 rounded-3xl p-12 md:p-16 shadow-[0_0_50px_hsl(var(--primary)/0.3)]"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            JOIN THE <span className="gradient-text">EVOLUTION</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Be part of the next generation. Witness the future of heroism. Experience power beyond imagination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.8)] transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold shadow-[0_0_30px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_50px_hsl(var(--accent)/0.6)] transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-border/50">
            <div>
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">500K+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Lives Saved</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">24/7</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Protection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
