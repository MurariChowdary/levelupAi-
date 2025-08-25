import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';

const WaterIntakeTracker = () => {
  const { level, addXp } = useUserLevel();
  const [dailyGoal, setDailyGoal] = useState(2500); // in ml
  const [currentIntake, setCurrentIntake] = useState(0);
  const [intakeHistory, setIntakeHistory] = useState([]);
  const [customAmount, setCustomAmount] = useState(250);
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  // Predefined amounts in ml
  const quickAddAmounts = [100, 250, 500, 750];
  
  // Load mock data on component mount
  useEffect(() => {
    const mockHistory = [
      { id: 1, amount: 250, time: '07:30' },
      { id: 2, amount: 500, time: '10:15' },
      { id: 3, amount: 250, time: '12:45' }
    ];
    
    setIntakeHistory(mockHistory);
    setCurrentIntake(mockHistory.reduce((total, entry) => total + entry.amount, 0));
  }, []);
  
  const handleQuickAdd = (amount) => {
    const newEntry = {
      id: Date.now(),
      amount,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setIntakeHistory(prev => [newEntry, ...prev]);
    setCurrentIntake(prev => prev + amount);
    
    // Add XP for logging water intake
    addXp(2);
    
    // Add bonus XP if daily goal is reached
    if (currentIntake < dailyGoal && currentIntake + amount >= dailyGoal) {
      addXp(15);
    }
  };
  
  const handleCustomAmountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCustomAmount(value);
    }
  };
  
  const handleCustomAmountSubmit = () => {
    handleQuickAdd(customAmount);
    setShowCustomInput(false);
  };
  
  const handleRemoveEntry = (id) => {
    const entryToRemove = intakeHistory.find(entry => entry.id === id);
    if (entryToRemove) {
      setCurrentIntake(prev => prev - entryToRemove.amount);
      setIntakeHistory(prev => prev.filter(entry => entry.id !== id));
    }
  };
  
  const handleGoalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setDailyGoal(value);
    }
  };
  
  // Calculate percentage of goal achieved
  const goalPercentage = Math.min(Math.round((currentIntake / dailyGoal) * 100), 100);
  
  // Calculate water level height for the animation
  const waterLevelHeight = `${Math.min(goalPercentage, 100)}%`;
  
  // Determine status message based on percentage
  const getStatusMessage = () => {
    if (goalPercentage < 25) {
      return 'Dehydrated! Drink more water!';
    } else if (goalPercentage < 50) {
      return 'Getting there! Keep drinking!';
    } else if (goalPercentage < 75) {
      return 'Good progress! Keep it up!';
    } else if (goalPercentage < 100) {
      return 'Almost there! Just a bit more!';
    } else {
      return 'Goal achieved! Well done!';
    }
  };
  
  return (
    <TrackerContainer>
      <TrackerHeader>
        <h2>Water Intake Tracker</h2>
        <p>Stay hydrated, stay healthy</p>
      </TrackerHeader>
      
      <TrackerContent>
        <VisualizationSection>
          <WaterBottleContainer>
            <WaterBottle>
              <WaterLevel 
                height={waterLevelHeight}
                as={motion.div}
                initial={{ height: '0%' }}
                animate={{ height: waterLevelHeight }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <WaterWave />
              </WaterLevel>
              
              <BottleMarkings>
                <BottleMarking position="75%">75%</BottleMarking>
                <BottleMarking position="50%">50%</BottleMarking>
                <BottleMarking position="25%">25%</BottleMarking>
              </BottleMarkings>
            </WaterBottle>
            
            <IntakeInfo>
              <CurrentIntake>{currentIntake} ml</CurrentIntake>
              <IntakeGoal>of {dailyGoal} ml</IntakeGoal>
              <IntakePercentage>{goalPercentage}%</IntakePercentage>
              <StatusMessage>{getStatusMessage()}</StatusMessage>
            </IntakeInfo>
          </WaterBottleContainer>
          
          <GoalSetting>
            <GoalLabel>Daily Goal (ml)</GoalLabel>
            <GoalInputContainer>
              <GoalInput 
                type="number" 
                value={dailyGoal} 
                onChange={handleGoalChange}
                min="500"
                step="100"
              />
              <GoalUnit>ml</GoalUnit>
            </GoalInputContainer>
          </GoalSetting>
        </VisualizationSection>
        
        <LogSection>
          <QuickAddSection>
            <SectionTitle>Quick Add</SectionTitle>
            
            <QuickAddButtons>
              {quickAddAmounts.map(amount => (
                <QuickAddButton 
                  key={amount}
                  onClick={() => handleQuickAdd(amount)}
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +{amount} ml
                </QuickAddButton>
              ))}
              
              {showCustomInput ? (
                <CustomAmountContainer>
                  <CustomAmountInput 
                    type="number" 
                    value={customAmount} 
                    onChange={handleCustomAmountChange}
                    min="10"
                    step="10"
                  />
                  <CustomAmountUnit>ml</CustomAmountUnit>
                  <CustomAmountActions>
                    <CustomAmountButton onClick={handleCustomAmountSubmit}>Add</CustomAmountButton>
                    <CustomAmountButton onClick={() => setShowCustomInput(false)}>Cancel</CustomAmountButton>
                  </CustomAmountActions>
                </CustomAmountContainer>
              ) : (
                <CustomButton 
                  onClick={() => setShowCustomInput(true)}
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Custom
                </CustomButton>
              )}
            </QuickAddButtons>
          </QuickAddSection>
          
          <HistorySection>
            <SectionTitle>Today's Log</SectionTitle>
            
            {intakeHistory.length > 0 ? (
              <HistoryList>
                {intakeHistory.map(entry => (
                  <HistoryItem 
                    key={entry.id}
                    as={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HistoryTime>{entry.time}</HistoryTime>
                    <HistoryAmount>{entry.amount} ml</HistoryAmount>
                    <RemoveButton onClick={() => handleRemoveEntry(entry.id)}>
                      ×
                    </RemoveButton>
                  </HistoryItem>
                ))}
              </HistoryList>
            ) : (
              <EmptyState>No water intake logged today</EmptyState>
            )}
          </HistorySection>
        </LogSection>
      </TrackerContent>
      
      {level < 15 && (
        <LockedFeatureCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <LockedIcon>🔒</LockedIcon>
          <LockedContent>
            <h3>Water Intake Reminders</h3>
            <p>Set custom reminders to stay hydrated throughout the day</p>
            <LockedLevel>Unlocks at Level 15</LockedLevel>
            <ProgressBar>
              <ProgressFill width={(level / 15) * 100} />
            </ProgressBar>
            <ProgressText>{level}/15</ProgressText>
          </LockedContent>
        </LockedFeatureCard>
      )}
    </TrackerContainer>
  );
};

const TrackerContainer = styled.div`
  padding: 1rem;
`;

const TrackerHeader = styled.div`
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

const TrackerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VisualizationSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WaterBottleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const WaterBottle = styled.div`
  width: 120px;
  height: 300px;
  background-color: var(--secondary-dark);
  border-radius: 60px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
`;

const WaterLevel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.height};
  background-color: rgba(123, 179, 255, 0.7);
  transition: height 1s ease-out;
  overflow: hidden;
`;

const WaterWave = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  width: 200%;
  height: 20px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%237bb3ff' fill-opacity='1' d='M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: contain;
  animation: wave 10s linear infinite;
  
  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const BottleMarkings = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BottleMarking = styled.div`
  position: absolute;
  left: 0;
  bottom: ${props => props.position};
  width: 100%;
  text-align: right;
  padding-right: 10px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  
  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    width: 10px;
    height: 1px;
    background-color: var(--text-secondary);
  }
`;

const IntakeInfo = styled.div`
  text-align: center;
`;

const CurrentIntake = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-light);
  line-height: 1;
