import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';
import LevelOrb3D from './3DLevelOrb';

const LevelProgressCircle = () => {
  const { 
    level, 
    xp, 
    xpToNextLevel, 
    rank,
    getXpProgressPercentage,
    getCurrentRankData
  } = useUserLevel();
  
  const progressPercentage = getXpProgressPercentage();
  const rankData = getCurrentRankData();
  
  // Calculate circle properties
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progressPercentage / 100) * circumference;
  
  return (
    <CircleContainer>
      <Orb3DContainer>
        <LevelOrb3D />
      </Orb3DContainer>
      
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--primary-dark)"
          strokeWidth="10"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={getRankColor(rank)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
        />
        
        {/* Glow effect */}
        {progressPercentage > 0 && (
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={getRankColor(rank)}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference, opacity: 0 }}
            animate={{ 
              strokeDashoffset: dashOffset, 
              opacity: [0, 0.5, 0] 
            }}
            transition={{ 
              duration: 2, 
              ease: "easeOut", 
              repeat: Infinity,
              repeatType: "loop" 
            }}
            style={{ 
              transformOrigin: 'center', 
              transform: 'rotate(-90deg)',
              filter: `drop-shadow(0 0 5px ${getRankColor(rank)})` 
            }}
          />
        )}
      </svg>
      
      <CircleContent>
        <LevelDisplay>{level}</LevelDisplay>
        <XpText>{xp} / {xpToNextLevel} XP</XpText>
      </CircleContent>
      
      <RankLabel rank={rank}>{rank}</RankLabel>
    </CircleContainer>
  );
};

// Helper function to get color based on rank
const getRankColor = (rank) => {
  switch (rank) {
    case 'NOVICE': return '#888888';
    case 'APPRENTICE': return '#4CAF50';
    case 'ADEPT': return 'var(--accent-blue)';
    case 'EXPERT': return 'var(--accent-purple)';
    case 'MASTER': return 'var(--accent-pink)';
    case 'LEGENDARY': return 'url(#legendaryGradient)';
    default: return 'var(--accent-blue)';
  }
};

const CircleContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  
  svg {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    position: relative;
    z-index: 2;
  }
`;

const Orb3DContainer = styled.div`
  position: absolute;
  top: -90px;
  left: -90px;
  width: 300px;
  height: 300px;
  z-index: 1;
  opacity: 0.8;
`;

const CircleContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const LevelDisplay = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-light);
  line-height: 1;
  margin-bottom: 0.25rem;
`;

const XpText = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const RankLabel = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => {
    switch (props.rank) {
      case 'NOVICE': return 'rgba(136, 136, 136, 0.8)';
      case 'APPRENTICE': return 'rgba(76, 175, 80, 0.8)';
      case 'ADEPT': return 'rgba(33, 150, 243, 0.8)';
      case 'EXPERT': return 'rgba(156, 39, 176, 0.8)';
      case 'MASTER': return 'rgba(233, 30, 99, 0.8)';
      case 'LEGENDARY': return 'linear-gradient(to right, rgba(255, 0, 0, 0.8), rgba(255, 165, 0, 0.8), rgba(255, 255, 0, 0.8), rgba(0, 128, 0, 0.8), rgba(0, 0, 255, 0.8), rgba(75, 0, 130, 0.8), rgba(238, 130, 238, 0.8))';
      default: return 'rgba(136, 136, 136, 0.8)';
    }
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: ${props => props.rank === 'LEGENDARY' ? '0 0 10px rgba(255, 215, 0, 0.7)' : 'none'};
  animation: ${props => props.rank === 'LEGENDARY' ? 'glow 2s infinite' : 'none'};
`;

export default LevelProgressCircle;