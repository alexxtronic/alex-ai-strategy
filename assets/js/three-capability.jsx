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
  new THREE.Vector3(-0.08, 1.3, 0.39),
  new THREE.Vector3(-0.72, 0.46, 0.46),
  new THREE.Vector3(0.12, -0.24, 0.46),
  new THREE.Vector3(1.23, -1.18, 0.46),
];

function createMountainGeometry(points, depth = 0.34) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.045,
    bevelThickness: 0.045,
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
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshBasicMaterial color={GOLD} transparent opacity={active ? 0.2 : 0.045} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh
        ref={dot}
        onPointerDown={select}
        onClick={select}
        onPointerEnter={(event) => { event.stopPropagation(); setHover(true); }}
        onPointerLeave={(event) => { event.stopPropagation(); setHover(false); }}
      >
        <sphereGeometry args={[0.072, 24, 24]} />
        <meshPhysicalMaterial color={active ? GOLD : "#777267"} emissive={active ? GOLD : ONYX} emissiveIntensity={active ? 1.15 : 0.04} roughness={0.18} metalness={0.55} clearcoat={1} />
      </mesh>
      <mesh onPointerDown={select} onClick={select}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} colorWrite={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function LithicMountain({ activeIndex, onSelect, reducedMotion }) {
  const mountain = useRef();
  const draw = useRef(reducedMotion ? activeIndex : 0);
  const leftGeometry = useMemo(() => createMountainGeometry([
    [-2.72, -1.48], [-1.72, -0.37], [-1.17, -0.88], [0.03, 1.48], [0.54, 0.68], [-0.92, -1.48],
  ]), []);
  const rightGeometry = useMemo(() => createMountainGeometry([
    [0.02, -1.48], [1.34, 0.06], [2.68, -1.48],
  ], 0.28), []);
  const leftEdges = useMemo(() => new THREE.EdgesGeometry(leftGeometry, 18), [leftGeometry]);
  const rightEdges = useMemo(() => new THREE.EdgesGeometry(rightGeometry, 18), [rightGeometry]);

  useEffect(() => {
    if (reducedMotion) draw.current = activeIndex;
  }, [activeIndex, reducedMotion]);

  useFrame((state, delta) => {
    if (!mountain.current) return;
    draw.current = reducedMotion ? activeIndex : THREE.MathUtils.damp(draw.current, activeIndex, 3.9, delta);
    if (reducedMotion) return;
    mountain.current.rotation.x = THREE.MathUtils.damp(mountain.current.rotation.x, -0.055 + state.pointer.y * -0.035, 3, delta);
    mountain.current.rotation.y = THREE.MathUtils.damp(mountain.current.rotation.y, -0.08 + state.pointer.x * 0.08, 3, delta);
    mountain.current.position.y = Math.sin(state.clock.elapsedTime * 0.48) * 0.025;
  });

  return (
    <group ref={mountain} rotation={[-0.055, -0.08, 0]} scale={0.98}>
      <mesh geometry={leftGeometry}>
        <meshPhysicalMaterial color={ONYX} roughness={0.32} metalness={0.18} clearcoat={0.64} clearcoatRoughness={0.2} />
      </mesh>
      <lineSegments geometry={leftEdges}><lineBasicMaterial color={ALABASTER} transparent opacity={0.2} /></lineSegments>
      <mesh geometry={rightGeometry}>
        <meshPhysicalMaterial color={CHARCOAL} roughness={0.38} metalness={0.12} clearcoat={0.52} clearcoatRoughness={0.24} />
      </mesh>
      <lineSegments geometry={rightEdges}><lineBasicMaterial color={ALABASTER} transparent opacity={0.18} /></lineSegments>
      <mesh position={[-0.77, -0.79, 0.2]} rotation={[0, 0, -0.37]}>
        <planeGeometry args={[1.8, 0.95]} />
        <meshBasicMaterial color="#5a574d" transparent opacity={0.2} depthWrite={false} />
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

function SystemScene({ activeIndex, onSelect, reducedMotion }) {
  return (
    <>
      <ambientLight intensity={1.35} />
      <hemisphereLight args={[ALABASTER, ONYX, 1.55]} />
      <directionalLight position={[4, 5, 7]} intensity={3.2} color="#ffffff" />
      <pointLight position={[-3.2, 1.4, 4]} intensity={6.5} distance={9} color={GOLD} />
      <pointLight position={[3.5, -1.5, 4]} intensity={4.4} distance={9} color={ALABASTER} />
      <LithicMountain activeIndex={activeIndex} onSelect={onSelect} reducedMotion={reducedMotion} />
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
          camera={{ position: [0, 0, 7.1], fov: 39 }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            host.classList.add("is-three-ready");
          }}
        >
          <SystemScene activeIndex={activeIndex} onSelect={setActiveIndex} reducedMotion={reducedMotion} />
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
