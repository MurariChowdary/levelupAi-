import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WorkoutTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  
  // Format time in HH:MM:SS format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };
  
  // Start/resume timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - (elapsedTime * 1000);
      
      intervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
  };
  
  // Pause timer
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };
  
  // Reset timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };
  
  // Record lap
  const recordLap = () => {
    if (isRunning || elapsedTime > 0) {
      const previousLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
      const lapTime = elapsedTime - previousLapTime;
      
      setLaps([...laps, {
        number: laps.length + 1,
        time: lapTime,
        totalTime: elapsedTime
      }]);
    }
  };
  
  // Format lap time
  const formatLapTime = (lapTime) => {
    const minutes = Math.floor(lapTime / 60);
    const seconds = lapTime % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <TimerContainer>
      <TimerHeader>
        <h2>Workout Timer</h2>
        <p>Track your workout duration</p>
      </TimerHeader>
      
      <TimerDisplay>
        <TimeValue>{formatTime(elapsedTime)}</TimeValue>
        <TimerControls>
          {!isRunning ? (
            <TimerButton 
              onClick={startTimer}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              color="var(--accent-blue)"
            >
              {elapsedTime === 0 ? 'Start' : 'Resume'}
            </TimerButton>
          ) : (
            <TimerButton 
              onClick={pauseTimer}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              color="var(--accent-pink)"
            >
              Pause
            </TimerButton>
          )}
          
          <TimerButton 
            onClick={recordLap}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            color="var(--accent-purple)"
            disabled={elapsedTime === 0}
          >
            Lap
          </TimerButton>
          
          <TimerButton 
            onClick={resetTimer}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            color="#607D8B"
            disabled={elapsedTime === 0}
          >
            Reset
          </TimerButton>
        </TimerControls>
      </TimerDisplay>
      
      {laps.length > 0 && (
        <LapsContainer>
          <LapsHeader>
            <LapLabel>Lap</LapLabel>
            <LapLabel>Lap Time</LapLabel>
            <LapLabel>Total Time</LapLabel>
          </LapsHeader>
          
          <LapsList>
            {laps.map((lap, index) => (
              <LapItem 
                key={lap.number}
                as={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                isLatest={index === laps.length - 1}
              >
                <LapNumber>{lap.number}</LapNumber>
                <LapTime>{formatLapTime(lap.time)}</LapTime>
                <LapTotalTime>{formatTime(lap.totalTime)}</LapTotalTime>
              </LapItem>
            ))}
          </LapsList>
        </LapsContainer>
      )}
      
      <TimerFooter>
        <StatsItem>
          <StatsLabel>Avg. Lap</StatsLabel>
          <StatsValue>
            {laps.length > 0 
              ? formatLapTime(Math.floor(elapsedTime / laps.length)) 
              : '--:--'}
          </StatsValue>
        </StatsItem>
        
        <StatsItem>
          <StatsLabel>Calories</StatsLabel>
          <StatsValue>
            {Math.floor(elapsedTime / 60 * 5)}
          </StatsValue>
        </StatsItem>
        
        <StatsItem>
          <StatsLabel>XP Earned</StatsLabel>
          <StatsValue>
            +{Math.floor(elapsedTime / 60 * 2)}
          </StatsValue>
        </StatsItem>
      </TimerFooter>
    </TimerContainer>
  );
};

const TimerContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const TimerHeader = styled.div`
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

const TimerDisplay = styled.div`
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TimeValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-light);
  font-variant-numeric: tabular-nums;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px var(--accent-purple);
  letter-spacing: 2px;
`;

const TimerControls = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const TimerButton = styled.button`
  background-color: ${props => props.color || 'var(--accent-purple)'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 0 10px ${props => props.color || 'var(--accent-purple)'};
  }
`;

const LapsContainer = styled.div`
  background-color: var(--primary-dark);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const LapsHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
`;

const LapLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const LapsList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const LapItem = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr;
  padding: 0.75rem 0.5rem;
  border-radius: 4px;
  align-items: center;
  background-color: ${props => props.isLatest ? 'rgba(158, 55, 159, 0.1)' : 'transparent'};
  border-left: ${props => props.isLatest ? '3px solid var(--accent-purple)' : 'none'};
  margin-bottom: 0.25rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const LapNumber = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const LapTime = styled.div`
  font-size: 0.875rem;
  color: var(--text-light);
  font-variant-numeric: tabular-nums;
`;

const LapTotalTime = styled.div`
  font-size: 0.875rem;
  color: var(--text-light);
  font-variant-numeric: tabular-nums;
`;

const TimerFooter = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatsItem = styled.div`
  text-align: center;
`;

const StatsLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const StatsValue = styled.div`
  font-size: 1.125rem;
  color: var(--text-light);
  font-weight: 500;
`;

export default WorkoutTimer;