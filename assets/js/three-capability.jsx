import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CAPABILITIES = [
  {
    label: "Strategy",
    title: "AI strategy",
    description: "Choose the right problem, sequence the roadmap, and define what measurable value looks like.",
    color: "#6295ff",
    atmosphere: "#b8ceff",
    ring: "#d9e5ff",
    position: [-2.15, 1.08, 0.15],
  },
  {
    label: "Systems",
    title: "Bespoke systems",
    description: "Turn the priority into a working system shaped around your data, tools, and day-to-day reality.",
    color: "#9b6cff",
    atmosphere: "#d6c2ff",
    ring: "#eadfff",
    position: [2.2, 0.98, -0.08],
  },
  {
    label: "Intelligence",
    title: "Marketing intelligence",
    description: "Create reliable signals from research, reporting, brand visibility, and the evidence behind each decision.",
    color: "#f36b15",
    atmosphere: "#ffc69e",
    ring: "#ffe2cb",
    position: [-2.05, -1.16, -0.12],
  },
  {
    label: "Integration",
    title: "Tool and CRM integration",
    description: "Connect the system to existing workflows while keeping consequential actions under human control.",
    color: "#55c89b",
    atmosphere: "#b9f1db",
    ring: "#d8f8eb",
    position: [2.12, -1.12, 0.12],
  },
];

const tempScale = new THREE.Vector3();

