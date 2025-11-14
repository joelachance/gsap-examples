import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import s from "./styles.module.css";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-audiowide",
});

const geistMono = Geist_Mono({
  weight: "variable",
  display: "swap",
  variable: "--font-geist-mono",
});

console.log(audiowide);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        audiowide.variable,
        geistMono.variable,
        geistMono.className,
        s.section
      )}
    >
      {children}
    </div>
  );
}
