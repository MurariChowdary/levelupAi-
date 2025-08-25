import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';

const ExerciseLibrary = () => {
  const { level } = useUserLevel();
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [filters, setFilters] = useState({
    muscleGroup: 'all',
    difficulty: 'all',
    equipment: 'all',
  });

  // Mock exercise data
  useEffect(() => {
    const mockExercises = [
      {
        id: 1,
        name: 'Barbell Bench Press',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: 'barbell',
        description: 'Lie on a flat bench and press the barbell upward until your arms are fully extended.',
        imageUrl: '/exercises/bench-press.svg',
        requiredLevel: 1,
      },
      {
        id: 2,
        name: 'Pull-ups',
        muscleGroup: 'back',
        difficulty: 'intermediate',
        equipment: 'bodyweight',
        description: 'Hang from a bar with your palms facing away from you and pull your body up until your chin is over the bar.',
        imageUrl: '/exercises/pull-ups.svg',
        requiredLevel: 1,
      },
      {
        id: 3,
        name: 'Squats',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'bodyweight',
        description: 'Stand with feet shoulder-width apart and lower your body as if sitting in a chair, then return to standing.',
        imageUrl: '/exercises/squats.svg',
        requiredLevel: 1,
      },
      {
        id: 4,
        name: 'Deadlift',
        muscleGroup: 'back',
        difficulty: 'advanced',
        equipment: 'barbell',
        description: 'Lift a barbell from the ground to hip level with a straight back and extended hips.',
        imageUrl: '/exercises/deadlift.svg',
        requiredLevel: 10,
      },
      {
        id: 5,
        name: 'Overhead Press',
        muscleGroup: 'shoulders',
        difficulty: 'intermediate',
        equipment: 'barbell',
        description: 'Press a barbell from shoulder height to overhead with fully extended arms.',
        imageUrl: '/exercises/overhead-press.svg',
        requiredLevel: 5,
      },
      {
        id: 6,
        name: 'Dumbbell Rows',
        muscleGroup: 'back',
        difficulty: 'beginner',
        equipment: 'dumbbell',
        description: 'Bend at the waist with one hand on a bench, and row a dumbbell with the other hand.',
        imageUrl: '/exercises/dumbbell-rows.svg',
        requiredLevel: 1,
      },
      {
        id: 7,
        name: 'Lunges',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'bodyweight',
        description: 'Step forward with one leg and lower your body until both knees are bent at 90 degrees.',
        imageUrl: '/exercises/lunges.svg',
        requiredLevel: 1,
      },
      {
        id: 8,
        name: 'Plank',
        muscleGroup: 'core',
        difficulty: 'beginner',
        equipment: 'bodyweight',
        description: 'Hold a push-up position with your weight on your forearms and toes.',
        imageUrl: '/exercises/plank.svg',
        requiredLevel: 1,
      },
      {
        id: 9,
        name: 'Tricep Dips',
        muscleGroup: 'arms',
        difficulty: 'intermediate',
        equipment: 'bodyweight',
        description: 'Lower and raise your body using your arms on parallel bars or a bench.',
        imageUrl: '/exercises/tricep-dips.svg',
        requiredLevel: 3,
      },
      {
        id: 10,
        name: 'Bicep Curls',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: 'dumbbell',
        description: 'Curl dumbbells from a hanging position to shoulder level while keeping elbows fixed.',
        imageUrl: '/exercises/bicep-curls.svg',
        requiredLevel: 1,
      },
      {
        id: 11,
        name: 'Leg Press',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: 'machine',
        description: 'Push a weighted platform away from you using your legs.',
        imageUrl: '/exercises/leg-press.svg',
        requiredLevel: 8,
      },
      {
        id: 12,
        name: 'Lateral Raises',
        muscleGroup: 'shoulders',
        difficulty: 'beginner',
        equipment: 'dumbbell',
        description: 'Raise dumbbells out to the sides until arms are parallel to the floor.',
        imageUrl: '/exercises/lateral-raises.svg',
        requiredLevel: 2,
      },
      {
        id: 13,
        name: 'Cable Flyes',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: 'cable',
        description: 'Pull cable handles together in front of your chest in an arcing motion.',
        imageUrl: '/exercises/cable-flyes.svg',
        requiredLevel: 12,
      },
      {
        id: 14,
        name: 'Russian Twists',
        muscleGroup: 'core',
        difficulty: 'intermediate',
        equipment: 'bodyweight',
        description: 'Sit on the floor with knees bent and twist your torso from side to side.',
        imageUrl: '/exercises/russian-twists.svg',
        requiredLevel: 4,
      },
      {
        id: 15,
        name: 'Calf Raises',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'bodyweight',
        description: 'Raise your heels off the ground while standing, then lower back down.',
        imageUrl: '/exercises/calf-raises.svg',
        requiredLevel: 1,
      },
    ];

    setExercises(mockExercises);
    setFilteredExercises(mockExercises.filter(ex => ex.requiredLevel <= level));
  }, [level]);

  // Apply filters when they change
  useEffect(() => {
    let result = exercises.filter(ex => ex.requiredLevel <= level);
    
    if (filters.muscleGroup !== 'all') {
      result = result.filter(ex => ex.muscleGroup === filters.muscleGroup);
    }
    
    if (filters.difficulty !== 'all') {
      result = result.filter(ex => ex.difficulty === filters.difficulty);
    }
    
    if (filters.equipment !== 'all') {
      result = result.filter(ex => ex.equipment === filters.equipment);
    }
    
    setFilteredExercises(result);
  }, [filters, exercises, level]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <LibraryContainer>
      <LibraryHeader>
        <h2>Exercise Library</h2>
        <p>Browse and learn proper form for various exercises</p>
      </LibraryHeader>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Muscle Group</FilterLabel>
          <FilterSelect 
            value={filters.muscleGroup}
            onChange={(e) => handleFilterChange('muscleGroup', e.target.value)}
          >
            <option value="all">All Muscle Groups</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Difficulty</FilterLabel>
          <FilterSelect 
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Equipment</FilterLabel>
          <FilterSelect 
            value={filters.equipment}
            onChange={(e) => handleFilterChange('equipment', e.target.value)}
          >
            <option value="all">All Equipment</option>
            <option value="bodyweight">Bodyweight</option>
            <option value="dumbbell">Dumbbell</option>
            <option value="barbell">Barbell</option>
            <option value="cable">Cable</option>
            <option value="machine">Machine</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>

      <ExerciseGrid>
        {filteredExercises.length > 0 ? (
          filteredExercises.map(exercise => (
            <ExerciseCard 
              key={exercise.id}
              as={motion.div}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExerciseImagePlaceholder>
                {/* Replace with actual images when available */}
                <ExerciseIcon muscleGroup={exercise.muscleGroup} />
              </ExerciseImagePlaceholder>
              <ExerciseDetails>
                <ExerciseName>{exercise.name}</ExerciseName>
                <ExerciseTags>
                  <ExerciseTag muscleGroup={exercise.muscleGroup}>
                    {exercise.muscleGroup}
                  </ExerciseTag>
                  <ExerciseTag difficulty={exercise.difficulty}>
                    {exercise.difficulty}
                  </ExerciseTag>
                  <ExerciseTag equipment={exercise.equipment}>
                    {exercise.equipment}
                  </ExerciseTag>
                </ExerciseTags>
                <ExerciseDescription>
                  {exercise.description}
                </ExerciseDescription>
              </ExerciseDetails>
            </ExerciseCard>
          ))
        ) : (
          <NoExercisesMessage>
            No exercises match your current filters or level.
            {level < 10 && (
              <div>Some exercises will unlock as you level up!</div>
            )}
          </NoExercisesMessage>
        )}
      </ExerciseGrid>
    </LibraryContainer>
  );
};