function CapabilityNode({ capability, index, activeIndex, setActiveIndex, reducedMotion }) {
  const planet = useRef();
  const sphere = useRef();
  const rings = useRef();
  const [hovered, setHovered] = useState(false);
  const active = activeIndex === index;

  useFrame((state, delta) => {
    if (!planet.current || reducedMotion) return;
    const scale = active ? 1.23 : hovered ? 1.12 : 1;
    planet.current.scale.lerp(tempScale.setScalar(scale), 1 - Math.exp(-delta * 8));
    if (sphere.current) sphere.current.rotation.y += delta * (0.12 + index * 0.012);
    if (rings.current) {
      rings.current.rotation.z += delta * (0.035 + index * 0.006);
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.45 + index) * 0.018;
      rings.current.scale.setScalar(pulse);
    }
  });

  const setHover = (value) => {
    setHovered(value);
    document.body.style.cursor = value ? "pointer" : "";
  };

  return (
    <group position={capability.position}>
      <group
        ref={planet}
        onClick={(event) => {
          event.stopPropagation();
          setActiveIndex(index);
        }}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHover(true);
        }}
        onPointerLeave={() => setHover(false)}
      >
        <mesh ref={sphere}>
          <sphereGeometry args={[0.39, 64, 64]} />
          <meshPhysicalMaterial
            color={capability.color}
            emissive={capability.color}
            emissiveIntensity={active || hovered ? 0.16 : 0.045}
            metalness={0.08}
            roughness={0.28}
            clearcoat={1}
            clearcoatRoughness={0.16}
          />
        </mesh>
        <mesh scale={1.035}>
          <sphereGeometry args={[0.39, 48, 48]} />
          <meshBasicMaterial
            color={capability.atmosphere}
            transparent
            opacity={active || hovered ? 0.13 : 0.065}
            side={THREE.BackSide}
          />
        </mesh>
        <group ref={rings} rotation={[1.03, 0.12, index * 0.72]}>
          <mesh>
            <ringGeometry args={[0.49, 0.73, 96]} />
            <meshStandardMaterial
              color={capability.ring}
              transparent
              opacity={active || hovered ? 0.6 : 0.42}
              roughness={0.38}
              metalness={0.08}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0, 0, 0.002]}>
            <ringGeometry args={[0.59, 0.625, 96]} />
            <meshBasicMaterial
              color={capability.color}
              transparent
              opacity={active || hovered ? 0.78 : 0.52}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0, 0, 0.004]}>
            <ringGeometry args={[0.69, 0.72, 96]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={active || hovered ? 0.46 : 0.24}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function ConnectionLines() {
  const geometry = useMemo(() => {
    const points = [];
    CAPABILITIES.forEach(({ position }) => {
      points.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(...position));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#7285ae" transparent opacity={0.38} />
    </lineSegments>
  );
}

function ParticleField({ reducedMotion }) {
  const points = useRef();
  const geometry = useMemo(() => {
    const positions = new Float32Array(90 * 3);
    for (let index = 0; index < 90; index += 1) {
      const radius = 2.5 + ((index * 37) % 100) / 92;
      const angle = index * 2.399;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle * 1.37) * radius * 0.68;
      positions[index * 3 + 2] = Math.sin(angle) * 0.75 - 0.6;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y += delta * 0.018;
    points.current.rotation.z -= delta * 0.009;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color="#829bd4" size={0.025} transparent opacity={0.54} sizeAttenuation />
    </points>
  );
}

function SystemScene({ activeIndex, setActiveIndex, reducedMotion }) {
  const system = useRef();
  const core = useRef();
  const coreRings = useRef();

  useFrame((state, delta) => {
    if (!system.current || reducedMotion) return;
    const targetX = state.pointer.y * -0.17;
    const targetY = state.pointer.x * 0.22 + state.clock.elapsedTime * 0.055;
    system.current.rotation.x = THREE.MathUtils.damp(system.current.rotation.x, targetX, 4, delta);
    system.current.rotation.y = THREE.MathUtils.damp(system.current.rotation.y, targetY, 3, delta);
    if (core.current) {
      core.current.rotation.y -= delta * 0.045;
    }
    if (coreRings.current) {
      coreRings.current.rotation.z -= delta * 0.018;
    }
  });

  return (
    <>
      <ambientLight intensity={0.82} />
      <hemisphereLight args={["#eef3ff", "#253052", 1.45]} />
      <directionalLight position={[4, 5, 6]} intensity={2.8} color="#f5f7ff" />
      <pointLight position={[-3, -1, 3]} intensity={17} distance={7} color="#7c9fff" />
      <pointLight position={[3, 1, 2]} intensity={14} distance={7} color="#aa76ff" />
      <ParticleField reducedMotion={reducedMotion} />
      <group ref={system}>
        <ConnectionLines />
        <mesh ref={core}>
          <sphereGeometry args={[0.86, 80, 80]} />
          <meshPhysicalMaterial
            color="#0b1a37"
            emissive="#142b58"
            emissiveIntensity={0.12}
            metalness={0.12}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.14}
          />
        </mesh>
        <mesh scale={1.035}>
          <sphereGeometry args={[0.86, 64, 64]} />
          <meshBasicMaterial color="#91a9df" transparent opacity={0.075} side={THREE.BackSide} />
        </mesh>
        <group ref={coreRings} rotation={[1.08, 0.18, 0.42]}>
          <mesh>
            <ringGeometry args={[1.03, 1.48, 128]} />
            <meshStandardMaterial
              color="#b7c8ed"
              transparent
              opacity={0.27}
              roughness={0.42}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0, 0, 0.003]}>
            <ringGeometry args={[1.22, 1.28, 128]} />
            <meshBasicMaterial color="#7f9cdf" transparent opacity={0.48} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, 0.006]}>
            <ringGeometry args={[1.4, 1.44, 128]} />
            <meshBasicMaterial color="#d9e3fa" transparent opacity={0.34} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        </group>
        {CAPABILITIES.map((capability, index) => (
          <CapabilityNode
            key={capability.label}
            capability={capability}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </>
  );
}

function CapabilityExperience({ host }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const active = CAPABILITIES[activeIndex];

  return (
    <div className="capability-canvas">
      <div className="capability-viewport" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 6.4], fov: 42 }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            host.classList.add("is-three-ready");
          }}
        >
          <SystemScene activeIndex={activeIndex} setActiveIndex={setActiveIndex} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
      <div className="capability-controls" role="group" aria-label="Explore AI capabilities">
        {CAPABILITIES.map((capability, index) => (
          <button
            key={capability.label}
            className="capability-control"
            type="button"
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            onPointerEnter={() => setActiveIndex(index)}
          >
            {capability.label}
          </button>
        ))}
      </div>
      <div className="capability-readout" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <strong>{active.title}</strong>
        <p>{active.description}</p>
      </div>
    </div>
  );
}

const host = document.querySelector("[data-three-experience]");
const rootNode = document.getElementById("ai-capability-root");

if (host && rootNode) {
  createRoot(rootNode).render(<CapabilityExperience host={host} />);
}
