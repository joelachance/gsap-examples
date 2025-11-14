"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      SplitText.create("h1", {
        type: "chars",
        charsClass:
          "char++ bg-linear-to-t from-black/10 to-white to-70% bg-clip-text",
        mask: "chars",
      });

      gsap.from("h1 .char", {
        x: "100%",
        rotateY: "90deg",
        stagger: 0.02,
        duration: 0.5,
        ease: "circ.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <ImageSequence />
      <section className="h-screen relative w-full overflow-clip">
        <h1 className="uppercase text-[8vw] w-full text-center absolute -bottom-[0.1em] leading-none right-[0.05em] tracking-widest text-transparent">
          Perseverance
        </h1>
      </section>
    </div>
  );
}

function ImageSequence() {
  useEffect(() => {}, []);

  return <canvas className="absolute w-full h-full" />;
}
