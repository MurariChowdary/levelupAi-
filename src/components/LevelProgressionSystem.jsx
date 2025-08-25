import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { UserLevelContext } from '../context/UserLevelContext';

const LevelProgressionSystem = () => {
  const { 
    level, 
    xp, 
    xpToNextLevel, 
    rank, 
    unlockedFeatures, 
    addXp, 
    getCurrentRankData, 
    getXpProgressPercentage,
    RANKS
  } = useContext(UserLevelContext);
  
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpDetails, setLevelUpDetails] = useState(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockedFeature, setUnlockedFeature] = useState(null);
  
  // Mock function to simulate earning XP
  const earnXp = (amount) => {
    const result = addXp(amount);
    
    if (result.leveledUp) {
      setLevelUpDetails({
        oldLevel: level,
        newLevel: result.newLevel,
        rankChanged: result.rankChanged,
        newRank: result.newRank
      });
      setShowLevelUp(true);
      
      // If new features were unlocked
      if (result.newlyUnlocked && result.newlyUnlocked.length > 0) {
        // Show unlock modal after level up animation
        setTimeout(() => {
          setUnlockedFeature(getFeatureDetails(result.newlyUnlocked[0]));
          setShowUnlockModal(true);
        }, 3000);
      }
    }
  };
  
  // Get feature details for display
  const getFeatureDetails = (featureId) => {
    const featureDetails = {
      'CalorieCounterCard': {
        name: 'Calorie Counter',
        description: 'Track your daily calorie intake with precision and set custom goals.',
        icon: '🔥',
        location: 'Diet Page'
      },
      'BodyMeasurements': {
        name: 'Body Measurements Tracker',
        description: 'Record and visualize changes in your body measurements over time.',
        icon: '📏',
        location: 'Reports Page'
      },
      'CustomWorkoutBuilder': {
        name: 'Custom Workout Builder',
        description: 'Create personalized workout routines tailored to your specific goals.',
        icon: '🏋️',
        location: 'Training Page'
      },
      'MealPlannerGrid': {
        name: 'Meal Planner',
        description: 'Plan your meals for the week with nutritional information and shopping lists.',
        icon: '🍱',
        location: 'Diet Page'
      },
      'ProteinFocusTracker': {
        name: 'Protein Focus Tracker',
        description: 'Advanced protein tracking with amino acid profiles and timing optimization.',
        icon: '🥩',
        location: 'Diet Page'
      },
      'AICoachChat': {
        name: 'AI Coach Chat',
        description: 'Get personalized workout and nutrition advice from an AI fitness coach.',
        icon: '🤖',
        location: 'Learn Page'
      }
    };
    
    return featureDetails[featureId] || {
      name: featureId,
      description: 'A new feature has been unlocked!',
      icon: '🎁',
      location: 'App'
    };
  };
  
  // Close level up modal
  const closeLevelUp = () => {
    setShowLevelUp(false);
    setLevelUpDetails(null);
  };
  
  // Close unlock modal
  const closeUnlockModal = () => {
    setShowUnlockModal(false);
    setUnlockedFeature(null);
  };
  
  // Calculate next rank
  const getNextRank = () => {
    const rankNames = Object.keys(RANKS);
    const currentRankIndex = rankNames.indexOf(rank);
    
    if (currentRankIndex < rankNames.length - 1) {
      const nextRankName = rankNames[currentRankIndex + 1];
      return {
        name: nextRankName,
        level: RANKS[nextRankName].min
      };
    }
    
    return null;
  };
  
  // Get next feature unlock
  const getNextFeatureUnlock = () => {
    const unlockLevels = [10, 25, 50, 100];
    
    for (const unlockLevel of unlockLevels) {
      if (level < unlockLevel) {
        return unlockLevel;
      }
    }
    
    return null;
  };
  
  // Get rank color
  const getRankColor = (rankName) => {
    return RANKS[rankName]?.color || 'gray';
  };
  
  // Get color based on rank
  const getRankColorStyle = (rankName) => {
    const color = getRankColor(rankName);
    
    if (color === 'rainbow') {
      return {
        background: 'linear-gradient(90deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
      };
    }
    
    const colorMap = {
      gray: 'var(--text-secondary)',
      green: 'var(--accent-green)',
      blue: 'var(--accent-blue)',
      purple: 'var(--accent-purple)',
      pink: 'var(--accent-pink)'
    };
    
    return {
      color: colorMap[color] || colorMap.gray
    };
  };
  
  const nextRank = getNextRank();
  const nextFeatureLevel = getNextFeatureUnlock();
  const xpProgress = getXpProgressPercentage();
  const rankData = getCurrentRankData();
  
  return (
    <ProgressContainer>
      <ProgressHeader>
        <LevelDisplay>
          <LevelLabel>Level</LevelLabel>
          <LevelNumber>{level}</LevelNumber>
        </LevelDisplay>
        
        <RankDisplay style={getRankColorStyle(rank)}>
          {rank}
        </RankDisplay>
      </ProgressHeader>
      
      <XpProgressBar>
        <XpFill width={xpProgress} />
        <XpText>{xp} / {xpToNextLevel} XP</XpText>
      </XpProgressBar>
      
      <ProgressInfo>
        {nextRank && (
          <NextMilestone>
            <MilestoneIcon>⭐</MilestoneIcon>
            <MilestoneText>
              Next Rank <strong style={getRankColorStyle(nextRank.name)}>{nextRank.name}</strong> at Level {nextRank.level}
            </MilestoneText>
          </NextMilestone>
        )}
        
        {nextFeatureLevel && (
          <NextMilestone>
            <MilestoneIcon>🎁</MilestoneIcon>
            <MilestoneText>
              New features unlock at Level {nextFeatureLevel}
            </MilestoneText>
          </NextMilestone>
        )}
      </ProgressInfo>
      
      <ActionButtons>
        <XpButton 
          onClick={() => earnXp(10)}
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          +10 XP (Complete Daily Task)
        </XpButton>
        
        <XpButton 
          onClick={() => earnXp(50)}
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          +50 XP (Complete Workout)
        </XpButton>
        
        <XpButton 
          onClick={() => earnXp(100)}
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          +100 XP (Achievement Unlocked)
        </XpButton>
      </ActionButtons>
      
      <UnlockedFeatures>
        <FeaturesTitle>Unlocked Features ({unlockedFeatures.length})</FeaturesTitle>
        <FeaturesList>
          {unlockedFeatures.map((featureId) => {
            const feature = getFeatureDetails(featureId);
            return (
              <FeatureItem key={featureId}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureInfo>
                  <FeatureName>{feature.name}</FeatureName>
                  <FeatureLocation>{feature.location}</FeatureLocation>
                </FeatureInfo>
              </FeatureItem>
            );
          })}
          {unlockedFeatures.length === 0 && (
            <EmptyFeatures>Reach Level 10 to unlock your first feature!</EmptyFeatures>
          )}
        </FeaturesList>
      </UnlockedFeatures>
      
      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && levelUpDetails && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLevelUp}
          >
            <LevelUpModal
              as={motion.div}
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <LevelUpHeader>
                <LevelUpIcon>🎉</LevelUpIcon>
                <LevelUpTitle>Level Up!</LevelUpTitle>
              </LevelUpHeader>
              
              <LevelUpContent>
                <LevelUpText>
                  You've reached <strong>Level {levelUpDetails.newLevel}</strong>!
                </LevelUpText>
                
                {levelUpDetails.rankChanged && (
                  <RankUpText>
                    New Rank: <RankName style={getRankColorStyle(levelUpDetails.newRank)}>
                      {levelUpDetails.newRank}
                    </RankName>
                  </RankUpText>
                )}
                
                <XpBonus>
                  +100 XP Bonus for Leveling Up!
                </XpBonus>
              </LevelUpContent>
              
              <CloseButton onClick={closeLevelUp}>Continue</CloseButton>
            </LevelUpModal>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      {/* Feature Unlock Modal */}
      <AnimatePresence>
        {showUnlockModal && unlockedFeature && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeUnlockModal}
          >
            <UnlockModal
              as={motion.div}
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <UnlockHeader>
                <UnlockIcon>{unlockedFeature.icon}</UnlockIcon>
                <UnlockTitle>New Feature Unlocked!</UnlockTitle>
              </UnlockHeader>
              
              <UnlockContent>
                <UnlockName>{unlockedFeature.name}</UnlockName>
                <UnlockDescription>{unlockedFeature.description}</UnlockDescription>
                <UnlockLocation>Available in: {unlockedFeature.location}</UnlockLocation>
              </UnlockContent>
              
              <CloseButton onClick={closeUnlockModal}>Check It Out</CloseButton>
            </UnlockModal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const LevelDisplay = styled.div`
  display: flex;
  flex-direction: column;
`;

