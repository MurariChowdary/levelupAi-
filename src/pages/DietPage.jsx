import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NutritionTracker from '../components/NutritionTracker';
import MealPlanGenerator from '../components/MealPlanGenerator';
import WaterIntakeTracker from '../components/WaterIntakeTracker';

const DietPage = () => {
  const [activeTab, setActiveTab] = useState('nutrition');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <PageContainer>
      <TabsContainer>
        <TabButton 
          active={activeTab === 'nutrition'} 
          onClick={() => handleTabChange('nutrition')}
          as={motion.button}
          whileHover={{ backgroundColor: 'var(--secondary-dark)' }}
          whileTap={{ scale: 0.95 }}
        >
          <TabIcon>🍽️</TabIcon>
          <TabText>Nutrition</TabText>
        </TabButton>
        
        <TabButton 
          active={activeTab === 'meal-plan'} 
          onClick={() => handleTabChange('meal-plan')}
          as={motion.button}
          whileHover={{ backgroundColor: 'var(--secondary-dark)' }}
          whileTap={{ scale: 0.95 }}
        >
          <TabIcon>📋</TabIcon>
          <TabText>Meal Plans</TabText>
        </TabButton>
        
        <TabButton 
          active={activeTab === 'water'} 
          onClick={() => handleTabChange('water')}
          as={motion.button}
          whileHover={{ backgroundColor: 'var(--secondary-dark)' }}
          whileTap={{ scale: 0.95 }}
        >
          <TabIcon>💧</TabIcon>
          <TabText>Water</TabText>
        </TabButton>
      </TabsContainer>
      
      <TabContent>
        {activeTab === 'nutrition' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NutritionTracker />
          </motion.div>
        )}
        
        {activeTab === 'meal-plan' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MealPlanGenerator />
          </motion.div>
        )}
        
        {activeTab === 'water' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WaterIntakeTracker />
          </motion.div>
        )}
      </TabContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 80px; /* Space for bottom navigation */
`;

const TabsContainer = styled.div`
  display: flex;
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
`;

const TabButton = styled.button`
  flex: 1;
  background-color: ${props => props.active ? 'var(--secondary-dark)' : 'transparent'};
  color: ${props => props.active ? 'var(--text-light)' : 'var(--text-secondary)'};
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  
  &:hover {
    color: var(--text-light);
  }
`;

const TabIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TabText = styled.span`
  white-space: nowrap;
`;

const TabContent = styled.div`
  position: relative;
  min-height: 500px;
`;

export default DietPage;