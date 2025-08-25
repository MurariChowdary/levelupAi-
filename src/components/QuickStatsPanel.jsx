import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card3D from './3DCard';
import StatsGlobe3D from './3DStatsGlobe';

const QuickStatsPanel = () => {
  // Mock data for demonstration
  const todayStats = {
    workoutsCompleted: 1,
    caloriesBurned: 320,
    stepsCount: 8450,
    waterIntake: 5, // in cups
    proteinConsumed: 120, // in grams
    activeMinutes: 45
  };
  
  const statItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Workouts',
      value: todayStats.workoutsCompleted,
      color: 'var(--accent-purple)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Calories',
      value: todayStats.caloriesBurned,
      color: 'var(--accent-pink)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5L5 19M6.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Steps',
      value: todayStats.stepsCount.toLocaleString(),
      color: 'var(--accent-blue)'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Active',
      value: `${todayStats.activeMinutes} min`,
      color: '#4CAF50'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Water',
      value: `${todayStats.waterIntake}/8`,
      color: '#03A9F4'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Protein',
      value: `${todayStats.proteinConsumed}g`,
      color: '#FF9800'
    }
  ];
  
  return (
    <StatsContainer>
      <StatsHeader>
        <h2>Today's Progress</h2>
        <DateDisplay>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</DateDisplay>
      </StatsHeader>
      
      <Globe3DContainer>
        <StatsGlobe3D 
          stats={statItems.map(item => ({
            label: item.label,
            value: item.value,
            color: item.color,
            position: [
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4
            ]
          }))}
          title="Today's Stats"
        />
      </Globe3DContainer>
      
      <StatsGrid>
        {statItems.map((stat, index) => (
          <Card3D
            key={index}
            title={stat.label}
            value={stat.value}
            color={stat.color}
          >
            <StatOverlay>
              <StatIcon color={stat.color}>
                {stat.icon}
              </StatIcon>
            </StatOverlay>
          </Card3D>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

const StatsContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const StatsHeader = styled.div`
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

const DateDisplay = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const Globe3DContainer = styled.div`
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.color || 'var(--accent-purple)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px ${props => props.color || 'var(--accent-purple)'};
  font-size: 1.5rem;
`;

export default QuickStatsPanel;