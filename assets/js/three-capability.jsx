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
    tint: "#dce8ff",
    position: [-0.28, 1.16, -0.56],
    rotation: [0, 0, -0.035],
  },
  {
    label: "Systems",
    title: "Bespoke systems",
    description: "Turn the priority into a working system shaped around your data, tools, and day-to-day reality.",
    color: "#9b6cff",
    tint: "#eadfff",
    position: [0.2, 0.4, -0.18],
    rotation: [0, 0, 0.024],
  },
  {
    label: "Intelligence",
    title: "Marketing intelligence",
    description: "Create reliable signals from research, reporting, brand visibility, and the evidence behind each decision.",
    color: "#f36b15",
    tint: "#ffe5d2",
    position: [-0.16, -0.38, 0.2],
    rotation: [0, 0, -0.018],
  },
  {
    label: "Integration",
    title: "Tool and CRM integration",
    description: "Connect the system to existing workflows while keeping consequential actions under human control.",
    color: "#55c89b",
    tint: "#d8f8eb",
    position: [0.22, -1.16, 0.56],
    rotation: [0, 0, 0.03],
  },
];

const tempScale = new THREE.Vector3();

function createLayerGeometry() {
  const width = 4.2;
  const height = 1.02;
  const radius = 0.18;
  const depth = 0.075;
  const left = -width / 2;
  const right = width / 2;
  const bottom = -height / 2;
  const top = height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(left + radius, bottom);
  shape.lineTo(right - radius, bottom);
  shape.quadraticCurveTo(right, bottom, right, bottom + radius);
  shape.lineTo(right, top - radius);
  shape.quadraticCurveTo(right, top, right - radius, top);
  shape.lineTo(left + radius, top);
  shape.quadraticCurveTo(left, top, left, top - radius);
  shape.lineTo(left, bottom + radius);
  shape.quadraticCurveTo(left, bottom, left + radius, bottom);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.022,
    bevelThickness: 0.018,
    curveSegments: 20,
  });
  geometry.translate(0, 0, -depth / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function CapabilityLayer({ capability, index, activeIndex, setActiveIndex, reducedMotion }) {
  const layer = useRef();
  const [hovered, setHovered] = useState(false);
  const active = activeIndex === index;
  const geometry = useMemo(() => createLayerGeometry(), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 22), [geometry]);

  useFrame((state, delta) => {
    if (!layer.current) return;
    const float = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.72 + index * 0.86) * 0.025;
    const targetZ = capability.position[2] + (active ? 0.5 : hovered ? 0.22 : 0);
    const targetScale = active ? 1.055 : hovered ? 1.024 : 1;

    if (reducedMotion) {
      layer.current.position.set(capability.position[0], capability.position[1], targetZ);
      layer.current.scale.setScalar(targetScale);
      return;
    }

    layer.current.position.x = THREE.MathUtils.damp(layer.current.position.x, capability.position[0], 7, delta);
    layer.current.position.y = THREE.MathUtils.damp(layer.current.position.y, capability.position[1] + float, 7, delta);
    layer.current.position.z = THREE.MathUtils.damp(layer.current.position.z, targetZ, 7, delta);
    layer.current.scale.lerp(tempScale.setScalar(targetScale), 1 - Math.exp(-delta * 8));
  });

  const setHover = (value) => {
    setHovered(value);
    document.body.style.cursor = value ? "pointer" : "";
  };

  const selectLayer = (event) => {
    event.stopPropagation();
    setActiveIndex(index);
  };

  return (
    <group ref={layer} position={capability.position} rotation={capability.rotation}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={capability.tint}
          emissive={capability.color}
          emissiveIntensity={active ? 0.13 : hovered ? 0.075 : 0.025}
          transparent
          opacity={active ? 0.88 : 0.7}
          roughness={0.22}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.12}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={capability.color} transparent opacity={active ? 0.78 : hovered ? 0.55 : 0.3} />
      </lineSegments>

      <mesh position={[-1.75, 0, 0.082]}>
        <boxGeometry args={[0.055, 0.58, 0.025]} />
        <meshBasicMaterial color={capability.color} transparent opacity={active ? 1 : 0.72} />
      </mesh>
      <mesh position={[-1.38, 0.16, 0.083]}>
        <boxGeometry args={[0.48, 0.055, 0.022]} />
        <meshBasicMaterial color="#2d3a58" transparent opacity={active ? 0.58 : 0.25} />
      </mesh>
      <mesh position={[-1.52, -0.12, 0.083]}>
        <boxGeometry args={[0.22, 0.035, 0.022]} />
        <meshBasicMaterial color="#53617d" transparent opacity={active ? 0.46 : 0.2} />
      </mesh>
      {[0, 1, 2].map((barIndex) => (
        <mesh key={barIndex} position={[0.25 + barIndex * 0.72, 0.02 - barIndex * 0.07, 0.083]}>
          <boxGeometry args={[0.54, 0.035, 0.022]} />
          <meshBasicMaterial color={capability.color} transparent opacity={active ? 0.5 - barIndex * 0.08 : 0.15} />
        </mesh>
      ))}
      <mesh
        onPointerDown={selectLayer}
        onClick={selectLayer}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHover(true);
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          setHover(false);
        }}
      >
        <boxGeometry args={[4.35, 1.14, 0.3]} />
        <meshBasicMaterial transparent opacity={0} colorWrite={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function StackSignal() {
  const geometry = useMemo(() => {
    const points = CAPABILITIES.map(({ position }) => new THREE.Vector3(position[0] - 1.75, position[1], position[2] - 0.08));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#7f92c0" transparent opacity={0.22} />
    </line>
  );
}

function LayeredStack({ activeIndex, setActiveIndex, reducedMotion }) {
  const stack = useRef();

  useFrame((state, delta) => {
    if (!stack.current || reducedMotion) return;
    const targetX = -0.22 + state.pointer.y * -0.055;
    const targetY = -0.14 + state.pointer.x * 0.075;
    stack.current.rotation.x = THREE.MathUtils.damp(stack.current.rotation.x, targetX, 3, delta);
    stack.current.rotation.y = THREE.MathUtils.damp(stack.current.rotation.y, targetY, 3, delta);
  });

  return (
    <group ref={stack} rotation={[-0.22, -0.14, 0]}>
      <StackSignal />
      {CAPABILITIES.map((capability, index) => (
        <CapabilityLayer
          key={capability.label}
          capability={capability}
          index={index}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

function SystemScene({ activeIndex, setActiveIndex, reducedMotion }) {
  return (
    <>
      <ambientLight intensity={1.8} />
      <hemisphereLight args={["#ffffff", "#d7e0f3", 1.7]} />
      <directionalLight position={[3, 5, 7]} intensity={3.2} color="#ffffff" />
      <pointLight position={[-4, 1, 3]} intensity={10} distance={8} color="#7c9fff" />
      <pointLight position={[4, -1, 4]} intensity={9} distance={8} color="#ad82ff" />
      <LayeredStack activeIndex={activeIndex} setActiveIndex={setActiveIndex} reducedMotion={reducedMotion} />
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
          camera={{ position: [0, 0, 6.8], fov: 39 }}
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
