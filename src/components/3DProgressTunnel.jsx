import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Tube, OrbitControls, Text } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

// Progress tunnel component
const ProgressTunnel = ({ progress = 50, segments = 50 }) => {
  const tunnelRef = useRef();
  const progressRef = useRef();
  
  // Create tunnel curve
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = Math.sin(t * Math.PI * 4) * 2;
      const y = Math.cos(t * Math.PI * 3) * 1.5;
      const z = t * 20 - 10;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [segments]);
  
  useFrame((state) => {
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    
    if (progressRef.current) {
      progressRef.current.rotation.z = -state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group>
      {/* Main tunnel */}
      <Tube
        ref={tunnelRef}
        args={[curve, segments, 1, 16, false]}
      >
        <meshStandardMaterial
          color="#373854"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          wireframe
        />
      </Tube>
      
      {/* Progress indicator */}
      <Tube
        ref={progressRef}
        args={[curve, Math.floor(segments * (progress / 100)), 0.8, 16, false]}
      >
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Tube>
      
      {/* Progress particles */}
      {[...Array(Math.floor(progress / 2))].map((_, i) => {
        const t = (i / Math.floor(progress / 2)) * (progress / 100);
        const point = curve.getPoint(t);
        
        return (
          <mesh key={i} position={point}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial
              color="#e86af0"
              emissive="#e86af0"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
      
      {/* Progress text */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {progress}% Complete
      </Text>
    </group>
  );
};

// Main component
const ProgressTunnel3D = ({ progress, title = "Progress Journey" }) => {
  return (
    <TunnelContainer>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8a2be2" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7bb3ff" />
        
        <ProgressTunnel progress={progress} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
      
      <TunnelOverlay>
        <OverlayTitle>{title}</OverlayTitle>
        <OverlayProgress>{progress}% Complete</OverlayProgress>
      </TunnelOverlay>
    </TunnelContainer>
  );
};

const TunnelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(55, 56, 84, 0.9), rgba(73, 50, 103, 0.9));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const TunnelOverlay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  text-align: right;
`;

const OverlayTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: white;
  font-size: 1.125rem;
`;

const OverlayProgress = styled.div`
  color: #8a2be2;
  font-size: 1.5rem;
  font-weight: bold;
`;

export default ProgressTunnel3D;