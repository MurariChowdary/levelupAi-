import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TodaysWorkout = () => {
  // Mock workout data
  const [workout, setWorkout] = useState({
    title: "Chest & Triceps",
    exercises: [
      { 
        id: 1, 
        name: "Bench Press", 
        sets: [
          { weight: 135, reps: 12, completed: true },
          { weight: 155, reps: 10, completed: true },
          { weight: 175, reps: 8, completed: false },
          { weight: 185, reps: 6, completed: false }
        ],
        restTime: 90,
        notes: "Focus on full range of motion"
      },
      { 
        id: 2, 
        name: "Incline Dumbbell Press", 
        sets: [
          { weight: 50, reps: 12, completed: true },
          { weight: 55, reps: 10, completed: false },
          { weight: 60, reps: 8, completed: false }
        ],
        restTime: 60,
        notes: ""
      },
      { 
        id: 3, 
        name: "Cable Flyes", 
        sets: [
          { weight: 30, reps: 15, completed: false },
          { weight: 35, reps: 12, completed: false },
          { weight: 40, reps: 10, completed: false }
        ],
        restTime: 60,
        notes: "Squeeze at the top of the movement"
      },
      { 
        id: 4, 
        name: "Tricep Pushdowns", 
        sets: [
          { weight: 50, reps: 15, completed: false },
          { weight: 60, reps: 12, completed: false },
          { weight: 70, reps: 10, completed: false }
        ],
        restTime: 45,
        notes: ""
      },
      { 
        id: 5, 
        name: "Skull Crushers", 
        sets: [
          { weight: 60, reps: 12, completed: false },
          { weight: 70, reps: 10, completed: false },
          { weight: 80, reps: 8, completed: false }
        ],
        restTime: 60,
        notes: "Keep elbows tucked in"
      }
    ],
    duration: 60, // minutes
    difficulty: "Intermediate",
    targetCalories: 450
  });

  // Toggle set completion
  const toggleSetCompletion = (exerciseId, setIndex) => {
    setWorkout(prevWorkout => {
      const updatedExercises = prevWorkout.exercises.map(exercise => {
        if (exercise.id === exerciseId) {
          const updatedSets = [...exercise.sets];
          updatedSets[setIndex] = {
            ...updatedSets[setIndex],
            completed: !updatedSets[setIndex].completed
          };
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
      return { ...prevWorkout, exercises: updatedExercises };
    });
  };

  // Calculate workout progress
  const calculateProgress = () => {
    let totalSets = 0;
    let completedSets = 0;

    workout.exercises.forEach(exercise => {
      totalSets += exercise.sets.length;
      completedSets += exercise.sets.filter(set => set.completed).length;
    });

    return (completedSets / totalSets) * 100;
  };

  const progress = calculateProgress();

  return (
    <WorkoutContainer>
      <WorkoutHeader>
        <WorkoutTitle>{workout.title}</WorkoutTitle>
        <WorkoutMeta>
          <MetaItem>
            <MetaIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
              </svg>
            </MetaIcon>
            <span>{workout.duration} min</span>
          </MetaItem>
          <MetaItem>
            <MetaIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
              </svg>
            </MetaIcon>
            <span>{workout.difficulty}</span>
          </MetaItem>
          <MetaItem>
            <MetaIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
              </svg>
            </MetaIcon>
            <span>{workout.targetCalories} cal</span>
          </MetaItem>
        </WorkoutMeta>
      </WorkoutHeader>

      <ProgressContainer>
        <ProgressText>{Math.round(progress)}% Complete</ProgressText>
        <ProgressBarContainer>
          <ProgressBar 
            as={motion.div}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </ProgressBarContainer>
      </ProgressContainer>

      <ExerciseList>
        {workout.exercises.map((exercise, exerciseIndex) => (
          <ExerciseCard 
            key={exercise.id}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: exerciseIndex * 0.1 }}
          >
            <ExerciseHeader>
              <ExerciseName>{exercise.name}</ExerciseName>
              <ExerciseRest>{exercise.restTime}s rest</ExerciseRest>
            </ExerciseHeader>

            {exercise.notes && (
              <ExerciseNotes>{exercise.notes}</ExerciseNotes>
            )}

            <SetsContainer>
              <SetsHeader>
                <SetLabel>SET</SetLabel>
                <SetLabel>WEIGHT</SetLabel>
                <SetLabel>REPS</SetLabel>
                <SetLabel>DONE</SetLabel>
              </SetsHeader>

              {exercise.sets.map((set, setIndex) => (
                <SetRow key={setIndex}>
                  <SetNumber>{setIndex + 1}</SetNumber>
                  <SetWeight>{set.weight} lbs</SetWeight>
                  <SetReps>{set.reps}</SetReps>
                  <SetCheckbox 
                    completed={set.completed}
                    onClick={() => toggleSetCompletion(exercise.id, setIndex)}
                    as={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {set.completed && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
                      </svg>
                    )}
                  </SetCheckbox>
                </SetRow>
              ))}
            </SetsContainer>
          </ExerciseCard>
        ))}
      </ExerciseList>

      <ActionButtons>
        <ActionButton 
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          color="var(--accent-blue)"
        >
          Save Progress
        </ActionButton>
        <ActionButton 
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          color="var(--accent-pink)"
        >
          Complete Workout
        </ActionButton>
      </ActionButtons>
    </WorkoutContainer>
  );
};

const WorkoutContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const WorkoutHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const WorkoutTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--text-light);
  font-weight: 600;
`;

const WorkoutMeta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const MetaIcon = styled.div`
  margin-right: 0.25rem;
  display: flex;
  align-items: center;
  color: var(--accent-blue);
`;

const ProgressContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  height: 8px;
  background-color: var(--primary-dark);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
  border-radius: 4px;
  box-shadow: 0 0 8px var(--accent-purple);
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ExerciseCard = styled.div`
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ExerciseName = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-light);
`;

const ExerciseRest = styled.div`
  font-size: 0.75rem;
  color: var(--accent-blue);
  background-color: rgba(123, 179, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const ExerciseNotes = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  font-style: italic;
  padding-left: 0.5rem;
  border-left: 2px solid var(--accent-purple);
`;

const SetsContainer = styled.div`
  margin-top: 0.75rem;
`;

const SetsHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
`;

const SetLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const SetRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  padding: 0.5rem 0;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SetNumber = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const SetWeight = styled.div`
  font-size: 0.875rem;
  color: var(--text-light);
`;

const SetReps = styled.div`
  font-size: 0.875rem;
  color: var(--text-light);
`;

const SetCheckbox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${props => props.completed ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  box-shadow: ${props => props.completed ? '0 0 8px var(--accent-purple)' : 'none'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.completed ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: ${props => props.color || 'var(--accent-purple)'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 0 10px ${props => props.color || 'var(--accent-purple)'};
  }
`;

export default TodaysWorkout;