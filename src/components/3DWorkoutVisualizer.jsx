import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, Box, Cylinder } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import * as THREE from 'three';

// 3D Exercise representation
const ExerciseModel = ({ exercise, position, isActive }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (isActive) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + position[1];
      }
    }
  });
  
  // Different shapes for different exercise types
  const getExerciseShape = () => {
    switch (exercise.type) {
      case 'strength':
        return (
          <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={position}>
            <meshStandardMaterial
              color={isActive ? "#e86af0" : "#8a2be2"}
              emissive={isActive ? "#e86af0" : "#8a2be2"}
              emissiveIntensity={isActive ? 0.5 : 0.2}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        );
      case 'cardio':
        return (
          <Sphere ref={meshRef} args={[0.5]} position={position}>
            <meshStandardMaterial
              color={isActive ? "#7bb3ff" : "#4a90e2"}
              emissive={isActive ? "#7bb3ff" : "#4a90e2"}
              emissiveIntensity={isActive ? 0.5 : 0.2}
              metalness={0.6}
              roughness={0.3}
            />
          </Sphere>
        );
      case 'flexibility':
        return (
          <Cylinder ref={meshRef} args={[0.3, 0.3, 1]} position={position}>
            <meshStandardMaterial
              color={isActive ? "#00d084" : "#28a745"}
              emissive={isActive ? "#00d084" : "#28a745"}
              emissiveIntensity={isActive ? 0.5 : 0.2}
              metalness={0.4}
              roughness={0.4}
            />
          </Cylinder>
        );
      default:
        return (
          <Box ref={meshRef} args={[0.6, 0.6, 0.6]} position={position}>
            <meshStandardMaterial
              color={isActive ? "#ffc107" : "#ff9800"}
              emissive={isActive ? "#ffc107" : "#ff9800"}
              emissiveIntensity={isActive ? 0.5 : 0.2}
            />
          </Box>
        );
    }
  };
  
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
      {getExerciseShape()}
      <Text
        position={[position[0], position[1] - 1, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {exercise.name}
      </Text>
    </Float>
  );
};

// Progress visualization
const ProgressSphere = ({ progress, position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#8a2be2"
          transparent
          opacity={0.3}
          emissive="#8a2be2"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Progress indicator */}
      <Sphere args={[0.8, 32, 32]} scale={[1, progress / 100, 1]}>
        <meshStandardMaterial
          color="#e86af0"
          emissive="#e86af0"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      <Text
        position={[0, 0, 1.2]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {progress}%
      </Text>
    </group>
  );
};

// Main 3D Workout Visualizer
const WorkoutVisualizer3D = ({ workouts = [], progress = 0 }) => {
  const [activeExercise, setActiveExercise] = useState(0);
  
  // Mock workout data if none provided
  const defaultWorkouts = [
    { id: 1, name: 'Bench Press', type: 'strength', completed: true },
    { id: 2, name: 'Running', type: 'cardio', completed: true },
    { id: 3, name: 'Yoga', type: 'flexibility', completed: false },
    { id: 4, name: 'Squats', type: 'strength', completed: false }
  ];
  
  const exerciseData = workouts.length > 0 ? workouts : defaultWorkouts;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExercise((prev) => (prev + 1) % exerciseData.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [exerciseData.length]);
  
  return (
    <VisualizerContainer>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8a2be2" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7bb3ff" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />
        
        {/* Exercise models */}
        {exerciseData.map((exercise, index) => {
          const angle = (index / exerciseData.length) * Math.PI * 2;
          const radius = 3;
          const position = [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.5,
            Math.sin(angle) * radius * 0.3
          ];
          
          return (
            <ExerciseModel
              key={exercise.id}
              exercise={exercise}
              position={position}
              isActive={index === activeExercise}
            />
          );
        })}
        
        {/* Central progress sphere */}
        <ProgressSphere progress={progress} position={[0, 0, 0]} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
      
      <VisualizerOverlay>
        <OverlayTitle>Workout Progress</OverlayTitle>
        <OverlayStats>
          <StatItem>
            <StatLabel>Completed</StatLabel>
            <StatValue>{exerciseData.filter(e => e.completed).length}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Remaining</StatLabel>
            <StatValue>{exerciseData.filter(e => !e.completed).length}</StatValue>
          </StatItem>
        </OverlayStats>
      </VisualizerOverlay>
    </VisualizerContainer>
  );
};

const VisualizerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(55, 56, 84, 0.9), rgba(73, 50, 103, 0.9));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const VisualizerOverlay = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const OverlayTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: white;
  font-size: 1rem;
`;

const OverlayStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
`;

export default WorkoutVisualizer3D;