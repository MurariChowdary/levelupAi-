import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const FormGuideViewer = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'steps'
  const canvasRef = useRef();
  
  // Mock exercise form guides
  const exerciseGuides = [
    {
      id: 1,
      name: 'Barbell Squat',
      description: 'A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.',
      steps: [
        'Stand with feet shoulder-width apart, barbell resting on upper back.',
        'Brace core and keep chest up, begin to hinge at the hips.',
        'Bend knees and lower body until thighs are parallel to ground.',
        'Drive through heels to return to starting position.',
        'Maintain neutral spine throughout the movement.'
      ],
      commonErrors: [
        'Knees caving inward',
        'Rounding the lower back',
        'Rising onto toes',
        'Not reaching proper depth',
        'Looking down instead of forward'
      ],
      tips: [
        'Focus on pushing knees outward during descent',
        'Maintain a neutral spine by engaging core muscles',
        'Keep weight in heels and mid-foot',
        'Aim for thighs parallel to ground or lower',
        'Look at a spot on the wall in front of you'
      ]
    },
    {
      id: 2,
      name: 'Bench Press',
      description: 'A compound upper body exercise that targets the chest, shoulders, and triceps.',
      steps: [
        'Lie on bench with feet flat on ground, eyes under barbell.',
        'Grip barbell slightly wider than shoulder width.',
        'Unrack barbell and position over chest with straight arms.',
        'Lower barbell to mid-chest, keeping elbows at about 45° angle.',
        'Press barbell back up to starting position.'
      ],
      commonErrors: [
        'Arching back excessively',
        'Bouncing barbell off chest',
        'Flaring elbows out too wide',
        'Uneven bar path',
        'Lifting hips off bench'
      ],
      tips: [
        'Maintain slight natural arch in lower back',
        'Control the descent and touch chest lightly',
        'Keep elbows at about 45° angle to torso',
        'Bar should move in slight diagonal path',
        'Keep glutes in contact with bench throughout'
      ]
    },
    {
      id: 3,
      name: 'Deadlift',
      description: 'A compound exercise that targets the posterior chain, including the back, glutes, and hamstrings.',
      steps: [
        'Stand with feet hip-width apart, barbell over mid-foot.',
        'Hinge at hips and grip barbell just outside legs.',
        'Lower hips, flatten back, and brace core.',
        'Drive through heels, extending hips and knees.',
        'Stand tall at top, then reverse movement to lower barbell.'
      ],
      commonErrors: [
        'Rounding the back',
        'Starting with hips too low',
        'Letting barbell drift away from body',
        'Jerking the weight off the floor',
        'Looking up too high'
      ],
      tips: [
        'Maintain neutral spine throughout movement',
        'Start with hips higher than knees',
        'Keep barbell close to legs during lift',
        'Apply steady pressure to initiate lift',
        'Look at spot on ground about 6 feet ahead'
      ]
    },
    {
      id: 4,
      name: 'Overhead Press',
      description: 'A compound upper body exercise that targets the shoulders, triceps, and upper chest.',
      steps: [
        'Stand with feet shoulder-width apart, barbell at front of shoulders.',
        'Grip barbell just outside shoulders, elbows pointing down.',
        'Brace core and slightly tuck chin.',
        'Press barbell overhead until arms are fully extended.',
        'Lower barbell back to starting position with control.'
      ],
      commonErrors: [
        'Arching lower back excessively',
        'Pressing bar in front of face',
        'Flaring elbows too wide',
        'Not fully extending arms',
        'Leaning back too far'
      ],
      tips: [
        'Engage core to maintain neutral spine',
        'Press bar in slight arc around face',
        'Keep elbows at about 45° angle to body',
        'Fully lock out arms at top of movement',
        'Use minimal lean back, just enough to clear chin'
      ]
    }
  ];

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setViewMode('3d');
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === '3d' ? 'steps' : '3d');
  };

  return (
    <GuideContainer>
      <GuideHeader>
        <h2>Form Guide Viewer</h2>
        <p>Learn proper exercise form with 3D demonstrations</p>
      </GuideHeader>

      <GuideContent>
        <ExerciseList>
          <ListHeader>Select an Exercise</ListHeader>
          {exerciseGuides.map(exercise => (
            <ExerciseItem 
              key={exercise.id}
              selected={selectedExercise?.id === exercise.id}
              onClick={() => handleExerciseSelect(exercise)}
              as={motion.div}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {exercise.name}
            </ExerciseItem>
          ))}
        </ExerciseList>

        <GuideDisplay>
          {selectedExercise ? (
            <>
              <GuideHeader>
                <h3>{selectedExercise.name}</h3>
                <ViewToggle onClick={toggleViewMode}>
                  {viewMode === '3d' ? 'View Steps' : 'View 3D Model'}
                </ViewToggle>
              </GuideHeader>
              
              <GuideDescription>{selectedExercise.description}</GuideDescription>
              
              {viewMode === '3d' ? (
                <ModelContainer>
                  <Canvas ref={canvasRef} camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    
                    {/* Placeholder for 3D model */}
                    <mesh>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshStandardMaterial color="var(--accent-purple)" />
                    </mesh>
                    
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  </Canvas>
                  
                  <ModelControls>
                    <ControlButton>Play</ControlButton>
                    <ControlButton>Pause</ControlButton>
                    <ControlButton>Reset</ControlButton>
                    <ControlSlider type="range" min="0" max="100" defaultValue="0" />
                  </ModelControls>
                </ModelContainer>
              ) : (
                <StepsContainer>
                  <StepSection>
                    <SectionTitle>Proper Form Steps</SectionTitle>
                    <StepsList>
                      {selectedExercise.steps.map((step, index) => (
                        <StepItem 
                          key={index}
                          as={motion.li}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <StepNumber>{index + 1}</StepNumber>
                          <StepText>{step}</StepText>
                        </StepItem>
                      ))}
                    </StepsList>
                  </StepSection>
                  
                  <StepSection>
                    <SectionTitle>Common Errors</SectionTitle>
                    <ErrorsList>
                      {selectedExercise.commonErrors.map((error, index) => (
                        <ErrorItem 
                          key={index}
                          as={motion.li}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ErrorIcon>⚠️</ErrorIcon>
                          <ErrorText>{error}</ErrorText>
                        </ErrorItem>
                      ))}
                    </ErrorsList>
                  </StepSection>
                  
                  <StepSection>
                    <SectionTitle>Pro Tips</SectionTitle>
                    <TipsList>
                      {selectedExercise.tips.map((tip, index) => (
                        <TipItem 
                          key={index}
                          as={motion.li}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <TipIcon>💡</TipIcon>
                          <TipText>{tip}</TipText>
                        </TipItem>
                      ))}
                    </TipsList>
                  </StepSection>
                </StepsContainer>
              )}
            </>
          ) : (
            <EmptyState>
              <EmptyIcon>👈</EmptyIcon>
              <EmptyText>Select an exercise from the list to view its form guide</EmptyText>
            </EmptyState>
          )}
        </GuideDisplay>
      </GuideContent>
    </GuideContainer>
  );
};

