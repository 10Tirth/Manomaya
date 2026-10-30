import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Detect low-power device
const lowPower =
  (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4) ||
  (typeof window !== 'undefined' && window.innerWidth < 768)

const SPHERE_SEGS = lowPower ? 32 : 64

// Satellite orbit data — fully static colours (no interpolation)
const SATELLITES = [
  { radius: 0.28, orbitR: 2.5, orbitSpeed: 0.38, phase: 0,        color: '#ffcdb8' }, // peach
  { radius: 0.22, orbitR: 2.8, orbitSpeed: 0.26, phase: 1.26,     color: '#9fd3c1' }, // sage
  { radius: 0.18, orbitR: 2.4, orbitSpeed: 0.44, phase: 2.51,     color: '#bfe0f5' }, // sky
  { radius: 0.42, orbitR: 2.9, orbitSpeed: 0.20, phase: 3.77,     color: '#ffe8a8' }, // butter
  { radius: 0.24, orbitR: 2.6, orbitSpeed: 0.32, phase: 5.03,     color: '#b9aef2' }, // lavender
]

function CalmOrb() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const s = 1.6 + 0.03 * Math.sin((2 * Math.PI * t) / 6)
    meshRef.current.scale.setScalar(s)
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, SPHERE_SEGS, SPHERE_SEGS]} />
      <MeshDistortMaterial
        color="#cfc7fb"
        roughness={0.18}
        clearcoat={1}
        distort={0.38}
        speed={1.4}
      />
    </mesh>
  )
}

function SatelliteOrbs({ groupRef }) {
  return (
    <group ref={groupRef}>
      {SATELLITES.map((s, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.4} floatIntensity={0.6}>
          <SatelliteMesh {...s} index={i} />
        </Float>
      ))}
      {/* Thin tilted torus ring */}
      <mesh rotation={[0.4, 0.2, 0.1]}>
        <torusGeometry args={[2.3, 0.012, 16, 100]} />
        <meshStandardMaterial color="#d4cff5" transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function SatelliteMesh({ radius, orbitR, orbitSpeed, phase, color }) {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const angle = phase + t * orbitSpeed
    meshRef.current.position.x = Math.cos(angle) * orbitR
    meshRef.current.position.z = Math.sin(angle) * orbitR
    meshRef.current.position.y = Math.sin(angle * 0.7) * 0.4
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 20, 20]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.05} />
    </mesh>
  )
}

function SceneInner({ pointerRef, scrollRef }) {
  const groupRef = useRef()
  const satelliteGroupRef = useRef()
  const { size } = useThree()
  const isMobile = size.width < 768

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return

    if (isMobile) {
      // Auto-rotation only on touch devices
      groupRef.current.rotation.y += delta * 0.15
    } else {
      // Pointer parallax
      const px = pointerRef.current.x
      const py = pointerRef.current.y
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y, px * 0.5, 4, delta
      )
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x, -py * 0.3, 4, delta
      )
    }

    // Scroll link — drift group up and scale down
    const scrollPct = scrollRef.current
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y, -scrollPct * 1.2, 5, delta
    )
    const sc = 1 - scrollPct * 0.25
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, sc, 5, delta))
  })

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={['#ffffff', '#e9e4ff', 0.8]} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#cfe8ff" />
      <group ref={groupRef}>
        <CalmOrb />
        <SatelliteOrbs groupRef={satelliteGroupRef} />
      </group>
      {!lowPower && <ContactShadows position={[0, -2.6, 0]} opacity={0.2} scale={8} blur={2} />}
    </>
  )
}

export default function HeroScene({ containerRef }) {
  const pointerRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const canvasRef = useRef(null)
  const [frameloop, setFrameloop] = useState('always')

  // Track scroll for parallax drift
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track pointer across the whole hero container
  useEffect(() => {
    const el = containerRef?.current
    if (!el) return
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      pointerRef.current = {
        x: ((e.clientX - left) / width - 0.5) * 2,
        y: ((e.clientY - top) / height - 0.5) * 2,
      }
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [containerRef])

  // Pause rendering when off-screen
  useEffect(() => {
    const target = canvasRef.current?.parentElement
    if (!target) return
    const obs = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
      { threshold: 0.01 }
    )
    obs.observe(target)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 40 }}
        dpr={lowPower ? 1 : [1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={frameloop}
        style={{ pointerEvents: 'none' }}
      >
        <SceneInner pointerRef={pointerRef} scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
