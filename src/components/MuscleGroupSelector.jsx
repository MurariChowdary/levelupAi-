import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const MuscleGroupSelector = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  
  // Muscle groups data
  const muscleGroups = [
    { id: 'chest', name: 'Chest', color: '#E91E63', position: [0, 0.5, 0.5] },
    { id: 'back', name: 'Back', color: '#2196F3', position: [0, 0.5, -0.5] },
    { id: 'shoulders', name: 'Shoulders', color: '#FF9800', position: [0, 1, 0] },
    { id: 'biceps', name: 'Biceps', color: '#4CAF50', position: [0.5, 0, 0] },
    { id: 'triceps', name: 'Triceps', color: '#9C27B0', position: [-0.5, 0, 0] },
    { id: 'abs', name: 'Abs', color: '#00BCD4', position: [0, 0, 0.3] },
    { id: 'quads', name: 'Quads', color: '#FFEB3B', position: [0.2, -0.8, 0.2] },
    { id: 'hamstrings', name: 'Hamstrings', color: '#FF5722', position: [0.2, -0.8, -0.2] },
    { id: 'calves', name: 'Calves', color: '#8BC34A', position: [0.2, -1.3, 0] },
    { id: 'glutes', name: 'Glutes', color: '#3F51B5', position: [0, -0.5, -0.3] },
  ];
  
  // Handle muscle selection
  const handleMuscleSelect = (muscle) => {
    setSelectedMuscle(muscle.id === selectedMuscle ? null : muscle.id);
  };
  
  // Get exercises for selected muscle
  const getExercisesForMuscle = (muscleId) => {
    const exercisesByMuscle = {
      chest: ['Bench Press', 'Incline Press', 'Chest Flyes', 'Push-ups', 'Cable Crossovers'],
      back: ['Pull-ups', 'Rows', 'Lat Pulldowns', 'Deadlifts', 'Back Extensions'],
      shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises', 'Reverse Flyes', 'Shrugs'],
      biceps: ['Bicep Curls', 'Hammer Curls', 'Preacher Curls', 'Concentration Curls', 'Chin-ups'],
      triceps: ['Tricep Pushdowns', 'Skull Crushers', 'Dips', 'Overhead Extensions', 'Close-grip Bench'],
      abs: ['Crunches', 'Leg Raises', 'Planks', 'Russian Twists', 'Ab Rollouts'],
      quads: ['Squats', 'Leg Press', 'Lunges', 'Leg Extensions', 'Hack Squats'],
      hamstrings: ['Leg Curls', 'Romanian Deadlifts', 'Good Mornings', 'Glute-Ham Raises', 'Nordic Curls'],
      calves: ['Calf Raises', 'Seated Calf Raises', 'Donkey Calf Raises', 'Jump Rope', 'Box Jumps'],
      glutes: ['Hip Thrusts', 'Glute Bridges', 'Bulgarian Split Squats', 'Cable Kickbacks', 'Sumo Squats'],
    };
    
    return exercisesByMuscle[muscleId] || [];
  };
  
  return (
    <SelectorContainer>
      <SelectorHeader>
        <h2>Muscle Group Selector</h2>
        <p>Select a muscle group to see targeted exercises</p>
      </SelectorHeader>
      
      <ContentContainer>
        <ModelContainer>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#8a2be2" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7bb3ff" />
            <pointLight position={[0, 10, 0]} intensity={0.3} color="#e86af0" />
              muscleGroups={muscleGroups} 
              selectedMuscle={selectedMuscle}
              hoveredMuscle={hoveredMuscle}
              setHoveredMuscle={setHoveredMuscle}
              onSelectMuscle={handleMuscleSelect}
            />
            <OrbitControls enableZoom={false} enablePan={false} />
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              autoRotate
              autoRotateSpeed={0.5}
            />
            
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            </EffectComposer>
        </ModelContainer>
        
        <InfoPanel>
          {selectedMuscle ? (
            <>
              <MuscleTitle>
                <MuscleColorIndicator color={muscleGroups.find(m => m.id === selectedMuscle)?.color} />
                {muscleGroups.find(m => m.id === selectedMuscle)?.name}
              </MuscleTitle>
              
              <ExerciseList>
                {getExercisesForMuscle(selectedMuscle).map((exercise, index) => (
                  <ExerciseItem 
                    key={index}
                    as={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ExerciseNumber>{index + 1}</ExerciseNumber>
                    <ExerciseName>{exercise}</ExerciseName>
                  </ExerciseItem>
                ))}
              </ExerciseList>
              
              <ActionButton 
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All {muscleGroups.find(m => m.id === selectedMuscle)?.name} Exercises
              </ActionButton>
            </>
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                </svg>
              </EmptyStateIcon>
              <EmptyStateText>Select a muscle group from the 3D model to see targeted exercises</EmptyStateText>
            </EmptyState>
          )}
        </InfoPanel>
      </ContentContainer>
      
      <MuscleGroupLegend>
        {muscleGroups.map(muscle => (
          <LegendItem 
            key={muscle.id}
            onClick={() => handleMuscleSelect(muscle)}
            isSelected={selectedMuscle === muscle.id}
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LegendColor color={muscle.color} />
            <LegendText>{muscle.name}</LegendText>
          </LegendItem>
        ))}
      </MuscleGroupLegend>
    </SelectorContainer>
  );
};