`;

const IntakeGoal = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const IntakePercentage = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-blue);
  margin-bottom: 0.5rem;
`;

const StatusMessage = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  background-color: var(--secondary-dark);
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

const GoalSetting = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`;

const GoalLabel = styled.label`
  font-size: 0.875rem;
  color: var(--text-secondary);
  flex-shrink: 0;
`;

const GoalInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

const GoalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-right: 3rem;
  background-color: var(--secondary-dark);
  border: 1px solid var(--secondary-dark);
  border-radius: 4px;
  color: var(--text-light);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 2px rgba(123, 179, 255, 0.2);
  }
`;

const GoalUnit = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const LogSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuickAddSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 1.25rem 0;
  color: var(--text-light);
`;

const QuickAddButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const QuickAddButton = styled.button`
  background-color: var(--accent-blue);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(123, 179, 255, 0.3);
  
  &:hover {
    background-color: var(--accent-purple);
    box-shadow: 0 4px 8px rgba(158, 55, 159, 0.3);
  }
`;

const CustomButton = styled(QuickAddButton)`
  background-color: var(--secondary-dark);
  color: var(--text-light);
  box-shadow: none;
  
  &:hover {
    background-color: var(--accent-purple);
    color: white;
  }
`;

const CustomAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--secondary-dark);
  padding: 0.75rem;
  border-radius: 4px;
  width: 100%;
`;

const CustomAmountInput = styled.input`
  padding: 0.5rem;
  background-color: var(--primary-dark);
  border: 1px solid var(--primary-dark);
  border-radius: 4px;
  color: var(--text-light);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 2px rgba(123, 179, 255, 0.2);
  }
`;

const CustomAmountUnit = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const CustomAmountActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CustomAmountButton = styled.button`
  flex: 1;
  background-color: var(--primary-dark);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--accent-blue);
    color: white;
  }
`;

const HistorySection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--secondary-dark);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-blue);
    border-radius: 3px;
  }
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  padding: 0.75rem 1rem;
`;

const HistoryTime = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent-blue);
  margin-right: 1rem;
  background-color: rgba(123, 179, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const HistoryAmount = styled.div`
  flex: 1;
  font-size: 0.875rem;
  color: var(--text-light);
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--accent-pink);
    background-color: rgba(232, 106, 240, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  background-color: var(--secondary-dark);
  border-radius: 4px;
`;

const LockedFeatureCard = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  border: 1px solid var(--secondary-dark);
`;

const LockedIcon = styled.div`
  font-size: 2.5rem;
  background-color: var(--secondary-dark);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LockedContent = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
    font-size: 1.25rem;
  }
  
  p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
`;

const LockedLevel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-pink);
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: var(--secondary-dark);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: var(--accent-pink);
  border-radius: 3px;
`;

const ProgressText = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: right;
`;

export default WaterIntakeTracker;