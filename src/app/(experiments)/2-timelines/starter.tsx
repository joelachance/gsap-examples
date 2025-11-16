"use client";

export default function Page() {
  return (
    <div className="bg-[#E5E5E5] text-[#2A2A2A] flex h-screen items-center justify-center tracking-tighter">
      <h1 className="title font-bold text-[20vh] flex flex-col gap-[0.2em] leading-none text-left uppercase">
        <span className="relative block right-[1.5em] text-left">GSAP</span>
        <span className="relative block">
          <span>timeline</span>
          {/* Timeline */}
          <div className="absolute w-full -bottom-2 h-2">
            <div className="tl-main absolute w-full bottom-0 h-2 bg-orange-500" />
            <div className="tl-start absolute left-0 top-1/2 -translate-y-1/2 h-8 w-2 bg-orange-500" />
          </div>
          {/* Dot */}
          <div className="tl-dot absolute -top-2 -right-4 h-4 aspect-square bg-orange-500 opacity-0" />
        </span>
        <span className="relative block left-[1.6em] text-right">basics</span>
      </h1>
    </div>
  );
}