// 3D Human Model Component
const HumanModel = ({ muscleGroups, selectedMuscle, hoveredMuscle, setHoveredMuscle, onSelectMuscle }) => {
  const groupRef = useRef();
  
  // Rotate the model slowly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
        {/* Enhanced human figure */}
        <mesh position={[0, 0, 0]} scale={[0.4, 1, 0.2]}>
          <capsuleGeometry args={[0.5, 1, 16, 16]} />
          <meshStandardMaterial 
            color="#2a2a3a" 
            metalness={0.3}
            roughness={0.7}
            emissive="#1a1a2e"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial 
            color="#2a2a3a" 
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        
        {/* Arms */}
        <mesh position={[0.7, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]} scale={[0.15, 0.6, 0.15]}>
          <capsuleGeometry args={[0.5, 1, 16, 16]} />
          <meshStandardMaterial 
            color="#2a2a3a" 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        <mesh position={[-0.7, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} scale={[0.15, 0.6, 0.15]}>
          <capsuleGeometry args={[0.5, 1, 16, 16]} />
          <meshStandardMaterial 
            color="#2a2a3a" 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Legs */}
        <mesh position={[0.25, -1, 0]} rotation={[0.1, 0, 0]} scale={[0.15, 0.6, 0.15]}>
          <capsuleGeometry args={[0.5, 1, 16, 16]} />
          <meshStandardMaterial 
            color="#2a2a3a" 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        <mesh position={[-0.25, -1, 0]} rotation={[0.1, 0, 0]} scale={[0.15, 0.6, 0.15]}>
          <capsuleGeometry args={[0.5, 1, 16, 16]} />
          <meshStandardMaterial 
            color="#2a2a3a" 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Enhanced muscle group indicators */}
        {muscleGroups.map((muscle) => (
          <Float key={muscle.id} speed={2} rotationIntensity={0.2} floatIntensity={0.1}>
            <mesh
              position={muscle.position}
              onClick={() => onSelectMuscle(muscle)}
              onPointerOver={() => setHoveredMuscle(muscle.id)}
              onPointerOut={() => setHoveredMuscle(null)}
            >
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial 
                color={muscle.color} 
                emissive={muscle.color}
                emissiveIntensity={selectedMuscle === muscle.id ? 0.8 : hoveredMuscle === muscle.id ? 0.5 : 0.2}
                transparent
                opacity={selectedMuscle === muscle.id ? 1 : 0.7}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            {/* Muscle group label */}
            {(selectedMuscle === muscle.id || hoveredMuscle === muscle.id) && (
              <Text
                position={[muscle.position[0], muscle.position[1] + 0.5, muscle.position[2]]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {muscle.name}
              </Text>
            )}
            
            {/* Glow effect for selected/hovered */}
            {(selectedMuscle === muscle.id || hoveredMuscle === muscle.id) && (
              <Sphere args={[0.2]} position={muscle.position}>
                <meshStandardMaterial
                  color={muscle.color}
                  transparent
                  opacity={0.3}
                  emissive={muscle.color}
                  emissiveIntensity={1}
                />
              </Sphere>
            )}
          </Float>
        ))}
      </Float>
    </group>
  );
};

const SelectorContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const SelectorHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0 0 0.25rem 0;
    font-size: 1.5rem;
    color: var(--text-light);
  }
  
  p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ModelContainer = styled.div`
  flex: 1;
  height: 400px;
  background-color: var(--primary-dark);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background: radial-gradient(circle at center, rgba(138, 43, 226, 0.1), rgba(55, 56, 84, 0.9));
`;

const InfoPanel = styled.div`
  flex: 1;
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MuscleTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: var(--text-light);
  display: flex;
  align-items: center;
`;

const MuscleColorIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 0.5rem;
  box-shadow: 0 0 5px ${props => props.color};
`;

const ExerciseList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ExerciseNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--accent-purple);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: 0.75rem;
  box-shadow: 0 0 5px var(--accent-purple);
`;

const ExerciseName = styled.div`
  font-size: 0.875rem;
  color: var(--text-light);
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  margin-top: auto;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 0 10px var(--accent-purple);
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const EmptyStateIcon = styled.div`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 250px;
  margin: 0;
`;

const MuscleGroupLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  background-color: ${props => props.isSelected ? 'var(--primary-dark)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.isSelected ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'};
  
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 0.5rem;
  box-shadow: 0 0 5px ${props => props.color};
`;

const LegendText = styled.div`
  font-size: 0.75rem;
  color: var(--text-light);
`;

export default MuscleGroupSelector;