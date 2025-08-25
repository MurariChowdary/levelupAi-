import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WorkoutPlanCalendar from '../components/WorkoutPlanCalendar';
import TodaysWorkout from '../components/TodaysWorkout';
import ExerciseLogger from '../components/ExerciseLogger';
import MuscleGroupSelector from '../components/MuscleGroupSelector';
import WorkoutTimer from '../components/WorkoutTimer';
import CustomWorkoutBuilder from '../components/CustomWorkoutBuilder';

const TrainingPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  
  const tabs = [
    { id: 'today', label: 'Today\'s Workout' },
    { id: 'plan', label: 'Workout Plan' },
    { id: 'log', label: 'Exercise Log' },
    { id: 'muscles', label: 'Muscle Groups' },
    { id: 'custom', label: 'Custom Workouts' }
  ];
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Training</PageTitle>
        <PageDescription>Track your workouts and progress</PageDescription>
      </PageHeader>
      
      <TabsContainer>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            as={motion.button}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsContainer>
      
      <ContentContainer>
        {activeTab === 'today' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TodaysWorkout />
            <WorkoutTimer />
          </TabContent>
        )}
        
        {activeTab === 'plan' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WorkoutPlanCalendar />
          </TabContent>
        )}
        
        {activeTab === 'log' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ExerciseLogger />
          </TabContent>
        )}
        
        {activeTab === 'muscles' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MuscleGroupSelector />
          </TabContent>
        )}
        
        {activeTab === 'custom' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CustomWorkoutBuilder />
          </TabContent>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-light);
  margin: 0 0 0.5rem 0;
`;

const PageDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  background-color: ${props => props.active ? 'var(--accent-purple)' : 'var(--primary-dark)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 0 10px var(--accent-purple)' : '0 2px 4px rgba(0, 0, 0, 0.2)'};
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-purple)' : 'var(--secondary-dark)'};
  }
`;

const ContentContainer = styled.div`
  min-height: 500px;
`;

const TabContent = styled.div`
  
`;

export default TrainingPage;