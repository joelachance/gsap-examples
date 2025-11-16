/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { ShaderEffect } from "./logo-webgl";
import { DeviceType } from "@/types";
import { getSelectorsByUserAgent } from "react-device-detect";
import { getGPUTier } from "detect-gpu";
import { StaticVersion } from "./logo-static";

export default function Page() {
  const shouldUseShaders = useMeasureDevice();
  return shouldUseShaders ? <ShaderEffect /> : <StaticVersion />;
}

function useMeasureDevice() {
  const [deviceData, setDeviceData] = useState<DeviceType | null>(null);
  const [gpuTier, setGpuTier] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const data = getSelectorsByUserAgent(
      window.navigator.userAgent
    ) as DeviceType;
    setDeviceData(data);

    getGPUTier().then((gpu) => {
      setGpuTier(gpu.tier);
    });
  }, []);

  if (gpuTier === null || deviceData === null) return true;

  const shouldUseShaders =
    gpuTier > 1 && !deviceData.isMobile && !deviceData.isSafari;

  return shouldUseShaders;
}
