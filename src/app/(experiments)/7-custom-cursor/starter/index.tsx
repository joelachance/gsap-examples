"use client";

import s from "./styles.module.css";
import { useEffect, useRef, useCallback, useState } from "react";
import { lerp } from "@/lib/math";
import gsap from "gsap";

export default function Page() {
  const [snap, setSnap] = useState<null | { x: number, y: number, w: number, h: number }>(null)




  const mouseRef = useRef<HTMLDivElement>(null);

  // using useRef to avoid all of the setState rerenders.
  const cursorPosRef = useRef({
    x: 0,
    y: 0,
  })

  const cursorTargetRef = useRef({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const callback: gsap.TickerCallback = (time, delta) => {
      if (snap) {

      } else {
        cursorPosRef.current.x = lerp(cursorPosRef.current.x, cursorTargetRef.current.x, 0.01 * delta);
        cursorPosRef.current.y = lerp(cursorPosRef.current.y, cursorTargetRef.current.y, 0.01 * delta);

        if (mouseRef.current) {
          mouseRef.current.style.setProperty("--x", cursorPosRef.current.x.toString() + "px");
          mouseRef.current.style.setProperty("--y", cursorPosRef.current.y.toString() + "px");
        }
      }
    }
    const cb = gsap.ticker.add(callback);
    return () => {
      gsap.ticker.remove(cb);
    };
    // callback();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener('mousemove', (event) => {
      const x = event.clientX;
      const y = event.clientY;

      if (mouseRef.current) {
        cursorTargetRef.current.x = x;
        cursorTargetRef.current.y = y;
      }
    }, { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);


  const onPointerEnter = useCallback(() => {
    setSnap({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: 100,
      h: 100,
    })
  }, [])
  const onPointerLeave = useCallback(() => {
    setSnap(null);
  }, [])

  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1 onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} className="uppercase text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100">
        Start
      </h1>
      <div ref={mouseRef} className={s.cursor} style={{ "--w": snap ? snap.w+"px" : undefined, "--h": snap ? snap.h+"px" : undefined } as React.CSSProperties} />
    </div>
  );
}
