"use client";
import { StaticVersion } from "./logo-static";
import { ShaderEffect } from "./logo-webgl";
import { getGPUTier } from 'detect-gpu';
import { useState, useEffect } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { DeviceType } from "@/types";
import { useBattery } from "@/hooks/use-battery";

export default function Page() {

  const shouldRenderGl = useShouldRenderGl();
  return shouldRenderGl ? <ShaderEffect /> : <StaticVersion />;
}

function useShouldRenderGl() {

  const [tier, setTier] = useState<number | null>(null);
  const [deviceData, setDeviceData] = useState<DeviceType | null>(null);

  const battery = useBattery();
console.log(battery);
  
  useEffect(() => {
    const result = getSelectorsByUserAgent(
      window.navigator.userAgent
    );
    setDeviceData(result as DeviceType);



    getGPUTier().then((gpu) => {
      setTier(gpu.tier);
    });
  }, []);

  if (typeof tier === "number" && tier < 2) {
    return false;
  }

  if (deviceData && deviceData.isSafari) {
    return false;
  }

  if (battery.isSupported && battery.fetched && battery.level < 0.3 && !battery.charging) {
    return false;
  }

  return true;
}