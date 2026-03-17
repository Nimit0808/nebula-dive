import { useState, useEffect } from "react";
import spaceshipImg from "@/assets/spaceship-splash.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "fly" | "done">("enter");

  useEffect(() => {
    // Ship enters from bottom
    const t1 = setTimeout(() => setPhase("fly"), 1500);
    // Ship flies up and screen fades
    const t2 = setTimeout(() => setPhase("done"), 3200);
    // Remove splash
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, hsl(260 40% 12%), hsl(260 30% 4%))",
        opacity: phase === "done" ? 0 : 1,
        transition: "opacity 0.8s ease-in",
      }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: `hsl(${200 + Math.random() * 80} 80% ${70 + Math.random() * 30}%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Star streaks when flying */}
      {phase === "fly" && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`streak-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-accent to-transparent"
              style={{
                height: `${100 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `-200px`,
                opacity: 0.6,
                animation: `star-streak 0.6s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Spaceship */}
      <div
        className="relative z-10"
        style={{
          transform:
            phase === "enter"
              ? "translateY(120vh)"
              : phase === "fly"
              ? "translateY(-120vh)"
              : "translateY(-120vh)",
          transition:
            phase === "enter"
              ? "none"
              : phase === "fly"
              ? "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          animation: phase === "enter" ? "ship-enter 1.5s ease-out forwards" : undefined,
        }}
      >
        <img
          src={spaceshipImg}
          alt="Spaceship"
          className="w-40 md:w-56 drop-shadow-[0_0_30px_hsl(270_70%_60%/0.6)]"
        />
        {/* Engine flames */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%] flex gap-2">
          <div
            className="w-4 rounded-full blur-sm"
            style={{
              height: phase === "fly" ? 80 : 30,
              background: "linear-gradient(to bottom, hsl(30 100% 60%), hsl(15 100% 50%), hsl(270 80% 50%))",
              transition: "height 0.3s",
              animation: "flame-flicker 0.15s ease-in-out infinite alternate",
            }}
          />
          <div
            className="w-5 rounded-full blur-sm"
            style={{
              height: phase === "fly" ? 100 : 40,
              background: "linear-gradient(to bottom, hsl(45 100% 70%), hsl(20 100% 55%), hsl(280 80% 45%))",
              transition: "height 0.3s",
              animation: "flame-flicker 0.12s ease-in-out infinite alternate",
            }}
          />
          <div
            className="w-4 rounded-full blur-sm"
            style={{
              height: phase === "fly" ? 80 : 30,
              background: "linear-gradient(to bottom, hsl(30 100% 60%), hsl(15 100% 50%), hsl(270 80% 50%))",
              transition: "height 0.3s",
              animation: "flame-flicker 0.18s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>

      {/* Title text */}
      <div
        className="absolute bottom-20 left-0 right-0 text-center z-10"
        style={{
          opacity: phase === "enter" ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      >
        <p className="font-display text-xs tracking-[0.3em] text-accent animate-pulse-glow">
          INITIATING LAUNCH SEQUENCE
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
