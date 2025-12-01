"use client";

import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Group, PointLight } from "three";
import gsap from "gsap";

export default function Page() {
  const [groupRef, setGroupRef] = useState<Group | null>(null);
  const [lightRef, setLightRef] = useState<PointLight | null>(null);
  
  useGSAP(() => {
    if (!groupRef) return;
    if (!lightRef) return;
    gsap.from(groupRef.position, {
      y: -1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(groupRef.rotation, {
      x: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(lightRef, {
      x: -1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(lightRef, {
      intensity: 0,
    });

    gsap.from(lightRef.position, {
      x: 4,
    });
  }, { dependencies: [groupRef,lightRef], revertOnUpdate: true });


  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black">
      <Canvas>
        <group ref={setGroupRef}>
          <Scene />
        </group>

        <pointLight position={[10,2,2]} intensity={10} />
        <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={28} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
      // <Canvas>
      //   <group>
      //     <Scene />
      //   </group>
      //   <PerspectiveCamera fov={28} makeDefault position={[0, 1.5, 5]} />
      //   <ambientLight intensity={0.1} />
      //   <pointLight position={[30, 3, 5]} intensity={20} />
      //   <color args={["black"]} attach="background" />
      // </Canvas>

function Scene() {
  const { scene } = useGLTF("/models/rover/source/Perseverance.glb");
  return <primitive object={scene} />;
}