const LibraryContainer = styled.div`
  padding: 1rem;
`;

const LibraryHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.75rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
  }
  
  p {
    color: var(--text-secondary);
    margin: 0;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: var(--primary-dark);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  font-weight: 500;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--secondary-dark);
  background-color: var(--secondary-dark);
  color: var(--text-light);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-purple);
  }
`;

const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ExerciseCard = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const ExerciseImagePlaceholder = styled.div`
  height: 160px;
  background-color: var(--secondary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExerciseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => {
    switch(props.muscleGroup) {
      case 'chest': return 'rgba(232, 106, 240, 0.3)';
      case 'back': return 'rgba(123, 179, 255, 0.3)';
      case 'legs': return 'rgba(158, 55, 159, 0.3)';
      case 'shoulders': return 'rgba(255, 180, 0, 0.3)';
      case 'arms': return 'rgba(0, 200, 83, 0.3)';
      case 'core': return 'rgba(255, 107, 107, 0.3)';
      default: return 'rgba(150, 150, 150, 0.3)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  
  &:after {
    content: '${props => props.muscleGroup?.charAt(0).toUpperCase() || "E"}';
  }
`;

const ExerciseDetails = styled.div`
  padding: 1rem;
`;

const ExerciseName = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  color: var(--text-light);
`;

const ExerciseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const ExerciseTag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  
  ${props => props.muscleGroup && `
    background-color: rgba(232, 106, 240, 0.2);
    color: var(--accent-pink);
  `}
  
  ${props => props.difficulty && `
    background-color: ${props.difficulty === 'beginner' ? 'rgba(0, 200, 83, 0.2)' : 
                      props.difficulty === 'intermediate' ? 'rgba(255, 180, 0, 0.2)' : 
                      'rgba(255, 107, 107, 0.2)'};
    color: ${props.difficulty === 'beginner' ? 'rgb(0, 200, 83)' : 
            props.difficulty === 'intermediate' ? 'rgb(255, 180, 0)' : 
            'rgb(255, 107, 107)'};
  `}
  
  ${props => props.equipment && `
    background-color: rgba(123, 179, 255, 0.2);
    color: var(--accent-blue);
  `}
`;

const ExerciseDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

const NoExercisesMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: var(--primary-dark);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 1.125rem;
  
  div {
    margin-top: 1rem;
    color: var(--accent-pink);
    font-weight: 500;
  }
`;

export default ExerciseLibrary;