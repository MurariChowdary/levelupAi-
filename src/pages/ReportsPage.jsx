import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WorkoutStatsChart from '../components/WorkoutStatsChart';
import NutritionStatsChart from '../components/NutritionStatsChart';
import ProgressOverview from '../components/ProgressOverview';
import AchievementsList from '../components/AchievementsList';
import ProgressTunnel3D from '../components/3DProgressTunnel';
import StatsGlobe3D from '../components/3DStatsGlobe';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Define tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'workouts', label: 'Workouts', icon: '🏋️' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' }
  ];
  
  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <ProgressTunnel3D progress={78} title="Overall Fitness Progress" />
            <ProgressOverview />
          </>
        );
      case 'workouts':
        return (
          <>
            <StatsGlobe3D 
              stats={[
                { label: 'Workouts', value: '156', color: '#8a2be2', position: [0, 2, 0] },
                { label: 'Sets', value: '2.1k', color: '#e86af0', position: [1.5, 1, 1] },
                { label: 'Reps', value: '18k', color: '#7bb3ff', position: [-1.5, 1, -1] },
                { label: 'Weight', value: '45t', color: '#00d084', position: [0, -1.5, 1.5] }
              ]}
              title="Workout Statistics"
            />
            <WorkoutStatsChart />
          </>
        );
      case 'nutrition':
        return (
          <>
            <StatsGlobe3D 
              stats={[
                { label: 'Calories', value: '2.1k', color: '#e86af0', position: [0, 2, 0] },
                { label: 'Protein', value: '180g', color: '#7bb3ff', position: [1.5, 1, 1] },
                { label: 'Carbs', value: '250g', color: '#8a2be2', position: [-1.5, 1, -1] },
                { label: 'Fat', value: '80g', color: '#ffc107', position: [0, -1.5, 1.5] }
              ]}
              title="Nutrition Overview"
            />
            <NutritionStatsChart />
          </>
        );
      case 'achievements':
        return <AchievementsList />;
      default:
        return (
          <>
            <ProgressTunnel3D progress={78} title="Overall Fitness Progress" />
            <ProgressOverview />
          </>
        );
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Reports & Analytics</PageTitle>
        <PageDescription>
          Track your progress, analyze your performance, and celebrate your achievements.
        </PageDescription>
      </PageHeader>
      
      <TabsContainer>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            as={motion.button}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <TabIcon>{tab.icon}</TabIcon>
            <TabLabel>{tab.label}</TabLabel>
          </TabButton>
        ))}
      </TabsContainer>
      
      <TabContent
        as={motion.div}
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </TabContent>
      
      <FeatureLockedSection>
        <LockedFeatureCard
          as={motion.div}
          whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}
        >
          <LockedIcon>📈</LockedIcon>
          <LockedContent>
            <LockedTitle>Advanced Analytics</LockedTitle>
            <LockedDescription>
              Unlock detailed performance metrics, trend analysis, and personalized insights to optimize your fitness journey.
            </LockedDescription>
            <UnlockRequirement>Unlocks at Level 30</UnlockRequirement>
          </LockedContent>
        </LockedFeatureCard>
        
        <LockedFeatureCard
          as={motion.div}
          whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}
        >
          <LockedIcon>🔄</LockedIcon>
          <LockedContent>
            <LockedTitle>Progress Comparison</LockedTitle>
            <LockedDescription>
              Compare your current performance with past periods to visualize your improvement over time.
            </LockedDescription>
            <UnlockRequirement>Unlocks at Level 35</UnlockRequirement>
          </LockedContent>
        </LockedFeatureCard>
        
        <LockedFeatureCard
          as={motion.div}
          whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}
        >
          <LockedIcon>📱</LockedIcon>
          <LockedContent>
            <LockedTitle>Export & Share</LockedTitle>
            <LockedDescription>
              Export your stats as PDF reports or share your achievements on social media platforms.
            </LockedDescription>
            <UnlockRequirement>Unlocks at Level 40</UnlockRequirement>
          </LockedContent>
        </LockedFeatureCard>
      </FeatureLockedSection>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-light);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 4px;
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

const TabButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? 'var(--accent-purple)' : 'var(--secondary-dark)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 8px;
  padding: 1rem;
  min-width: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-purple)' : 'rgba(158, 55, 159, 0.2)'};
    color: ${props => props.active ? 'white' : 'var(--text-light)'};
  }
`;

const TabIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TabLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const TabContent = styled.div`
  margin-bottom: 2rem;
`;

const FeatureLockedSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LockedFeatureCard = styled.div`
  display: flex;
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  gap: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid var(--secondary-dark);
`;

const LockedIcon = styled.div`
  font-size: 2rem;
  opacity: 0.7;
`;

const LockedContent = styled.div`
  flex: 1;
`;

const LockedTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-light);
`;

const LockedDescription = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
`;

const UnlockRequirement = styled.div`
  font-size: 0.75rem;
  color: var(--accent-yellow);
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 215, 0, 0.1);
  border-radius: 4px;
  display: inline-block;
`;

export default ReportsPage;