import member1 from "@/assets/members/Screenshot_2026-03-17_at_6.26.55\u0020PM.png";
import member2 from "@/assets/members/Screenshot_2026-03-17_at_6.27.24\u0020PM.png";
import member3 from "@/assets/members/Screenshot_2026-03-17_at_6.28.14\u0020PM.png";
import member4 from "@/assets/members/Screenshot_2026-03-17_at_6.29.02\u0020PM.png";
import member5 from "@/assets/members/Screenshot_2026-03-17_at_6.29.29\u0020PM.png";
import member6 from "@/assets/members/Screenshot_2026-03-17_at_6.29.52\u0020PM.png";
import member7 from "@/assets/members/Screenshot_2026-03-17_at_6.42.46\u0020PM.png";
import member8 from "@/assets/members/Screenshot_2026-03-17_at_6.44.12\u0020PM.png";
import member9 from "@/assets/members/Screenshot_2026-03-17_at_6.44.35\u0020PM.png";
import member10 from "@/assets/members/Screenshot_2026-03-17_at_6.45.03\u0020PM.png";

const images = [member1, member2, member3, member4, member5, member6, member7, member8, member9, member10];

// Duplicate for seamless loop
const allImages = [...images, ...images];

const MemberCarousel = () => {
  return (
    <div className="w-full overflow-hidden py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground mb-3 uppercase">
          CREW MANIFEST — IEEE DIVISION
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold glow-text-purple text-foreground">
          OUR CREW
        </h2>
        <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mt-4" />
      </div>

      {/* Sliding track */}
      <div className="relative">
        {/* Edge fades */}
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
