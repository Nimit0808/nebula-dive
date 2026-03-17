const imageModules = import.meta.glob<{ default: string }>(
  "/src/assets/members/*.png",
  { eager: true }
);

const images = Object.values(imageModules).map((m) => m.default);
const allImages = [...images, ...images];

const MemberCarousel = () => {
  return (
    <div className="w-full overflow-hidden py-12">
      <div className="text-center mb-10">
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground mb-3 uppercase">
          CREW MANIFEST — IEEE DIVISION
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold glow-text-purple text-foreground">
          OUR CREW
        </h2>
        <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mt-4" />
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
        />

        <div className="flex animate-scroll-left gap-8">
          {allImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-border glow-border-purple"
            >
              <img
                src={src}
                alt={`Crew member ${(i % images.length) + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCarousel;
