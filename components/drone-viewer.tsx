"use client"

import React, { useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows, PerspectiveCamera, Stage } from "@react-three/drei"
import * as THREE from "three"

function DroneModel({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { scene } = useGLTF("/drone.glb")
  const droneRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!droneRef.current || !mouse.current) return

    // Target rotation based on mouse position
    // Map mouse range [-1, 1] to full 360 degree rotation [-PI, PI]
    const targetRotationY = mouse.current[0] * Math.PI 
    const targetRotationX = mouse.current[1] * (Math.PI / 4) 

    // Smoothly interpolate (lerp) towards target rotation
    // Increased lerp factor for higher sensitivity
    droneRef.current.rotation.x = THREE.MathUtils.lerp(
      droneRef.current.rotation.x,
      targetRotationX,
      0.2 
    )
    droneRef.current.rotation.y = THREE.MathUtils.lerp(
      droneRef.current.rotation.y,
      targetRotationY,
      0.2
    )

    // Subtle floating animation
    droneRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
  })

  return (
    <Stage 
      intensity={1.8} 
      environment="studio" 
      adjustCamera 
      shadows={{ type: 'contact', opacity: 0.4, blur: 2 }}
    >
      <primitive 
        object={scene} 
        ref={droneRef} 
        scale={0.01} // Drastically reduced scale as model units vary
        position={[0, 0, 0]} 
      />
    </Stage>
  )
}

export function DroneViewer({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <Suspense fallback={null}>
          <DroneModel mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
