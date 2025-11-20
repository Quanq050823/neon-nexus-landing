import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Origin = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !timelineRef.current) return;

    // Content fade-in
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
        },
      }
    );

    // Timeline items animation
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          delay: index * 0.2,
        }
      );
    });
  }, []);

  const timeline = [
    { year: '2025', event: 'The Incident', description: 'A quantum reactor accident creates the first meta-human.' },
    { year: '2027', event: 'Project APEX', description: 'Government initiates the enhanced human program.' },
    { year: '2030', event: 'First Hero', description: 'Subject Zero emerges as the prototype defender.' },
    { year: '2033', event: 'Present Day', description: 'The APEX Hero protects cities worldwide.' },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6 relative bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              THE <span className="gradient-text">ORIGIN</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Born from a catastrophic quantum reactor incident, the APEX program was humanity's answer to an uncertain future.
              </p>
              <p>
                Through advanced biotechnology and experimental quantum engineering, ordinary humans were transformed into extraordinary protectors.
              </p>
              <p className="text-foreground font-semibold">
                Now, the APEX Hero stands as the pinnacle of human evolution—a guardian for the next generation.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-primary to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-primary font-bold text-2xl mb-2 glow-primary">
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {item.event}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origin;
