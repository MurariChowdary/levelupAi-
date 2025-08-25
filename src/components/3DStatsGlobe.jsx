import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, Float, OrbitControls, Line } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

// Data point on the globe
const DataPoint = ({ position, value, label, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });
  
  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.1]} position={[0, 0, 0.1]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
        />
      </Sphere>
      
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      
      <Text
        position={[0, -0.2, 0.3]}
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>
    </group>
  );
};

// Connection lines between data points
const DataConnections = ({ points }) => {
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        positions.push(...points[i].position);
        positions.push(...points[j].position);
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);
  
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#8a2be2" transparent opacity={0.3} />
    </line>
  );
};

// Main globe component
const StatsGlobe = ({ stats }) => {
  const globeRef = useRef();
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  // Default stats if none provided
  const defaultStats = [
    { label: 'Workouts', value: '24', color: '#8a2be2', position: [0, 2, 0] },
    { label: 'Calories', value: '1.2k', color: '#e86af0', position: [1.5, 1, 1] },
    { label: 'Protein', value: '180g', color: '#7bb3ff', position: [-1.5, 1, -1] },
    { label: 'Steps', value: '8.5k', color: '#00d084', position: [0, -1.5, 1.5] },
    { label: 'Water', value: '2.5L', color: '#00bcd4', position: [1, -1, -1.5] },
    { label: 'Sleep', value: '7.5h', color: '#ff9800', position: [-1, 0, 2] }
  ];
  
  const statsData = stats || defaultStats;
  
  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
      <group ref={globeRef}>
        {/* Main globe */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            color="#373854"
            transparent
            opacity={0.2}
            emissive="#8a2be2"
            emissiveIntensity={0.1}
            wireframe
          />
        </Sphere>
        
        {/* Inner core */}
        <Sphere args={[1.5, 32, 32]}>
          <meshStandardMaterial
            color="#8a2be2"
            transparent
            opacity={0.3}
            emissive="#8a2be2"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Data points */}
        {statsData.map((stat, index) => (
          <DataPoint
            key={index}
            position={stat.position}
            value={stat.value}
            label={stat.label}
            color={stat.color}
          />
        ))}
        
        {/* Connection lines */}
        <DataConnections points={statsData} />
        
        {/* Orbital rings */}
        {[3, 3.5, 4].map((radius, index) => (
          <group key={index}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.02, 16, 100]} />
              <meshStandardMaterial
                color="#8a2be2"
                transparent
                opacity={0.3 - index * 0.1}
                emissive="#8a2be2"
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};

// Main component
const StatsGlobe3D = ({ stats, title = "Fitness Stats" }) => {
  return (
    <GlobeContainer>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8a2be2" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7bb3ff" />
        
        <StatsGlobe stats={stats} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
      
      <GlobeOverlay>
        <OverlayTitle>{title}</OverlayTitle>
        <OverlaySubtitle>Interactive 3D Statistics</OverlaySubtitle>
      </GlobeOverlay>
    </GlobeContainer>
  );
};

const GlobeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(138, 43, 226, 0.1), rgba(55, 56, 84, 0.9));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const GlobeOverlay = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const OverlayTitle = styled.h3`
  margin: 0 0 0.25rem 0;
  color: white;
  font-size: 1.125rem;
`;

const OverlaySubtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

export default StatsGlobe3D;