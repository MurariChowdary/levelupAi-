import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';

const DailyMissionsBoard = () => {
  const { addXp } = useUserLevel();
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: 'Complete a Workout',
      description: 'Log a full workout session',
      xpReward: 50,
      completed: false,
      type: 'workout',
      difficulty: 2, // 1-3 stars
      streak: 0
    },
    {
      id: 2,
      title: 'Track Your Meals',
      description: 'Log all meals for the day',
      xpReward: 30,
      completed: false,
      type: 'nutrition',
      difficulty: 1,
      streak: 3
    },
    {
      id: 3,
      title: 'Learn a New Exercise',
      description: 'Study one new exercise from the library',
      xpReward: 25,
      completed: false,
      type: 'learning',
      difficulty: 1,
      streak: 0
    },
    {
      id: 4,
      title: 'Hit Protein Goal',
      description: 'Reach your daily protein target',
      xpReward: 40,
      completed: false,
      type: 'nutrition',
      difficulty: 2,
      streak: 1
    },
    {
      id: 5,
      title: 'Heavy Lifting',
      description: 'Complete a strength training session with progressive overload',
      xpReward: 60,
      completed: false,
      type: 'workout',
      difficulty: 3,
      streak: 0
    }
  ]);
  
  const [showCompletionEffect, setShowCompletionEffect] = useState(false);
  const [completedMissionId, setCompletedMissionId] = useState(null);
  
  const handleCompleteMission = (id) => {
    setMissions(prevMissions => {
      return prevMissions.map(mission => {
        if (mission.id === id && !mission.completed) {
          // Calculate XP with streak bonus
          const streakBonus = mission.streak > 0 ? mission.streak * 0.1 : 0;
          const totalXp = Math.floor(mission.xpReward * (1 + streakBonus));
          
          // Add XP to user
          const result = addXp(totalXp);
          
          // Show completion effect
          setCompletedMissionId(id);
          setShowCompletionEffect(true);
          
          // Hide effect after animation
          setTimeout(() => {
            setShowCompletionEffect(false);
          }, 2000);
          
          return {
            ...mission,
            completed: true,
            streak: mission.streak + 1
          };
        }
        return mission;
      });
    });
  };
  
  // Get icon based on mission type
  const getMissionIcon = (type) => {
    switch (type) {
      case 'workout':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'nutrition':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'learning':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };
  
  // Render difficulty stars
  const renderDifficultyStars = (difficulty) => {
    const stars = [];
    for (let i = 0; i < 3; i++) {
      stars.push(
        <Star key={i} filled={i < difficulty}>
          ★
        </Star>
      );
    }
    return <DifficultyIndicator>{stars}</DifficultyIndicator>;
  };
  
  return (
    <BoardContainer>
      <BoardHeader>
        <h2>Daily Missions</h2>
        <MissionCount>{missions.filter(m => m.completed).length} / {missions.length}</MissionCount>
      </BoardHeader>
      
      <MissionsList>
        <AnimatePresence>
          {missions.map(mission => (
            <MissionCard 
              key={mission.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              completed={mission.completed}
            >
              <MissionTypeIcon>{getMissionIcon(mission.type)}</MissionTypeIcon>
              
              <MissionContent>
                <MissionTitle>{mission.title}</MissionTitle>
                <MissionDescription>{mission.description}</MissionDescription>
                
                <MissionFooter>
                  {renderDifficultyStars(mission.difficulty)}
                  
                  {mission.streak > 0 && (
                    <StreakBadge>
                      🔥 {mission.streak} day streak
                    </StreakBadge>
                  )}
                </MissionFooter>
              </MissionContent>
              
              <MissionReward>
                <XpReward>+{mission.xpReward} XP</XpReward>
                
                <CompleteButton 
                  onClick={() => handleCompleteMission(mission.id)}
                  disabled={mission.completed}
                  completed={mission.completed}
                >
                  {mission.completed ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : 'Complete'}
                </CompleteButton>
              </MissionReward>
              
              {showCompletionEffect && completedMissionId === mission.id && (
                <CompletionEffect 
                  as={motion.div}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#E86AF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01l-3-3" stroke="#E86AF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </CompletionEffect>
              )}
            </MissionCard>
          ))}
        </AnimatePresence>
      </MissionsList>
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0;
    color: var(--text-light);
    font-size: 1.5rem;
  }
`;

const MissionCount = styled.div`
  background-color: var(--primary-dark);
  color: var(--text-light);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const MissionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MissionCard = styled.div`
  display: flex;
  background-color: ${props => props.completed ? 'rgba(55, 56, 84, 0.7)' : 'var(--primary-dark)'};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${props => props.completed ? 0.7 : 1};
  transform: ${props => props.completed ? 'scale(0.98)' : 'scale(1)'};
  
  &:hover {
    transform: ${props => props.completed ? 'scale(0.98)' : 'translateY(-5px)'};
    box-shadow: ${props => props.completed ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 8px 16px rgba(0, 0, 0, 0.3)'};
  }
`;

const MissionTypeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--accent-purple);
  border-radius: 8px;
  margin-right: 1rem;
  color: white;
  flex-shrink: 0;
`;

const MissionContent = styled.div`
  flex: 1;
`;

const MissionTitle = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--text-light);
`;

const MissionDescription = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const MissionFooter = styled.div`
  display: flex;
  align-items: center;
`;

const DifficultyIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const Star = styled.span`
  color: ${props => props.filled ? 'var(--accent-pink)' : 'var(--text-secondary)'};
  font-size: 0.875rem;
  margin-right: 2px;
`;

const StreakBadge = styled.div`
  background-color: rgba(232, 106, 240, 0.2);
  color: var(--accent-pink);
  padding: 0.125rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const MissionReward = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: 1rem;
`;

const XpReward = styled.div`
  color: var(--accent-blue);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const CompleteButton = styled.button`
  background-color: ${props => props.completed ? 'var(--accent-blue)' : 'var(--accent-purple)'};
  color: white;
  border: none;
  border-radius: 5px;
  padding: ${props => props.completed ? '0.25rem' : '0.25rem 0.75rem'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${props => props.completed ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${props => props.completed ? '30px' : '80px'};
  
  &:hover {
    background-color: ${props => props.completed ? 'var(--accent-blue)' : 'var(--accent-pink)'};
    transform: ${props => props.completed ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.completed ? 'none' : '0 2px 5px rgba(0, 0, 0, 0.3)'};
  }
  
  &:disabled {
    cursor: default;
  }
`;

const CompletionEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--accent-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
`;

export default DailyMissionsBoard;