import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, Float, OrbitControls } from '@react-three/drei';
import { useUserLevel } from '../context/UserLevelContext';
import styled from 'styled-components';
import * as THREE from 'three';

// Animated level orb
const LevelOrb = () => {
  const { level, xp, xpToNextLevel, rank } = useUserLevel();
  const orbRef = useRef();
  const innerOrbRef = useRef();
  const particlesRef = useRef();
  
  const progress = (xp / xpToNextLevel) * 100;
  
  // Get color based on rank
  const getRankColor = () => {
    switch (rank) {
      case 'E_RANK': return '#888888';
      case 'D_RANK': return '#4CAF50';
      case 'C_RANK': return '#2196F3';
      case 'B_RANK': return '#9C27B0';
      case 'A_RANK': return '#E91E63';
      case 'S_RANK': return '#FF9800';
      case 'SHADOW_MONARCH': return '#7209b7';
      default: return '#8a2be2';
    }
  };
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (innerOrbRef.current) {
      innerOrbRef.current.rotation.y = -state.clock.elapsedTime * 0.8;
      innerOrbRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  const rankColor = getRankColor();
  
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group>
        {/* Outer orb */}
        <Sphere ref={orbRef} args={[2, 64, 64]}>
          <meshStandardMaterial
            color={rankColor}
            transparent
            opacity={0.3}
            emissive={rankColor}
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
        
        {/* Inner progress orb */}
        <Sphere ref={innerOrbRef} args={[1.5, 32, 32]} scale={[1, progress / 100, 1]}>
          <meshStandardMaterial
            color={rankColor}
            emissive={rankColor}
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Particle system around orb */}
        <group ref={particlesRef}>
          {[...Array(20)].map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 2.5 + Math.sin(i) * 0.5;
            return (
              <Sphere
                key={i}
                args={[0.05]}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius * 0.5,
                  Math.sin(angle + Math.PI / 2) * radius * 0.3
                ]}
              >
                <meshStandardMaterial
                  color={rankColor}
                  emissive={rankColor}
                  emissiveIntensity={2}
                />
              </Sphere>
            );
          })}
        </group>
        
        {/* Level text */}
        <Text
          position={[0, 0, 2.5]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Poppins-Bold.woff"
        >
          {level}
        </Text>
        
        {/* Rank text */}
        <Text
          position={[0, -0.5, 2.5]}
          fontSize={0.3}
          color={rankColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Poppins-SemiBold.woff"
        >
          {rank.replace('_', ' ')}
        </Text>
        
        {/* XP progress ring */}
        <group>
          {[...Array(Math.floor(progress / 5))].map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            return (
              <Sphere
                key={i}
                args={[0.08]}
                position={[
                  Math.cos(angle) * 3,
                  Math.sin(angle) * 3,
                  0
                ]}
              >
                <meshStandardMaterial
                  color="#ffc107"
                  emissive="#ffc107"
                  emissiveIntensity={1}
                />
              </Sphere>
            );
          })}
        </group>
      </group>
    </Float>
  );
};

// Main component
const LevelOrb3D = () => {
  const { level, xp, xpToNextLevel } = useUserLevel();
  
  return (
    <OrbContainer>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8a2be2" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7bb3ff" />
        
        <LevelOrb />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <OrbInfo>
        <InfoItem>
          <InfoLabel>XP</InfoLabel>
          <InfoValue>{xp} / {xpToNextLevel}</InfoValue>
        </InfoItem>
      </OrbInfo>
    </OrbContainer>
  );
};

const OrbContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(138, 43, 226, 0.2), rgba(55, 56, 84, 0.9));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const OrbInfo = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const InfoItem = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

export default LevelOrb3D;