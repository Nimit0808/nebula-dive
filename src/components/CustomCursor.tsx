import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailing, setTrailing] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      setTrailing((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  return (
    <>
      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-screen"
        style={{
          left: pos.x,
          top: pos.y,
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          borderRadius: "50%",
          background: "hsl(185 100% 60%)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.15s, height 0.15s",
          boxShadow: "0 0 8px hsl(185 100% 60% / 0.8), 0 0 20px hsl(185 100% 60% / 0.4)",
        }}
      />
      {/* Trailing ring */}
      <div
        className="pointer-events-none fixed z-[9998] mix-blend-screen"
        style={{
          left: trailing.x,
          top: trailing.y,
          width: hovering ? 50 : clicking ? 28 : 36,
          height: hovering ? 50 : clicking ? 28 : 36,
          borderRadius: "50%",
          border: `1.5px solid hsl(270 70% 65% / ${hovering ? 0.8 : 0.5})`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease-out, height 0.3s ease-out, border 0.3s",
          boxShadow: hovering
            ? "0 0 15px hsl(270 70% 60% / 0.4), inset 0 0 15px hsl(270 70% 60% / 0.1)"
            : "0 0 8px hsl(270 70% 60% / 0.2)",
        }}
      />
    </>
  );
};

export default CustomCursor;
