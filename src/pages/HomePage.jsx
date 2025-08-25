import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import UserStatusHeader from '../components/UserStatusHeader';
import SungJinWooProfile3D from '../components/SungJinWooProfile3D';
import DailyMissionsBoard from '../components/DailyMissionsBoard';
import QuickStatsPanel from '../components/QuickStatsPanel';
import LevelProgressCircle from '../components/LevelProgressCircle';

const HomePage = () => {
  return (
    <HomeContainer>
      <PageHeader>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hunter's Dashboard
        </motion.h1>
      </PageHeader>
      
      <UserStatusHeader />
      
      <MainContent>
        <LeftColumn>
          <SungJinWooProfile3D />
          <StatsSection>
            <LevelProgressCircle />
            <QuickStatsPanel />
          </StatsSection>
        </LeftColumn>
        
        <RightColumn>
          <DailyMissionsBoard />
        </RightColumn>
      </MainContent>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h1 {
    color: var(--text-light);
    margin: 0;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    
    & > * {
      flex: 1;
    }
  }
  
  @media (min-width: 992px) {
    flex-direction: column;
  }
`;

export default HomePage;