import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import TrainingPage from './pages/TrainingPage';
import LearnPage from './pages/LearnPage';
import DietPage from './pages/DietPage';
import ReportsPage from './pages/ReportsPage';
import LevelPage from './pages/LevelPage';

// Context
import { UserLevelProvider } from './context/UserLevelContext';

const App = () => {
  const location = useLocation();
  
  return (
    <UserLevelProvider>
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/train" element={<TrainingPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/level" element={<LevelPage />} />
          </Routes>
        </MainContent>
        
        <Navigation>
          <NavItem 
            to="/"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <NavIcon>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          
          <NavItem 
            to="/train"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <NavIcon>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </NavIcon>
            <NavText>Train</NavText>
          </NavItem>
          
          <NavItem 
            to="/learn"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <NavIcon>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </NavIcon>
            <NavText>Learn</NavText>
          </NavItem>
          
          <NavItem 
            to="/diet"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <NavIcon>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </NavIcon>
            <NavText>Diet</NavText>
          </NavItem>
          
          <NavItem 
            to="/reports"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <NavIcon>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </NavIcon>
            <NavText>Reports</NavText>
          </NavItem>
          
          <NavItem 
            to="/level"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <NavIcon>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </NavIcon>
            <NavText>Level</NavText>
          </NavItem>
        </Navigation>
      </AppContainer>
    </UserLevelProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--primary-dark);
  position: relative;
  overflow-y: auto;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  padding-bottom: 80px; /* Space for navigation */
  overflow-y: auto;
  height: calc(100vh - 70px); /* Subtract navigation height */
  
  @media (min-width: 768px) {
    padding: 2rem;
    padding-bottom: 100px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: var(--secondary-dark);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &.active {
    color: var(--accent-pink);
    
    svg {
      filter: drop-shadow(0 0 5px var(--accent-pink));
    }
  }
  
  &:hover {
    color: var(--accent-blue);
    
    svg {
      filter: drop-shadow(0 0 5px var(--accent-blue));
    }
  }
`;

const NavIcon = styled.div`
  margin-bottom: 4px;
`;

const NavText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

export default App;