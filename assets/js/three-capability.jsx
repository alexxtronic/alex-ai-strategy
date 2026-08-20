import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#ccac0a";
const ONYX = "#11100f";
const CHARCOAL = "#333127";
const ALABASTER = "#e4e2de";

const CAPABILITIES = [
  { label: "Strategy", title: "Opportunity strategy", description: "Find expensive friction, quantify the economics, and choose the first problem worth solving." },
  { label: "Systems", title: "Reliable quick wins", description: "Turn the priority into a focused system shaped around your data, tools, team, and human judgment." },
  { label: "Intelligence", title: "Measurable intelligence", description: "Keep the evidence visible, measure realized value, and improve decisions instead of chasing impressive demos." },
  { label: "Integration", title: "Embedded integration", description: "Connect the system to real workflows, strengthen adoption, and keep improving it as the business evolves." },
];

const ROUTE_POINTS = [
  new THREE.Vector3(-0.04, 1.18, 0.34),
  new THREE.Vector3(-0.58, 0.43, 0.34),
  new THREE.Vector3(-0.1, -0.24, 0.34),
  new THREE.Vector3(1.2, -1.05, 0.34),
];

function createMountainGeometry(points, depth = 0.34) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.06,
    bevelThickness: 0.06,
    curveSegments: 16,
  });
  geometry.translate(0, 0, -depth / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function RouteSegment({ start, end, index, drawRef, reducedMotion }) {
  const segment = useRef();
  const glow = useRef();
  const direction = useMemo(() => end.clone().sub(start), [start, end]);
  const length = direction.length();
  const quaternion = useMemo(() => {
    const result = new THREE.Quaternion();
    result.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    return result;
  }, [direction]);

  useFrame(() => {
    const progress = reducedMotion ? (drawRef.current >= index + 1 ? 1 : 0) : THREE.MathUtils.clamp(drawRef.current - index, 0, 1);
    if (!segment.current || !glow.current) return;
    const visibleLength = Math.max(progress * length, 0.001);
    const position = start.clone().add(direction.clone().multiplyScalar(progress / 2));
    segment.current.position.copy(position);
    glow.current.position.copy(position);
    segment.current.scale.set(0.027, visibleLength, 0.027);
    glow.current.scale.set(0.075, visibleLength, 0.075);
    segment.current.visible = progress > 0.002;
    glow.current.visible = progress > 0.002;
  });

  return (
    <>
      <mesh ref={glow} quaternion={quaternion} visible={false}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={segment} quaternion={quaternion} visible={false}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.45} roughness={0.24} metalness={0.42} toneMapped={false} />
      </mesh>
    </>
  );
}

