import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UserLevelContext } from '../context/UserLevelContext';

const CustomWorkoutBuilder = () => {
  const { userLevel, checkFeatureUnlocked } = useContext(UserLevelContext);
  const isUnlocked = checkFeatureUnlocked('customWorkoutBuilder');
  
  const [workoutName, setWorkoutName] = useState('');
  const [workoutType, setWorkoutType] = useState('strength');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    restTime: '60'
  });
  
  // Workout types
  const workoutTypes = [
    { id: 'strength', name: 'Strength' },
    { id: 'hypertrophy', name: 'Hypertrophy' },
    { id: 'endurance', name: 'Endurance' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'flexibility', name: 'Flexibility' }
  ];
  
  // Difficulty levels
  const difficultyLevels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'expert', name: 'Expert' }
  ];
  
  // Common exercises for suggestions
  const exerciseSuggestions = [
    'Bench Press', 'Squat', 'Deadlift', 'Pull-ups', 'Push-ups',
    'Shoulder Press', 'Bicep Curls', 'Tricep Extensions', 'Leg Press',
    'Lat Pulldown', 'Lunges', 'Dumbbell Rows', 'Chest Flyes', 'Leg Curls',
    'Calf Raises', 'Plank', 'Russian Twists', 'Crunches'
  ];
  
  // Handle adding exercise to workout
  const handleAddExercise = () => {
    if (!currentExercise.name || !currentExercise.sets || !currentExercise.reps) {
      return; // Basic validation
    }
    
    setExercises([...exercises, {
      ...currentExercise,
      id: Date.now()
    }]);
    
    // Reset current exercise form
    setCurrentExercise({
      name: '',
      sets: '',
      reps: '',
      weight: '',
      restTime: '60'
    });
  };
  
  // Handle removing exercise from workout
  const handleRemoveExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };
  
  // Handle saving the workout
  const handleSaveWorkout = () => {
    if (!workoutName || exercises.length === 0) {
      return; // Basic validation
    }
    
    const workout = {
      id: Date.now(),
      name: workoutName,
      type: workoutType,
      difficulty,
      exercises,
      createdAt: new Date().toISOString()
    };
    
    console.log('Saving workout:', workout);
    // Here you would typically save to state/context/backend
    
    // Reset form
    setWorkoutName('');
    setWorkoutType('strength');
    setDifficulty('intermediate');
    setExercises([]);
  };
  
  // If feature is locked, show locked state
  if (!isUnlocked) {
    return (
      <LockedFeatureContainer>
        <LockedContent>
          <LockIcon>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="currentColor"/>
            </svg>
          </LockIcon>
          <LockedTitle>Custom Workout Builder</LockedTitle>
          <LockedDescription>
            Unlock this feature at level 25. You are currently level {userLevel}.
          </LockedDescription>
          <ProgressContainer>
            <ProgressText>{userLevel}/25</ProgressText>
            <ProgressBar width={(userLevel / 25) * 100} />
          </ProgressContainer>
        </LockedContent>
      </LockedFeatureContainer>
    );
  }
  
  return (
    <BuilderContainer>
      <BuilderHeader>
        <h2>Custom Workout Builder</h2>
        <p>Create your own personalized workout routines</p>
      </BuilderHeader>
      
      <FormSection>
        <FormRow>
          <FormGroup>
            <Label>Workout Name</Label>
            <Input 
              type="text" 
              value={workoutName} 
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g. Monday Upper Body"
              required
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label>Workout Type</Label>
            <Select 
              value={workoutType} 
              onChange={(e) => setWorkoutType(e.target.value)}
            >
              {workoutTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Difficulty</Label>
            <Select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {difficultyLevels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>
      </FormSection>
      
      <ExercisesSection>
        <SectionTitle>Exercises</SectionTitle>
        
        <ExerciseForm>
          <FormRow>
            <FormGroup>
              <Label>Exercise Name</Label>
              <Input 
                type="text" 
                value={currentExercise.name} 
                onChange={(e) => setCurrentExercise({...currentExercise, name: e.target.value})}
                placeholder="e.g. Bench Press"
                list="exercise-suggestions"
                required
              />
              <datalist id="exercise-suggestions">
                {exerciseSuggestions.map((ex, index) => (
                  <option key={index} value={ex} />
                ))}
              </datalist>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label>Sets</Label>
              <Input 
                type="number" 
                value={currentExercise.sets} 
                onChange={(e) => setCurrentExercise({...currentExercise, sets: e.target.value})}
                placeholder="e.g. 3"
                min="1"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Reps</Label>
              <Input 
                type="number" 
                value={currentExercise.reps} 
                onChange={(e) => setCurrentExercise({...currentExercise, reps: e.target.value})}
                placeholder="e.g. 10"
                min="1"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Weight (lbs)</Label>
              <Input 
                type="text" 
                value={currentExercise.weight} 
                onChange={(e) => setCurrentExercise({...currentExercise, weight: e.target.value})}
                placeholder="e.g. 135 or Bodyweight"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Rest (seconds)</Label>
              <Input 
                type="number" 
                value={currentExercise.restTime} 
                onChange={(e) => setCurrentExercise({...currentExercise, restTime: e.target.value})}
                placeholder="e.g. 60"
                min="0"
              />
            </FormGroup>
          </FormRow>
          
          <AddExerciseButton 
            onClick={handleAddExercise}
            as={motion.button}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Add Exercise
          </AddExerciseButton>
        </ExerciseForm>
        
        {exercises.length > 0 ? (
          <ExerciseList>
            {exercises.map((exercise, index) => (
              <ExerciseItem 
                key={exercise.id}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExerciseNumber>{index + 1}</ExerciseNumber>
                <ExerciseDetails>
                  <ExerciseName>{exercise.name}</ExerciseName>
                  <ExerciseSpecs>
                    {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight && ` @ ${exercise.weight}`}
                    {exercise.restTime && ` | ${exercise.restTime}s rest`}
                  </ExerciseSpecs>
                </ExerciseDetails>
                <RemoveButton 
                  onClick={() => handleRemoveExercise(exercise.id)}
                  as={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                  </svg>
                </RemoveButton>
              </ExerciseItem>
            ))}
          </ExerciseList>
        ) : (
          <EmptyExercises>
            <EmptyText>No exercises added yet. Add your first exercise above.</EmptyText>
          </EmptyExercises>
        )}
      </ExercisesSection>
      
      <SaveButtonContainer>
        <SaveButton 
          onClick={handleSaveWorkout}
          disabled={!workoutName || exercises.length === 0}
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Workout
        </SaveButton>
      </SaveButtonContainer>
    </BuilderContainer>
  );
};

const BuilderContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const BuilderHeader = styled.div`
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

const FormSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 2px rgba(158, 55, 159, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 2px rgba(158, 55, 159, 0.2);
  }
  
  option {
    background-color: var(--primary-dark);
  }
`;

const ExercisesSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: var(--text-light);
  font-weight: 500;
`;

const ExerciseForm = styled.div`
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AddExerciseButton = styled.button`
  background-color: var(--accent-blue);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  display: block;
  margin-left: auto;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 0 10px var(--accent-blue);
  }
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
  flex-shrink: 0;
`;

const ExerciseDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ExerciseName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 0.25rem;
`;

const ExerciseSpecs = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const RemoveButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;
  flex-shrink: 0;
  
  &:hover {
    background-color: var(--accent-pink);
    color: white;
  }
`;

const EmptyExercises = styled.div`
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 0 10px var(--accent-purple);
  }
`;

const LockedFeatureContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LockedContent = styled.div`
  text-align: center;
  max-width: 300px;
`;

const LockIcon = styled.div`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  opacity: 0.7;
`;

const LockedTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--text-light);
`;

const LockedDescription = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const ProgressContainer = styled.div`
  margin-top: 1rem;
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-align: right;
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: var(--accent-purple);
  border-radius: 3px;
  width: ${props => props.width}%;
  max-width: 100%;
  box-shadow: 0 0 10px var(--accent-purple);
  transition: width 0.5s ease;
`;

export default CustomWorkoutBuilder;