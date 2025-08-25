import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UserLevelContext } from '../context/UserLevelContext';

const ProgressOverview = () => {
  const { level, xp, rank } = useContext(UserLevelContext);
  const [timeRange, setTimeRange] = useState('week');
  
  // Mock data for different time ranges
  const mockData = {
    week: {
      workoutsCompleted: 4,
      workoutGoal: 5,
      xpEarned: 1250,
      caloriesBurned: 1800,
      streakDays: 5,
      longestStreak: 7,
      missionsCompleted: 12,
      missionsTotal: 15,
      achievements: [
        { name: 'Early Bird', description: 'Complete a workout before 8 AM', icon: '🌅', date: '2 days ago' },
        { name: 'Protein Master', description: 'Hit protein goal 3 days in a row', icon: '🥩', date: 'Yesterday' }
      ]
    },
    month: {
      workoutsCompleted: 18,
      workoutGoal: 20,
      xpEarned: 5400,
      caloriesBurned: 7500,
      streakDays: 5,
      longestStreak: 14,
      missionsCompleted: 48,
      missionsTotal: 60,
      achievements: [
        { name: 'Early Bird', description: 'Complete a workout before 8 AM', icon: '🌅', date: '2 days ago' },
        { name: 'Protein Master', description: 'Hit protein goal 3 days in a row', icon: '🥩', date: 'Yesterday' },
        { name: 'Consistency King', description: 'Work out 10 days in a row', icon: '👑', date: '1 week ago' },
        { name: 'Weight Warrior', description: 'Increase strength by 10%', icon: '💪', date: '2 weeks ago' }
      ]
    },
    year: {
      workoutsCompleted: 210,
      workoutGoal: 240,
      xpEarned: 64500,
      caloriesBurned: 89000,
      streakDays: 5,
      longestStreak: 21,
      missionsCompleted: 580,
      missionsTotal: 720,
      achievements: [
        { name: 'Early Bird', description: 'Complete a workout before 8 AM', icon: '🌅', date: '2 days ago' },
        { name: 'Protein Master', description: 'Hit protein goal 3 days in a row', icon: '🥩', date: 'Yesterday' },
        { name: 'Consistency King', description: 'Work out 10 days in a row', icon: '👑', date: '1 week ago' },
        { name: 'Weight Warrior', description: 'Increase strength by 10%', icon: '💪', date: '2 weeks ago' },
        { name: 'Marathon Man', description: 'Complete 200 workouts', icon: '🏃', date: '1 month ago' },
        { name: 'Nutrition Ninja', description: 'Track nutrition for 100 days', icon: '🥗', date: '3 months ago' }
      ]
    }
  };
  
  const currentData = mockData[timeRange];
  
  // Calculate workout completion percentage
  const workoutCompletionPercentage = (currentData.workoutsCompleted / currentData.workoutGoal) * 100;
  
  // Calculate mission completion percentage
  const missionCompletionPercentage = (currentData.missionsCompleted / currentData.missionsTotal) * 100;
  
  return (
    <OverviewContainer>
      <OverviewHeader>
        <OverviewTitle>Progress Overview</OverviewTitle>
        
        <TimeRangeSelector>
          <TimeRangeButton 
            active={timeRange === 'week'} 
            onClick={() => setTimeRange('week')}
          >
            This Week
          </TimeRangeButton>
          <TimeRangeButton 
            active={timeRange === 'month'} 
            onClick={() => setTimeRange('month')}
          >
            This Month
          </TimeRangeButton>
          <TimeRangeButton 
            active={timeRange === 'year'} 
            onClick={() => setTimeRange('year')}
          >
            This Year
          </TimeRangeButton>
        </TimeRangeSelector>
      </OverviewHeader>
      
      <StatsGrid>
        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatIcon color="var(--accent-purple)">🏋️</StatIcon>
          <StatContent>
            <StatValue>{currentData.workoutsCompleted}</StatValue>
            <StatLabel>Workouts Completed</StatLabel>
          </StatContent>
          <ProgressBar percentage={workoutCompletionPercentage} color="var(--accent-purple)" />
          <StatGoal>Goal: {currentData.workoutGoal}</StatGoal>
        </StatCard>
        
        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatIcon color="var(--accent-yellow)">⚡</StatIcon>
          <StatContent>
            <StatValue>{currentData.xpEarned.toLocaleString()}</StatValue>
            <StatLabel>XP Earned</StatLabel>
          </StatContent>
          <StatInfo>Current Level: {level}</StatInfo>
        </StatCard>
        
        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatIcon color="var(--accent-pink)">🔥</StatIcon>
          <StatContent>
            <StatValue>{currentData.caloriesBurned.toLocaleString()}</StatValue>
            <StatLabel>Calories Burned</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <StatIcon color="var(--accent-green)">🔄</StatIcon>
          <StatContent>
            <StatValue>{currentData.streakDays}</StatValue>
            <StatLabel>Current Streak</StatLabel>
          </StatContent>
          <StatInfo>Longest: {currentData.longestStreak} days</StatInfo>
        </StatCard>
        
        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          wide
        >
          <StatIcon color="var(--accent-blue)">🎯</StatIcon>
          <StatContent>
            <StatValue>{currentData.missionsCompleted}</StatValue>
            <StatLabel>Missions Completed</StatLabel>
          </StatContent>
          <ProgressBar percentage={missionCompletionPercentage} color="var(--accent-blue)" />
          <StatGoal>Total: {currentData.missionsTotal}</StatGoal>
        </StatCard>
      </StatsGrid>
      
      <AchievementsSection>
        <SectionTitle>Recent Achievements</SectionTitle>
        <AchievementsList>
          {currentData.achievements.slice(0, 3).map((achievement, index) => (
            <AchievementCard 
              key={index}
              as={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementContent>
                <AchievementName>{achievement.name}</AchievementName>
                <AchievementDescription>{achievement.description}</AchievementDescription>
                <AchievementDate>{achievement.date}</AchievementDate>
              </AchievementContent>
            </AchievementCard>
          ))}
        </AchievementsList>
        {currentData.achievements.length > 3 && (
          <ViewMoreButton>
            View All {currentData.achievements.length} Achievements
          </ViewMoreButton>
        )}
      </AchievementsSection>
      
      <RankSection>
        <SectionTitle>Current Rank</SectionTitle>
        <RankCard>
          <RankBadge rank={rank}>
            {rank.toUpperCase()}
          </RankBadge>
          <RankInfo>
            <RankName>{getRankName(rank)}</RankName>
            <RankDescription>{getRankDescription(rank)}</RankDescription>
            {getNextRank(rank) && (
              <NextRankInfo>
                Next Rank: <strong>{getNextRank(rank).toUpperCase()}</strong> ({getNextRankRequirement(rank)})
              </NextRankInfo>
            )}
          </RankInfo>
        </RankCard>
      </RankSection>
    </OverviewContainer>
  );
};

// Helper functions for rank information
const getRankName = (rank) => {
  const rankNames = {
    'bronze': 'Bronze Warrior',
    'silver': 'Silver Champion',
    'gold': 'Gold Master',
    'platinum': 'Platinum Elite',
    'diamond': 'Diamond Legend'
  };
  return rankNames[rank] || 'Unknown Rank';
};

const getRankDescription = (rank) => {
  const rankDescriptions = {
    'bronze': 'You\'ve begun your fitness journey. Keep pushing to climb the ranks!',
    'silver': 'You\'re showing dedication and consistency in your training.',
    'gold': 'Your commitment to fitness is impressive. You\'re among the top performers!',
    'platinum': 'Elite status achieved. Your discipline and results are exceptional.',
    'diamond': 'Legendary status. You\'ve reached the pinnacle of fitness achievement.'
  };
  return rankDescriptions[rank] || '';
};

const getNextRank = (rank) => {
  const rankProgression = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
  const currentIndex = rankProgression.indexOf(rank);
  return currentIndex < rankProgression.length - 1 ? rankProgression[currentIndex + 1] : null;
};

const getNextRankRequirement = (rank) => {
  const requirements = {
    'bronze': 'Reach Level 10',
    'silver': 'Reach Level 25',
    'gold': 'Reach Level 50',
    'platinum': 'Reach Level 75'
  };
  return requirements[rank] || '';
};

const OverviewContainer = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const OverviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const OverviewTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: var(--text-light);
`;

const TimeRangeSelector = styled.div`
  display: flex;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  overflow: hidden;
`;

const TimeRangeButton = styled.button`
  background-color: ${props => props.active ? 'var(--accent-purple)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-purple)' : 'rgba(158, 55, 159, 0.2)'};
    color: ${props => props.active ? 'white' : 'var(--text-light)'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  grid-column: ${props => props.wide ? 'span 2' : 'span 1'};
  
  @media (max-width: 992px) {
    grid-column: span 1;
  }
`;

const StatIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  opacity: 0.8;
  text-shadow: 0 0 10px ${props => props.color || 'var(--accent-purple)'};
`;

const StatContent = styled.div`
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const StatInfo = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
`;

const StatGoal = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  text-align: right;
`;

const ProgressBar = styled.div`
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => Math.min(props.percentage, 100)}%;
    background-color: ${props => props.color || 'var(--accent-purple)'};
    border-radius: 2px;
    transition: width 0.5s ease;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  margin: 0 0 1rem 0;
  color: var(--text-light);
`;

const AchievementsSection = styled.div`
  margin-bottom: 1.5rem;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AchievementCard = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 0.75rem;
  gap: 1rem;
`;

const AchievementIcon = styled.div`
  font-size: 1.5rem;
  background-color: var(--primary-dark);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AchievementContent = styled.div`
  flex: 1;
`;

const AchievementName = styled.div`
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 0.25rem;
`;

const AchievementDescription = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const AchievementDate = styled.div`
  font-size: 0.75rem;
  color: var(--text-tertiary);
`;

const ViewMoreButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--accent-blue);
  font-size: 0.875rem;
  padding: 0.5rem 0;
  cursor: pointer;
  margin-top: 0.75rem;
  text-align: center;
  width: 100%;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RankSection = styled.div``;

const RankCard = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1rem;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const RankBadge = styled.div`
  background-color: ${props => {
    switch (props.rank) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'platinum': return '#E5E4E2';
      case 'diamond': return '#B9F2FF';
      default: return '#CD7F32';
    }
  }};
  color: ${props => props.rank === 'bronze' || props.rank === 'gold' ? '#000' : '#fff'};
  padding: 1rem 1.5rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: 0 0 15px ${props => {
    switch (props.rank) {
      case 'bronze': return 'rgba(205, 127, 50, 0.5)';
      case 'silver': return 'rgba(192, 192, 192, 0.5)';
      case 'gold': return 'rgba(255, 215, 0, 0.5)';
      case 'platinum': return 'rgba(229, 228, 226, 0.5)';
      case 'diamond': return 'rgba(185, 242, 255, 0.5)';
      default: return 'rgba(205, 127, 50, 0.5)';
    }
  }};
`;

const RankInfo = styled.div`
  flex: 1;
`;

const RankName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const RankDescription = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
`;

const NextRankInfo = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  
  strong {
    color: var(--text-light);
  }
`;

export default ProgressOverview;