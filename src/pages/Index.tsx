import { useEffect, useRef, useState } from "react";
import spaceshipAirlock from "@/assets/spaceship-airlock.jpg";
import spaceshipCorridor from "@/assets/spaceship-corridor.jpg";
import spaceshipBridge from "@/assets/spaceship-bridge.jpg";
import spaceshipEngine from "@/assets/spaceship-engine.jpg";

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  depth: string;
}

const sections: Section[] = [
  {
    id: "airlock",
    title: "AIRLOCK ENTRY",
    subtitle: "DECK 01 — EXTERIOR ACCESS",
    description: "You float through the void toward a massive vessel. The airlock hums as it pressurizes, pulling you inside.",
    image: spaceshipAirlock,
    depth: "DEPTH: SURFACE",
  },
  {
    id: "corridor",
    title: "MAIN CORRIDOR",
    subtitle: "DECK 03 — TRANSIT ZONE",
    description: "Neon-lit corridors stretch endlessly ahead. The hum of the ship's systems echoes through metallic walls.",
    image: spaceshipCorridor,
    depth: "DEPTH: -30M",
  },
  {
    id: "bridge",
    title: "COMMAND BRIDGE",
    subtitle: "DECK 07 — RESTRICTED ACCESS",
    description: "Holographic displays flicker with star maps and system diagnostics. The heart of navigation and control.",
    image: spaceshipBridge,
    depth: "DEPTH: -120M",
  },
  {
    id: "engine",
    title: "REACTOR CORE",
    subtitle: "DECK 12 — MAXIMUM CLEARANCE",
    description: "The pulsating energy core illuminates everything in violet light. Raw power contained within magnetic fields.",
    image: spaceshipEngine,
    depth: "DEPTH: -300M",
  },
];

const SpaceshipNav = ({ activeIndex }: { activeIndex: number }) => (
  <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center">
    {sections.map((s, i) => (
      <button
        key={s.id}
        onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
        className={`nav-indicator ${i === activeIndex ? "active" : ""}`}
        aria-label={s.title}
      />
    ))}
  </nav>
);

const SpaceshipSection = ({ section, index }: { section: Section; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={section.id} ref={ref} className="spaceship-section">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
        style={{
          backgroundImage: `url(${section.image})`,
          transform: visible ? "scale(1)" : "scale(1.1)",
        }}
      />

      {/* Heavy overlay to unify colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            hsl(var(--background)) 0%,
            hsl(var(--background) / 0.85) 8%,
            hsl(var(--background) / 0.55) 30%,
            hsl(var(--background) / 0.45) 50%,
            hsl(var(--background) / 0.55) 70%,
            hsl(var(--background) / 0.85) 92%,
            hsl(var(--background)) 100%
          )`,
        }}
      />

      {/* Purple/blue tint overlay for cohesion */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center,
            hsl(270 60% 20% / 0.3) 0%,
            hsl(240 40% 10% / 0.5) 100%
          )`,
        }}
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        {/* Depth indicator */}
        <div className="mb-8">
          <span className="font-display text-xs tracking-[0.3em] text-accent animate-pulse-glow">
            {section.depth}
          </span>
        </div>

        {/* Subtitle */}
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase">
          {section.subtitle}
        </p>

        {/* Title */}
        <h2
          className="font-display text-5xl md:text-7xl font-bold mb-6 glow-text-purple"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {section.title}
        </h2>

        {/* Decorative line */}
        <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-6" />

        {/* Description */}
        <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          {section.description}
        </p>

        {/* Scroll indicator on first section */}
        {index === 0 && (
          <div className="mt-16 animate-float">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="font-display text-xs tracking-[0.2em]">SCROLL TO ENTER</span>
              <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-accent">
                <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="2" />
                <circle cx="10" cy="10" r="3" fill="currentColor" className="animate-bounce" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveIndex(i);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <SpaceshipNav activeIndex={activeIndex} />
      {sections.map((section, i) => (
        <SpaceshipSection key={section.id} section={section} index={i} />
      ))}
    </div>
  );
};

export default Index;
