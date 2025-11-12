"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";

export default function Page() {
  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
      <h1
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title-container"]
        )}
      >
        <span className="absolute text-[0.5em] top-[-1em] left-0 opacity-70">
          --css
        </span>
        <span className={s["title-text"]}>Variables</span>
      </h1>
    </div>
  );
}
