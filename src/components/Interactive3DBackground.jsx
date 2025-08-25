import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import styled from 'styled-components';

// Floating particles component
const FloatingParticles = ({ count = 2000 }) => {
  const mesh = useRef();
  const light = useRef();
  
  // Generate random positions for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random colors with purple/blue theme
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 0.54; // Purple
        colors[i * 3 + 1] = 0.17;
        colors[i * 3 + 2] = 0.89;
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 0.48; // Blue
        colors[i * 3 + 1] = 0.70;
        colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 0.91; // Pink
        colors[i * 3 + 1] = 0.42;
        colors[i * 3 + 2] = 0.94;
      }
    }
    
    return [positions, colors];
  }, [count]);
  
  // Animate particles
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
    
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10;
      light.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 10;
    }
  });
  
  return (
    <group>
      <Points ref={mesh} positions={positions} colors={colors}>
        <PointMaterial
          transparent
          vertexColors
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <pointLight ref={light} intensity={0.5} color="#8a2be2" />
    </group>
  );
};

// Geometric shapes that float around
const FloatingGeometry = () => {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });
  
  return (
    <group ref={group}>
      {/* Floating cubes */}
      <mesh position={[5, 2, -3]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#8a2be2" 
          transparent 
          opacity={0.6}
          emissive="#8a2be2"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh position={[-4, -1, 2]}>
        <octahedronGeometry args={[0.7]} />
        <meshStandardMaterial 
          color="#7bb3ff" 
          transparent 
          opacity={0.7}
          emissive="#7bb3ff"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh position={[3, -3, 4]}>
        <tetrahedronGeometry args={[0.8]} />
        <meshStandardMaterial 
          color="#e86af0" 
          transparent 
          opacity={0.5}
          emissive="#e86af0"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh position={[-2, 4, -2]}>
        <icosahedronGeometry args={[0.6]} />
        <meshStandardMaterial 
          color="#9e379f" 
          transparent 
          opacity={0.6}
          emissive="#9e379f"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
};

// Main 3D background component
const Interactive3DBackground = ({ intensity = 'medium' }) => {
  const particleCount = intensity === 'low' ? 1000 : intensity === 'high' ? 3000 : 2000;
  
  return (
    <BackgroundContainer>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8a2be2" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7bb3ff" />
        
        <FloatingParticles count={particleCount} />
        <FloatingGeometry />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.4;
  pointer-events: none;
`;

export default Interactive3DBackground;