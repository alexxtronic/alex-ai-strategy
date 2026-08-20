import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CAPABILITIES = [
  {
    label: "Strategy",
    title: "AI strategy",
    description: "Choose the right problem, sequence the roadmap, and define what measurable value looks like.",
    color: "#6295ff",
    tint: "#dce8ff",
  },
  {
    label: "Systems",
    title: "Bespoke systems",
    description: "Turn the priority into a working system shaped around your data, tools, and day-to-day reality.",
    color: "#9b6cff",
    tint: "#eadfff",
  },
  {
    label: "Intelligence",
    title: "Marketing intelligence",
    description: "Create reliable signals from research, reporting, brand visibility, and the evidence behind each decision.",
    color: "#f36b15",
    tint: "#ffe5d2",
  },
  {
    label: "Integration",
    title: "Tool and CRM integration",
    description: "Connect the system to existing workflows while keeping consequential actions under human control.",
    color: "#55c89b",
    tint: "#d8f8eb",
  },
];

const DRAWER_POSITIONS = [1.25, 0.42, -0.42, -1.25];
const tempScale = new THREE.Vector3();

function createLabelTexture(label, index, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.textBaseline = "middle";
  context.fillStyle = color;
  context.font = "600 54px Georgia, serif";
  context.fillText(String(index + 1).padStart(2, "0"), 60, 130);
  context.fillStyle = "#0a1832";
  context.font = "600 78px Arial, sans-serif";
  context.fillText(label, 180, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function CapabilityDrawer({ capability, index, activeIndex, flashVersion, onSelect, reducedMotion }) {
  const drawer = useRef();
  const frontMaterial = useRef();
  const edgeMaterial = useRef();
  const glowMaterial = useRef();
  const flash = useRef(0);
  const lastFlashVersion = useRef(flashVersion);
  const [hovered, setHovered] = useState(false);
  const active = activeIndex === index;
  const frontGeometry = useMemo(() => new THREE.BoxGeometry(4.08, 0.72, 0.16), []);
  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(frontGeometry, 18), [frontGeometry]);
  const labelTexture = useMemo(() => createLabelTexture(capability.label, index, capability.color), [capability, index]);

  useEffect(() => {
    if (active && flashVersion !== lastFlashVersion.current) flash.current = 1;
    lastFlashVersion.current = flashVersion;
  }, [active, flashVersion]);

  useFrame((state, delta) => {
    if (!drawer.current) return;
    const restingScale = active ? 1.012 : hovered ? 1.006 : 1;

    if (reducedMotion) {
      drawer.current.scale.setScalar(restingScale);
      if (frontMaterial.current) frontMaterial.current.emissiveIntensity = active ? 0.16 : 0.025;
      if (edgeMaterial.current) edgeMaterial.current.opacity = active ? 0.95 : 0.26;
      if (glowMaterial.current) glowMaterial.current.opacity = active ? 0.36 : 0;
      return;
    }

    flash.current = Math.max(0, flash.current - delta * 0.62);
    const progress = 1 - flash.current;
    const pulse = flash.current > 0 ? Math.pow(flash.current, 0.72) * (0.5 + Math.abs(Math.sin(progress * Math.PI * 7)) * 0.5) : 0;
    const float = Math.sin(state.clock.elapsedTime * 0.7 + index * 0.8) * 0.008;

    drawer.current.position.y = THREE.MathUtils.damp(drawer.current.position.y, DRAWER_POSITIONS[index] + float, 7, delta);
    drawer.current.scale.lerp(tempScale.setScalar(restingScale + pulse * 0.008), 1 - Math.exp(-delta * 9));
    if (frontMaterial.current) frontMaterial.current.emissiveIntensity = (active ? 0.11 : hovered ? 0.06 : 0.018) + pulse * 0.58;
    if (edgeMaterial.current) edgeMaterial.current.opacity = Math.min(1, (active ? 0.56 : hovered ? 0.4 : 0.2) + pulse * 0.72);
    if (glowMaterial.current) glowMaterial.current.opacity = pulse * 0.7;
  });

  const setHover = (value) => {
    setHovered(value);
    document.body.style.cursor = value ? "pointer" : "";
  };

  const selectDrawer = (event) => {
    event.stopPropagation();
    onSelect(index);
  };

  return (
    <group ref={drawer} position={[0, DRAWER_POSITIONS[index], 0.7]}>
      <mesh position={[0, 0, -0.52]}>
        <boxGeometry args={[3.92, 0.64, 1.02]} />
        <meshStandardMaterial color="#dfe6f4" roughness={0.38} metalness={0.02} />
      </mesh>
      <mesh geometry={frontGeometry}>
        <meshPhysicalMaterial
          ref={frontMaterial}
          color={capability.tint}
          emissive={capability.color}
          emissiveIntensity={0.018}
          roughness={0.2}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial ref={edgeMaterial} color={capability.color} transparent opacity={0.2} />
      </lineSegments>
      <lineSegments geometry={edgeGeometry} scale={1.012}>
        <lineBasicMaterial
          ref={glowMaterial}
          color={capability.color}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
      <mesh position={[0, 0, 0.086]}>
        <planeGeometry args={[3.7, 0.56]} />
        <meshBasicMaterial map={labelTexture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh
        position={[0, 0, 0.08]}
        onPointerDown={selectDrawer}
        onClick={selectDrawer}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHover(true);
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          setHover(false);
        }}
      >
        <boxGeometry args={[4.18, 0.8, 0.28]} />
        <meshBasicMaterial transparent opacity={0} colorWrite={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function CapabilityCabinet({ activeIndex, flashVersion, onSelect, reducedMotion }) {
  const cabinet = useRef();
  const cabinetGeometry = useMemo(() => new THREE.BoxGeometry(4.62, 3.86, 1.24), []);
  const cabinetEdges = useMemo(() => new THREE.EdgesGeometry(cabinetGeometry, 18), [cabinetGeometry]);

  useFrame((state, delta) => {
    if (!cabinet.current || reducedMotion) return;
    const targetX = -0.07 + state.pointer.y * -0.035;
    const targetY = -0.24 + state.pointer.x * 0.065;
    cabinet.current.rotation.x = THREE.MathUtils.damp(cabinet.current.rotation.x, targetX, 3, delta);
    cabinet.current.rotation.y = THREE.MathUtils.damp(cabinet.current.rotation.y, targetY, 3, delta);
    cabinet.current.position.y = Math.sin(state.clock.elapsedTime * 0.48) * 0.025;
  });

  return (
    <group ref={cabinet} rotation={[-0.07, -0.24, 0.012]}>
      <mesh geometry={cabinetGeometry}>
        <meshPhysicalMaterial color="#e9eef9" roughness={0.28} metalness={0.025} clearcoat={0.8} clearcoatRoughness={0.2} />
      </mesh>
      <lineSegments geometry={cabinetEdges}>
        <lineBasicMaterial color="#91a4cc" transparent opacity={0.36} />
      </lineSegments>
      <mesh position={[0, 0, 0.64]}>
        <planeGeometry args={[4.18, 3.5]} />
        <meshBasicMaterial color="#7d8caf" transparent opacity={0.08} />
      </mesh>
      {CAPABILITIES.map((capability, index) => (
        <CapabilityDrawer
          key={capability.label}
          capability={capability}
          index={index}
          activeIndex={activeIndex}
          flashVersion={flashVersion}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

function SystemScene({ activeIndex, flashVersion, onSelect, reducedMotion }) {
  return (
    <>
      <ambientLight intensity={1.55} />
      <hemisphereLight args={["#ffffff", "#cbd6eb", 1.8]} />
      <directionalLight position={[4, 5, 7]} intensity={3.4} color="#ffffff" />
      <pointLight position={[-4, 1, 4]} intensity={9} distance={9} color="#7d9fff" />
      <pointLight position={[4, -1, 4]} intensity={8} distance={9} color="#ac80ff" />
      <CapabilityCabinet
        activeIndex={activeIndex}
        flashVersion={flashVersion}
        onSelect={onSelect}
        reducedMotion={reducedMotion}
      />
    </>
  );
}

function CapabilityExperience({ host }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flashVersion, setFlashVersion] = useState(0);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const active = CAPABILITIES[activeIndex];

  const selectCapability = (index, flash = true) => {
    setActiveIndex(index);
    if (flash) setFlashVersion((version) => version + 1);
  };

  return (
    <div className="capability-canvas">
      <div className="capability-viewport" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 7.4], fov: 39 }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            host.classList.add("is-three-ready");
          }}
        >
          <SystemScene
            activeIndex={activeIndex}
            flashVersion={flashVersion}
            onSelect={selectCapability}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      </div>
      <div className="capability-controls" role="group" aria-label="Explore AI capabilities">
        {CAPABILITIES.map((capability, index) => (
          <button
            key={capability.label}
            className="capability-control"
            type="button"
            aria-pressed={activeIndex === index}
            onClick={() => selectCapability(index)}
            onPointerEnter={() => selectCapability(index, false)}
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
