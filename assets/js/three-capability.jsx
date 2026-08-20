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

const intelligenceVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const intelligenceFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vWorldNormal), viewDirection), 0.0), 2.35);
    float flowOne = sin(vUv.y * 24.0 + sin(vUv.x * 13.0 + uTime * 0.62) * 4.0 - uTime * 0.9) * 0.5 + 0.5;
    float flowTwo = sin(vUv.x * 31.0 - vUv.y * 11.0 + uTime * 1.18) * 0.5 + 0.5;
    float energy = smoothstep(0.48, 0.92, flowOne * 0.68 + flowTwo * 0.48);
    float cell = hash(floor(vUv * vec2(44.0, 28.0)));
    float twinkle = 0.5 + 0.5 * sin(uTime * 4.2 + cell * 31.0);
    float sparkle = step(0.963, cell) * pow(twinkle, 3.0);
    float whiteCurrent = pow(max(0.0, sin(vUv.x * 19.0 + uTime) * cos(vUv.y * 17.0 - uTime * 0.72)), 14.0);

    vec3 deepBlack = vec3(0.006, 0.004, 0.022);
    vec3 purple = vec3(0.42, 0.12, 0.88);
    vec3 violet = vec3(0.72, 0.42, 1.0);
    vec3 white = vec3(1.0, 0.98, 1.0);
    vec3 color = mix(deepBlack, purple, energy * 0.76);
    color = mix(color, violet, fresnel * 0.62);
    color += white * (sparkle * 1.45 + whiteCurrent * 0.42);
    color += purple * fresnel * (0.25 + sin(uTime * 1.6) * 0.06);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const auraFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vWorldNormal), viewDirection), 0.0), 2.05);
    float shimmer = 0.72 + 0.28 * sin(vUv.y * 21.0 + vUv.x * 15.0 - uTime * 1.35);
    float pulse = 0.82 + 0.18 * sin(uTime * 1.7);
    vec3 color = mix(vec3(0.42, 0.12, 0.92), vec3(1.0), fresnel * 0.72);
    float alpha = fresnel * shimmer * pulse * 0.48;
    gl_FragColor = vec4(color, alpha);
  }
`;

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

function CentralIntelligence({ reducedMotion }) {
  const coreMaterial = useRef();
  const auraMaterial = useRef();
  const aura = useRef();
  const burst = useRef();
  const halos = useRef();
  const coreUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const auraUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const burstGeometry = useMemo(() => {
    const points = [];
    const count = 42;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      const direction = new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
      const inner = 0.88 + ((index * 17) % 7) * 0.012;
      const outer = 1.12 + ((index * 29) % 11) * 0.035;
      points.push(direction.clone().multiplyScalar(inner), direction.clone().multiplyScalar(outer));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.elapsedTime;
    if (coreMaterial.current) coreMaterial.current.uniforms.uTime.value = time;
    if (auraMaterial.current) auraMaterial.current.uniforms.uTime.value = time;
    if (aura.current) {
      const scale = 1 + Math.sin(time * 1.45) * 0.035;
      aura.current.scale.setScalar(scale);
      aura.current.rotation.y += delta * 0.075;
    }
    if (burst.current) {
      burst.current.rotation.x += delta * 0.018;
      burst.current.rotation.y -= delta * 0.028;
      burst.current.scale.setScalar(0.98 + Math.sin(time * 1.9) * 0.035);
    }
    if (halos.current) halos.current.rotation.z += delta * 0.025;
  });

  return (
    <group>
      <lineSegments ref={burst} geometry={burstGeometry}>
        <lineBasicMaterial
          color="#b88cff"
          transparent
          opacity={0.33}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[0.86, 96, 96]} />
        <shaderMaterial
          ref={coreMaterial}
          vertexShader={intelligenceVertexShader}
          fragmentShader={intelligenceFragmentShader}
          uniforms={coreUniforms}
        />
      </mesh>
      <mesh ref={aura} scale={1.12}>
        <sphereGeometry args={[0.86, 72, 72]} />
        <shaderMaterial
          ref={auraMaterial}
          vertexShader={intelligenceVertexShader}
          fragmentShader={auraFragmentShader}
          uniforms={auraUniforms}
          transparent
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <group ref={halos}>
        <mesh rotation={[1.12, 0.22, 0.38]}>
          <torusGeometry args={[1.08, 0.018, 12, 128]} />
          <meshBasicMaterial color="#a676ff" transparent opacity={0.48} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh rotation={[0.42, 1.05, -0.48]}>
          <torusGeometry args={[1.18, 0.012, 10, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh rotation={[0.88, -0.7, 0.92]}>
          <torusGeometry args={[1.28, 0.01, 10, 128]} />
          <meshBasicMaterial color="#7139e6" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      <pointLight position={[0, 0, 1.4]} intensity={9} distance={4} color="#c7a2ff" />
    </group>
  );
}

function SystemScene({ activeIndex, setActiveIndex, reducedMotion }) {
  const system = useRef();

  useFrame((state, delta) => {
    if (!system.current || reducedMotion) return;
    const targetX = state.pointer.y * -0.17;
    const targetY = state.pointer.x * 0.22 + state.clock.elapsedTime * 0.055;
    system.current.rotation.x = THREE.MathUtils.damp(system.current.rotation.x, targetX, 4, delta);
    system.current.rotation.y = THREE.MathUtils.damp(system.current.rotation.y, targetY, 3, delta);
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
        <CentralIntelligence reducedMotion={reducedMotion} />
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
