import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ExerciseLogger = () => {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [notes, setNotes] = useState('');
  const [loggedExercises, setLoggedExercises] = useState([
    {
      id: 1,
      name: 'Bench Press',
      weight: 185,
      reps: 8,
      sets: 4,
      notes: 'Personal best!',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      name: 'Pull-ups',
      weight: 'Bodyweight',
      reps: 12,
      sets: 3,
      notes: 'Used assistance band on last set',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ]);

  // Common exercises for quick selection
  const commonExercises = [
    'Bench Press',
    'Squat',
    'Deadlift',
    'Pull-ups',
    'Push-ups',
    'Shoulder Press',
    'Bicep Curls',
    'Tricep Extensions',
    'Leg Press',
    'Lat Pulldown'
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!exercise || !reps || !sets) {
      // Basic validation
      return;
    }
    
    const newExercise = {
      id: Date.now(),
      name: exercise,
      weight: weight || 'Bodyweight',
      reps: parseInt(reps),
      sets: parseInt(sets),
      notes,
      timestamp: new Date().toISOString()
    };
    
    setLoggedExercises([newExercise, ...loggedExercises]);
    
    // Reset form
    setExercise('');
    setWeight('');
    setReps('');
    setSets('');
    setNotes('');
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <LoggerContainer>
      <LoggerHeader>
        <h2>Exercise Logger</h2>
        <p>Track your sets, reps, and weights</p>
      </LoggerHeader>
      
      <LogForm onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label>Exercise</Label>
            <Input 
              type="text" 
              value={exercise} 
              onChange={(e) => setExercise(e.target.value)}
              placeholder="e.g. Bench Press"
              list="exercise-suggestions"
              required
            />
            <datalist id="exercise-suggestions">
              {commonExercises.map((ex, index) => (
                <option key={index} value={ex} />
              ))}
            </datalist>
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label>Weight (lbs)</Label>
            <Input 
              type="text" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 135 or Bodyweight"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Reps</Label>
            <Input 
              type="number" 
              value={reps} 
              onChange={(e) => setReps(e.target.value)}
              placeholder="e.g. 10"
              min="1"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Sets</Label>
            <Input 
              type="number" 
              value={sets} 
              onChange={(e) => setSets(e.target.value)}
              placeholder="e.g. 3"
              min="1"
              required
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup fullWidth>
            <Label>Notes</Label>
            <TextArea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes about this exercise..."
              rows="2"
            />
          </FormGroup>
        </FormRow>
        
        <SubmitButton 
          type="submit"
          as={motion.button}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Log Exercise
        </SubmitButton>
      </LogForm>
      
      <RecentLogsSection>
        <SectionTitle>Recent Logs</SectionTitle>
        
        <LogsList>
          {loggedExercises.map((log) => (
            <LogItem 
              key={log.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LogHeader>
                <LogName>{log.name}</LogName>
                <LogTime>{formatTime(log.timestamp)}</LogTime>
              </LogHeader>
              
              <LogDetails>
                <LogDetail>
                  <DetailLabel>Weight:</DetailLabel>
                  <DetailValue>{log.weight}</DetailValue>
                </LogDetail>
                
                <LogDetail>
                  <DetailLabel>Sets:</DetailLabel>
                  <DetailValue>{log.sets}</DetailValue>
                </LogDetail>
                
                <LogDetail>
                  <DetailLabel>Reps:</DetailLabel>
                  <DetailValue>{log.reps}</DetailValue>
                </LogDetail>
              </LogDetails>
              
              {log.notes && (
                <LogNotes>{log.notes}</LogNotes>
              )}
              
              <LogActions>
                <ActionButton 
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  color="var(--accent-blue)"
                >
                  Edit
                </ActionButton>
                
                <ActionButton 
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  color="var(--accent-pink)"
                >
                  Delete
                </ActionButton>
              </LogActions>
            </LogItem>
          ))}
        </LogsList>
      </RecentLogsSection>
    </LoggerContainer>
  );
};

const LoggerContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const LoggerHeader = styled.div`
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

const LogForm = styled.form`
  margin-bottom: 2rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FormGroup = styled.div`
  flex: ${props => props.fullWidth ? 1 : '1 1 0'};
  min-width: ${props => props.fullWidth ? '100%' : '0'};
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
  background-color: var(--primary-dark);
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
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

const SubmitButton = styled.button`
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  display: block;
  margin-left: auto;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 0 10px var(--accent-purple);
  }
`;

const RecentLogsSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: var(--text-light);
  font-weight: 500;
`;

const LogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LogItem = styled.div`
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const LogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const LogName = styled.h4`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-light);
`;

const LogTime = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const LogDetails = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const LogDetail = styled.div`
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-right: 0.25rem;
`;

const DetailValue = styled.span`
  font-size: 0.875rem;
  color: var(--text-light);
  font-weight: 500;
`;

const LogNotes = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  font-style: italic;
  padding-left: 0.5rem;
  border-left: 2px solid var(--accent-purple);
`;

const LogActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background-color: ${props => props.color || 'var(--accent-purple)'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 5px ${props => props.color || 'var(--accent-purple)'};
  }
`;

export default ExerciseLogger;