const LevelLabel = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const LevelNumber = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-light);
`;

const RankDisplay = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  background-color: var(--secondary-dark);
  border-radius: 4px;
`;

const XpProgressBar = styled.div`
  height: 24px;
  background-color: var(--secondary-dark);
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const XpFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
  border-radius: 12px;
  transition: width 0.5s ease;
`;

const XpText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 0.875rem;
  font-weight: 600;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
`;

const ProgressInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const NextMilestone = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const MilestoneIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.25rem;
`;

const MilestoneText = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const XpButton = styled.button`
  background-color: var(--secondary-dark);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 150px;
  
  &:hover {
    background-color: var(--accent-blue);
  }
`;

const UnlockedFeatures = styled.div`
  margin-top: 1rem;
`;

const FeaturesTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
  color: var(--text-light);
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--secondary-dark);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-purple);
    border-radius: 2px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  padding: 0.75rem;
  gap: 0.75rem;
`;

const FeatureIcon = styled.div`
  font-size: 1.25rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-dark);
  border-radius: 50%;
`;

const FeatureInfo = styled.div`
  flex: 1;
`;

const FeatureName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 0.25rem;
`;

const FeatureLocation = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const EmptyFeatures = styled.div`
  font-size: 0.875rem;
  color: var(--text-tertiary);
  font-style: italic;
  padding: 1rem;
  text-align: center;
  background-color: var(--secondary-dark);
  border-radius: 4px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const LevelUpModal = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const LevelUpHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LevelUpIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
`;

const LevelUpTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-light);
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(158, 55, 159, 0.5);
`;

const LevelUpContent = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LevelUpText = styled.p`
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  color: var(--text-light);
  
  strong {
    color: var(--accent-yellow);
  }
`;

const RankUpText = styled.p`
  font-size: 1.125rem;
  margin: 0 0 1rem 0;
  color: var(--text-light);
`;

const RankName = styled.span`
  font-weight: 700;
`;

const XpBonus = styled.div`
  font-size: 1rem;
  color: var(--accent-green);
  font-weight: 600;
  padding: 0.5rem;
  background-color: rgba(0, 255, 0, 0.1);
  border-radius: 4px;
  display: inline-block;
`;

const CloseButton = styled.button`
  background-color: var(--accent-purple);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--accent-blue);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const UnlockModal = styled(LevelUpModal)``;

const UnlockHeader = styled(LevelUpHeader)``;

const UnlockIcon = styled(LevelUpIcon)``;

const UnlockTitle = styled(LevelUpTitle)`
  background: linear-gradient(90deg, var(--accent-yellow), var(--accent-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const UnlockContent = styled(LevelUpContent)``;

const UnlockName = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: var(--accent-yellow);
`;

const UnlockDescription = styled.p`
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
`;

const UnlockLocation = styled.div`
  font-size: 0.875rem;
  color: var(--text-tertiary);
  font-style: italic;
`;

export default LevelProgressionSystem;