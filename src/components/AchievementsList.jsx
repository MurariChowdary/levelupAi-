import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UserLevelContext } from '../context/UserLevelContext';

const AchievementsList = () => {
  const { level } = useContext(UserLevelContext);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock achievements data
  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first workout',
      icon: '🏋️',
      category: 'workout',
      dateEarned: '2023-05-15',
      xpReward: 100,
      unlocked: true
    },
    {
      id: 2,
      name: 'Early Bird',
      description: 'Complete a workout before 8 AM',
      icon: '🌅',
      category: 'workout',
      dateEarned: '2023-05-18',
      xpReward: 150,
      unlocked: true
    },
    {
      id: 3,
      name: 'Protein Master',
      description: 'Hit protein goal 3 days in a row',
      icon: '🥩',
      category: 'nutrition',
      dateEarned: '2023-05-20',
      xpReward: 200,
      unlocked: true
    },
    {
      id: 4,
      name: 'Consistency King',
      description: 'Work out 10 days in a row',
      icon: '👑',
      category: 'streak',
      dateEarned: '2023-06-01',
      xpReward: 300,
      unlocked: true
    },
    {
      id: 5,
      name: 'Weight Warrior',
      description: 'Increase strength by 10%',
      icon: '💪',
      category: 'strength',
      dateEarned: '2023-06-15',
      xpReward: 250,
      unlocked: true
    },
    {
      id: 6,
      name: 'Marathon Man',
      description: 'Complete 200 workouts',
      icon: '🏃',
      category: 'workout',
      dateEarned: '2023-07-10',
      xpReward: 500,
      unlocked: true
    },
    {
      id: 7,
      name: 'Nutrition Ninja',
      description: 'Track nutrition for 100 days',
      icon: '🥗',
      category: 'nutrition',
      dateEarned: '2023-08-05',
      xpReward: 400,
      unlocked: true
    },
    {
      id: 8,
      name: 'Hydration Hero',
      description: 'Hit water intake goal 30 days in a row',
      icon: '💧',
      category: 'nutrition',
      dateEarned: null,
      xpReward: 350,
      unlocked: false,
      progress: 22,
      total: 30
    },
    {
      id: 9,
      name: 'Strength Sage',
      description: 'Bench press 1.5x your body weight',
      icon: '🏆',
      category: 'strength',
      dateEarned: null,
      xpReward: 600,
      unlocked: false,
      progress: 1.2,
      total: 1.5
    },
    {
      id: 10,
      name: 'Legendary Status',
      description: 'Reach level 50',
      icon: '⭐',
      category: 'level',
      dateEarned: null,
      xpReward: 1000,
      unlocked: false,
      progress: level,
      total: 50
    },
    {
      id: 11,
      name: 'Meal Prep Master',
      description: 'Create and follow 10 meal plans',
      icon: '🍱',
      category: 'nutrition',
      dateEarned: null,
      xpReward: 300,
      unlocked: false,
      progress: 4,
      total: 10
    },
    {
      id: 12,
      name: 'Knowledge Seeker',
      description: 'Watch 20 tutorial videos',
      icon: '📚',
      category: 'learning',
      dateEarned: null,
      xpReward: 250,
      unlocked: false,
      progress: 12,
      total: 20
    },
    {
      id: 13,
      name: 'Diamond Rank',
      description: 'Reach Diamond rank',
      icon: '💎',
      category: 'rank',
      dateEarned: null,
      xpReward: 2000,
      unlocked: false,
      requiredLevel: 75
    },
    {
      id: 14,
      name: 'Transformation',
      description: 'Achieve your target weight goal',
      icon: '🔄',
      category: 'body',
      dateEarned: null,
      xpReward: 800,
      unlocked: false,
      progress: 85,
      total: 100
    },
    {
      id: 15,
      name: 'Social Butterfly',
      description: 'Share 5 workouts with friends',
      icon: '🦋',
      category: 'social',
      dateEarned: null,
      xpReward: 200,
      unlocked: false,
      progress: 2,
      total: 5,
      requiredLevel: 20
    }
  ];
  
  // Filter achievements based on selected filter and search query
  const filteredAchievements = achievements.filter(achievement => {
    // Filter by category
    if (filter !== 'all' && achievement.category !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !achievement.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort achievements: unlocked first (by date), then locked (by progress percentage)
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    // First sort by unlock status
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    
    // If both are unlocked, sort by date (most recent first)
    if (a.unlocked && b.unlocked) {
      return new Date(b.dateEarned) - new Date(a.dateEarned);
    }
    
    // If both are locked, sort by progress percentage
    if (!a.unlocked && !b.unlocked) {
      const aProgress = a.progress && a.total ? (a.progress / a.total) : 0;
      const bProgress = b.progress && b.total ? (b.progress / b.total) : 0;
      return bProgress - aProgress;
    }
    
    return 0;
  });
  
  // Calculate statistics
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const unlockedPercentage = (unlockedAchievements / totalAchievements) * 100;
  const totalXpEarned = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.xpReward, 0);
  
  return (
    <AchievementsContainer>
      <AchievementsHeader>
        <AchievementsTitle>Achievements</AchievementsTitle>
        
        <AchievementStats>
          <StatItem>
            <StatValue>{unlockedAchievements}/{totalAchievements}</StatValue>
            <StatLabel>Unlocked</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatValue>{unlockedPercentage.toFixed(0)}%</StatValue>
            <StatLabel>Completion</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatValue>{totalXpEarned.toLocaleString()}</StatValue>
            <StatLabel>XP Earned</StatLabel>
          </StatItem>
        </AchievementStats>
      </AchievementsHeader>
      
      <FiltersContainer>
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search achievements..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        
        <CategoryFilters>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'workout'} 
            onClick={() => setFilter('workout')}
          >
            Workout
          </FilterButton>
          <FilterButton 
            active={filter === 'nutrition'} 
            onClick={() => setFilter('nutrition')}
          >
            Nutrition
          </FilterButton>
          <FilterButton 
            active={filter === 'streak'} 
            onClick={() => setFilter('streak')}
          >
            Streaks
          </FilterButton>
          <FilterButton 
            active={filter === 'strength'} 
            onClick={() => setFilter('strength')}
          >
            Strength
          </FilterButton>
          <FilterButton 
            active={filter === 'level'} 
            onClick={() => setFilter('level')}
          >
            Level
          </FilterButton>
        </CategoryFilters>
      </FiltersContainer>
      
      <AchievementsGrid>
        {sortedAchievements.map((achievement, index) => (
          <AchievementCard 
            key={achievement.id}
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            unlocked={achievement.unlocked}
          >
            <AchievementIconContainer unlocked={achievement.unlocked}>
              <AchievementIcon>{achievement.icon}</AchievementIcon>
            </AchievementIconContainer>
            
            <AchievementContent>
              <AchievementName>{achievement.name}</AchievementName>
              <AchievementDescription>{achievement.description}</AchievementDescription>
              
              {achievement.unlocked ? (
                <AchievementMeta>
                  <AchievementDate>
                    Unlocked: {formatDate(achievement.dateEarned)}
                  </AchievementDate>
                  <AchievementXP>+{achievement.xpReward} XP</AchievementXP>
                </AchievementMeta>
              ) : (
                <AchievementProgress>
                  {achievement.requiredLevel && achievement.requiredLevel > level ? (
                    <LockedMessage>Unlocks at Level {achievement.requiredLevel}</LockedMessage>
                  ) : achievement.progress && achievement.total ? (
                    <>
                      <ProgressBar 
                        percentage={(achievement.progress / achievement.total) * 100} 
                      />
                      <ProgressText>
                        {typeof achievement.progress === 'number' && achievement.progress % 1 !== 0 
                          ? achievement.progress.toFixed(1) 
                          : achievement.progress}
                        /{achievement.total}
                      </ProgressText>
                    </>
                  ) : (
                    <LockedMessage>Locked</LockedMessage>
                  )}
                </AchievementProgress>
              )}
            </AchievementContent>
          </AchievementCard>
        ))}
      </AchievementsGrid>
    </AchievementsContainer>
  );
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const AchievementsContainer = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const AchievementsHeader = styled.div`
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

const AchievementsTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: var(--text-light);
`;