function RoutePoint({ point, index, activeIndex, onSelect, reducedMotion }) {
  const dot = useRef();
  const halo = useRef();
  const [hovered, setHovered] = useState(false);
  const active = index <= activeIndex;

  useFrame((state, delta) => {
    if (!dot.current || !halo.current) return;
    const pulse = reducedMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 3.4 + index * 0.7) * 0.08;
    const target = activeIndex === index ? 1.24 * pulse : hovered ? 1.13 : active ? 1.02 : 0.86;
    dot.current.scale.setScalar(THREE.MathUtils.damp(dot.current.scale.x, target, 9, delta));
    halo.current.scale.setScalar(THREE.MathUtils.damp(halo.current.scale.x, activeIndex === index ? 1.75 * pulse : active ? 1.22 : 0.9, 8, delta));
  });

  const setHover = (value) => {
    setHovered(value);
    document.body.style.cursor = value ? "pointer" : "";
  };
  const select = (event) => {
    event.stopPropagation();
    onSelect(index);
  };

  return (
    <group position={point}>
      <mesh ref={halo}>
        <ringGeometry args={[0.085, 0.14, 32]} />
        <meshBasicMaterial color={GOLD} transparent opacity={active ? 0.28 : 0.04} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh
        ref={dot}
        position={[0, 0, 0.006]}
        onPointerDown={select}
        onClick={select}
        onPointerEnter={(event) => { event.stopPropagation(); setHover(true); }}
        onPointerLeave={(event) => { event.stopPropagation(); setHover(false); }}
      >
        <circleGeometry args={[0.066, 32]} />
        <meshPhysicalMaterial color={active ? GOLD : "#6f6a5d"} emissive={active ? GOLD : ONYX} emissiveIntensity={active ? 1.05 : 0.02} roughness={0.22} metalness={0.5} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.012]} onPointerDown={select} onClick={select}>
        <circleGeometry args={[0.24, 20]} />
        <meshBasicMaterial transparent opacity={0} colorWrite={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function LithicMountain({ activeIndex, onSelect, pointerRef, reducedMotion }) {
  const mountain = useRef();
  const draw = useRef(reducedMotion ? activeIndex : 0);
  const mountainGeometry = useMemo(() => createMountainGeometry([
    [-2.5, -1.42],
    [-1.5, -0.62],
    [0, 1.52],
    [0.64, 0.62],
    [2.5, -1.42],
  ], 0.48), []);

  useEffect(() => {
    if (reducedMotion) draw.current = activeIndex;
  }, [activeIndex, reducedMotion]);

  useFrame((state, delta) => {
    if (!mountain.current) return;
    draw.current = reducedMotion ? activeIndex : THREE.MathUtils.damp(draw.current, activeIndex, 3.9, delta);
    if (reducedMotion) return;
    const pointer = pointerRef.current;
    mountain.current.rotation.x = THREE.MathUtils.damp(mountain.current.rotation.x, -0.08 - pointer.y * 0.15, 5.4, delta);
    mountain.current.rotation.y = THREE.MathUtils.damp(mountain.current.rotation.y, -0.1 + pointer.x * 0.26, 5.4, delta);
    mountain.current.rotation.z = THREE.MathUtils.damp(mountain.current.rotation.z, pointer.x * 0.025, 5.4, delta);
    mountain.current.position.x = THREE.MathUtils.damp(mountain.current.position.x, pointer.x * 0.08, 5, delta);
    mountain.current.position.y = THREE.MathUtils.damp(mountain.current.position.y, pointer.y * 0.045 + Math.sin(state.clock.elapsedTime * 0.5) * 0.018, 4.5, delta);
  });

  return (
    <group ref={mountain} rotation={[-0.08, -0.1, 0]} scale={0.92}>
      <mesh geometry={mountainGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial color={ONYX} roughness={0.24} metalness={0.2} clearcoat={0.9} clearcoatRoughness={0.16} />
      </mesh>
      {ROUTE_POINTS.slice(0, -1).map((point, index) => (
        <RouteSegment key={`route-${index}`} start={point} end={ROUTE_POINTS[index + 1]} index={index} drawRef={draw} reducedMotion={reducedMotion} />
      ))}
      {ROUTE_POINTS.map((point, index) => (
        <RoutePoint key={`point-${index}`} point={point} index={index} activeIndex={activeIndex} onSelect={onSelect} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}

function SystemScene({ activeIndex, onSelect, pointerRef, reducedMotion }) {
  return (
    <>
      <ambientLight intensity={0.95} />
      <hemisphereLight args={[ALABASTER, ONYX, 1.25]} />
      <directionalLight position={[4.5, 5.5, 7]} intensity={3.8} color="#ffffff" />
      <pointLight position={[-3.4, 1.8, 4]} intensity={4.2} distance={10} color={GOLD} />
      <pointLight position={[3.5, -1.3, 4.5]} intensity={2.4} distance={10} color={ALABASTER} />
      <LithicMountain activeIndex={activeIndex} onSelect={onSelect} pointerRef={pointerRef} reducedMotion={reducedMotion} />
    </>
  );
}

function CapabilityExperience({ host }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointer = useRef({ x: 0, y: 0 });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const active = CAPABILITIES[activeIndex];

  const moveMountain = (event) => {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.current.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const centerMountain = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <div className="capability-canvas">
      <div className="capability-viewport" aria-hidden="true" onPointerMove={moveMountain} onPointerLeave={centerMountain}>
        <Canvas
          camera={{ position: [0, 0, 7.4], fov: 41 }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            host.classList.add("is-three-ready");
          }}
        >
          <SystemScene activeIndex={activeIndex} onSelect={setActiveIndex} pointerRef={pointer} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
      <div className="capability-controls" role="group" aria-label="Explore Lithic's AI capabilities">
        {CAPABILITIES.map((capability, index) => (
          <button key={capability.label} className="capability-control" type="button" aria-pressed={activeIndex === index} onClick={() => setActiveIndex(index)} onPointerEnter={() => setActiveIndex(index)}>
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
if (host && rootNode) createRoot(rootNode).render(<CapabilityExperience host={host} />);
