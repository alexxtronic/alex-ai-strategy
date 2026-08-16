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
    position: [-2.15, 1.08, 0.15],
  },
  {
    label: "Systems",
    title: "Bespoke systems",
    description: "Turn the priority into a working system shaped around your data, tools, and day-to-day reality.",
    color: "#9b6cff",
    position: [2.2, 0.98, -0.08],
  },
  {
    label: "Intelligence",
    title: "Marketing intelligence",
    description: "Create reliable signals from research, reporting, brand visibility, and the evidence behind each decision.",
    color: "#f36b15",
    position: [-2.05, -1.16, -0.12],
  },
  {
    label: "Integration",
    title: "Tool and CRM integration",
    description: "Connect the system to existing workflows while keeping consequential actions under human control.",
    color: "#55c89b",
    position: [2.12, -1.12, 0.12],
  },
];

const tempScale = new THREE.Vector3();

function CapabilityNode({ capability, index, activeIndex, setActiveIndex, reducedMotion }) {
  const mesh = useRef();
  const halo = useRef();
  const [hovered, setHovered] = useState(false);
  const active = activeIndex === index;

  useFrame((state, delta) => {
    if (!mesh.current || reducedMotion) return;
    const scale = active ? 1.23 : hovered ? 1.12 : 1;
    mesh.current.scale.lerp(tempScale.setScalar(scale), 1 - Math.exp(-delta * 8));
    mesh.current.rotation.x += delta * (0.18 + index * 0.015);
    mesh.current.rotation.y += delta * (0.24 + index * 0.02);
    if (halo.current) {
      halo.current.rotation.z -= delta * 0.22;
      halo.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.7 + index) * 0.035);
    }
  });

  const setHover = (value) => {
    setHovered(value);
    document.body.style.cursor = value ? "pointer" : "";
  };

  return (
    <group position={capability.position}>
      <mesh
        ref={mesh}
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
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial
          color={capability.color}
          emissive={capability.color}
          emissiveIntensity={active || hovered ? 0.5 : 0.16}
          metalness={0.48}
          roughness={0.24}
        />
      </mesh>
      <mesh ref={halo} rotation={[Math.PI / 2, 0, index * 0.7]}>
        <torusGeometry args={[0.55, 0.012, 8, 72]} />
        <meshBasicMaterial color={capability.color} transparent opacity={active ? 0.82 : 0.36} />
      </mesh>
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

  useFrame((state, delta) => {
    if (!system.current || reducedMotion) return;
    const targetX = state.pointer.y * -0.17;
    const targetY = state.pointer.x * 0.22 + state.clock.elapsedTime * 0.055;
    system.current.rotation.x = THREE.MathUtils.damp(system.current.rotation.x, targetX, 4, delta);
    system.current.rotation.y = THREE.MathUtils.damp(system.current.rotation.y, targetY, 3, delta);
    if (core.current) {
      core.current.rotation.x += delta * 0.09;
      core.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#e9efff" />
      <pointLight position={[-3, -1, 3]} intensity={22} distance={7} color="#7c9fff" />
      <pointLight position={[3, 1, 2]} intensity={18} distance={7} color="#aa76ff" />
      <ParticleField reducedMotion={reducedMotion} />
      <group ref={system}>
        <ConnectionLines />
        <mesh ref={core}>
          <icosahedronGeometry args={[0.88, 2]} />
          <meshStandardMaterial color="#0b1a37" metalness={0.72} roughness={0.2} />
        </mesh>
        <mesh scale={1.12} rotation={[0.35, 0.2, 0]}>
          <icosahedronGeometry args={[0.88, 1]} />
          <meshBasicMaterial color="#91a9df" wireframe transparent opacity={0.34} />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0.25, 0.4]}>
          <torusGeometry args={[1.3, 0.014, 8, 120]} />
          <meshBasicMaterial color="#7b8fb9" transparent opacity={0.38} />
        </mesh>
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
