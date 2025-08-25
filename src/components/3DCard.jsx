import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import * as THREE from 'three';

// 3D Card mesh component
const Card3DMesh = ({ title, value, color, isHovered }) => {
  const meshRef = useRef();
  const textRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
    
    if (textRef.current && isHovered) {
      textRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.6;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <group>
        {/* Main card */}
        <RoundedBox
          ref={meshRef}
          args={[3, 2, 0.2]}
          radius={0.1}
          smoothness={4}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.9}
            emissive={color}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
            roughness={0.2}
            metalness={0.8}
          />
        </RoundedBox>
        
        {/* Glow effect */}
        <RoundedBox
          args={[3.1, 2.1, 0.1]}
          radius={0.1}
          smoothness={4}
          position={[0, 0, -0.05]}
        >
          <meshStandardMaterial
            color={color}
            transparent
            opacity={isHovered ? 0.3 : 0.1}
            emissive={color}
            emissiveIntensity={1}
          />
        </RoundedBox>
        
        {/* Title text */}
        <Text
          position={[0, 0.4, 0.6]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Poppins-SemiBold.woff"
        >
          {title}
        </Text>
        
        {/* Value text */}
        <Text
          ref={textRef}
          position={[0, -0.2, 0.6]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Poppins-Bold.woff"
        >
          {value}
        </Text>
        
        {/* Interactive elements */}
        {isHovered && (
          <group>
            {[...Array(8)].map((_, i) => (
              <mesh
                key={i}
                position={[
                  Math.cos((i / 8) * Math.PI * 2) * 2,
                  Math.sin((i / 8) * Math.PI * 2) * 1.5,
                  0.3
                ]}
              >
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={2}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </Float>
  );
};

// Main 3D Card component
const Card3D = ({ title, value, color = "#8a2be2", children, className, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <CardContainer
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <Canvas3D>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color={color} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />
          
          <Card3DMesh 
            title={title} 
            value={value} 
            color={color} 
            isHovered={isHovered}
          />
        </Canvas>
      </Canvas3D>
      
      {children && (
        <CardOverlay>
          {children}
        </CardOverlay>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(55, 56, 84, 0.8), rgba(73, 50, 103, 0.8));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const Canvas3D = styled.div`
  width: 100%;
  height: 100%;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  pointer-events: none;
`;

export default Card3D;