const AchievementStats = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const FiltersContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
`;

const SearchIcon = styled.span`
  margin-right: 0.5rem;
  color: var(--text-secondary);
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: var(--text-light);
  font-size: 0.875rem;
  width: 100%;
  outline: none;
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? 'var(--accent-purple)' : 'var(--secondary-dark)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-purple)' : 'rgba(158, 55, 159, 0.2)'};
    color: ${props => props.active ? 'white' : 'var(--text-light)'};
  }
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled.div`
  display: flex;
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1rem;
  gap: 1rem;
  opacity: ${props => props.unlocked ? 1 : 0.7};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const AchievementIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.unlocked ? 'var(--accent-purple)' : 'var(--primary-dark)'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.unlocked ? '0 0 15px rgba(158, 55, 159, 0.5)' : 'none'};
`;

const AchievementIcon = styled.div`
  font-size: 1.5rem;
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
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
`;

const AchievementMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AchievementDate = styled.div`
  font-size: 0.75rem;
  color: var(--text-tertiary);
`;

const AchievementXP = styled.div`
  font-size: 0.75rem;
  color: var(--accent-yellow);
  font-weight: 600;
`;

const AchievementProgress = styled.div`
  width: 100%;
`;

const ProgressBar = styled.div`
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.5rem;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => Math.min(props.percentage, 100)}%;
    background-color: var(--accent-blue);
    border-radius: 2px;
  }
`;

const ProgressText = styled.div`
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-align: right;
`;

const LockedMessage = styled.div`
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-style: italic;
`;

export default AchievementsList;