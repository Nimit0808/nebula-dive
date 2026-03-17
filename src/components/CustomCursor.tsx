import { useEffect, useState } from "react";
import astronautImg from "@/assets/astronaut-cursor.png";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailing, setTrailing] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [prevX, setPrevX] = useState(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setDirection((prev) => {
        const newDir = e.clientX > prevX ? 1 : e.clientX < prevX ? -1 : prev;
        setPrevX(e.clientX);
        return newDir;
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [prevX]);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      setTrailing((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.08,
        y: prev.y + (pos.y - prev.y) * 0.08,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  // Calculate tilt based on movement
  const dx = pos.x - trailing.x;
  const dy = pos.y - trailing.y;
  const tilt = Math.min(Math.max(dy * -0.8, -20), 20);
  const lean = Math.min(Math.max(dx * 0.5, -15), 15);

  return (
    <>
      {/* Small glow dot at actual cursor position */}
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-screen"
        style={{
          left: pos.x,
          top: pos.y,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "hsl(185 100% 60%)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 6px hsl(185 100% 60% / 0.8)",
        }}
      />
      {/* Astronaut following cursor */}
      <div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: trailing.x,
          top: trailing.y,
          transform: `translate(-50%, -50%) scaleX(${direction}) rotate(${tilt + lean}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <img
          src={astronautImg}
          alt=""
          className="w-12 h-12 drop-shadow-[0_0_12px_hsl(270_70%_60%/0.6)]"
          draggable={false}
        />
      </div>
    </>
  );
};

export default CustomCursor;