const GuideContainer = styled.div`
  padding: 1rem;
`;

const GuideHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.75rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
  }
  
  h3 {
    font-size: 1.5rem;
    margin: 0;
    color: var(--text-light);
  }
  
  p {
    color: var(--text-secondary);
    margin: 0;
  }
`;

const GuideContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExerciseList = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ListHeader = styled.div`
  background-color: var(--secondary-dark);
  color: var(--text-light);
  padding: 1rem;
  font-weight: 600;
  font-size: 1rem;
`;

const ExerciseItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--secondary-dark);
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${props => props.selected ? 'var(--secondary-dark)' : 'transparent'};
  color: ${props => props.selected ? 'var(--accent-pink)' : 'var(--text-light)'};
  font-weight: ${props => props.selected ? '600' : '400'};
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--secondary-dark)' : 'rgba(73, 50, 103, 0.5)'};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const GuideDisplay = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-height: 500px;
  display: flex;
  flex-direction: column;
`;

const GuideDescription = styled.p`
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  font-size: 0.9375rem;
  line-height: 1.5;
`;

const ViewToggle = styled.button`
  background-color: var(--secondary-dark);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--accent-purple);
    box-shadow: 0 0 8px var(--accent-purple);
  }
`;

const ModelContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-dark);
  border-radius: 8px;
  overflow: hidden;
  
  canvas {
    flex: 1;
    min-height: 300px;
  }
`;

const ModelControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ControlButton = styled.button`
  background-color: var(--accent-purple);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--accent-pink);
    box-shadow: 0 0 8px var(--accent-pink);
  }
`;

const ControlSlider = styled.input`
  flex: 1;
  margin-left: 1rem;
  height: 4px;
  -webkit-appearance: none;
  background: var(--primary-dark);
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--accent-pink);
    cursor: pointer;
    box-shadow: 0 0 5px var(--accent-pink);
  }
`;

const StepsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
`;

const StepSection = styled.div``;

const SectionTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: var(--accent-blue);
  font-size: 1.125rem;
  font-weight: 600;
`;

const StepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  background-color: rgba(123, 179, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
`;

const StepNumber = styled.div`
  background-color: var(--accent-blue);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const StepText = styled.div`
  color: var(--text-light);
  font-size: 0.9375rem;
  line-height: 1.5;
`;

const ErrorsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ErrorItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 1rem;
  border-radius: 8px;
`;

const ErrorIcon = styled.div`
  font-size: 1.25rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ErrorText = styled.div`
  color: var(--text-light);
  font-size: 0.9375rem;
  line-height: 1.5;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  background-color: rgba(232, 106, 240, 0.1);
  padding: 1rem;
  border-radius: 8px;
`;

const TipIcon = styled.div`
  font-size: 1.25rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const TipText = styled.div`
  color: var(--text-light);
  font-size: 0.9375rem;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  text-align: center;
  padding: 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.div`
  font-size: 1.125rem;
`;

export default FormGuideViewer;