"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const ctx = gsap.context(() => {      
  //     // .to animates from opacity 0 to current state (100)
  //     // every gsap animation is called a tween
  //     // the css classname will grab ALL .title divs here.
  //     const tween = gsap.from('.title', {
  //       // opacity: 0,
  //       x: 200,
  //       duration: 5,
  //     });
  //   }, containerRef);

  //   return () => {
  //     ctx.revert();
  //   };

    // // .from animates from current state to x 200
    // gsap.from('.title', {
    //   x: 200,
    // })

    // // animates from x -200 to x 200 (you give it a start and end)
    // gsap.fromTo('.title', {
    //   x: -200,
    // }, {
    //   x: 200,
    // });
  // }, []);

// this is the same as the useEffect above, but builtin!
  useGSAP(() => {
    const split = SplitText.create(".title", {
      type: "chars, words",
      className: "letter",
    });
    
    gsap.from(split.chars, {
      y: 200,
      opacity: 0,
      ease: "circ.out",
      stagger: 0.03,
    });
  }, {
    scope: containerRef,
  });

  return (
    <div className="bg-blue-300 text-black">
      <div ref={containerRef} className="flex h-screen items-end justify-left overflow-hidden">
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          GSAP
          <br />
          tweens
        </h1>
      </div>
    </div>
  );
}
