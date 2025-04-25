"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"

function QoreLogo() {
  return (
    <group>
      {/* Main Q Circle */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.4, 16, 100]} />
        <meshStandardMaterial color="#0A3D62" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Gold Accent */}
      <mesh position={[1.2, -1.2, 0.2]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#FFC107" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Text Placeholder */}
      <mesh position={[0, -2.5, 0]}>
        <planeGeometry args={[5, 0.8]} />
        <meshStandardMaterial color="#0A3D62" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  )
}

export default function Modern3DLogo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0A3D62] to-[#1B4F72] p-6">
      <h1 className="text-white text-3xl font-bold mb-8">QoreAi Modern 3D Logo</h1>
      <div className="w-full max-w-2xl h-[500px] bg-white/10 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFC107" />
          <Suspense fallback={null}>
            <QoreLogo />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>
      <p className="text-white/80 mt-6 max-w-md text-center">
        This is a modern 3D interpretation of your QoreAi logo that adds depth and interactivity. Perfect for creating a
        memorable brand experience on your Shopify site.
      </p>
    </div>
  )
}
