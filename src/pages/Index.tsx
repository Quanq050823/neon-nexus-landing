import Hero from '@/components/Hero';
import HeroCard from '@/components/HeroCard';
import SpeedsterCard from '@/components/SpeedsterCard';
import TechCard from '@/components/TechCard';
import MysticCard from '@/components/MysticCard';
import TitanCard from '@/components/TitanCard';
import Powers from '@/components/Powers';
import Origin from '@/components/Origin';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <main className="relative">
      <Hero />
      <section className="py-20">
        <h2 className="text-5xl font-black text-center mb-4 glow-primary">
          ELITE HEROES
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Meet the legendary heroes who protect our world with their extraordinary abilities
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
          <HeroCard />
          <SpeedsterCard />
          <TechCard />
          <MysticCard />
          <TitanCard />
        </div>
      </section>
      <Powers />
      <Origin />
      <CallToAction />
    </main>
  );
};

export default Index;
