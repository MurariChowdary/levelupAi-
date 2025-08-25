import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';

const UserStatusHeader = () => {
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
  
  return (
    <HeaderContainer>
      <UserInfo>
        <UserAvatar>
          <AvatarImage src="/src/assets/avatar-placeholder.png" alt="User Avatar" />
          <LevelBadge>
            {level}
          </LevelBadge>
        </UserAvatar>
        
        <UserDetails>
          <UserName>Hunter</UserName>
          <RankBadge rank={rank}>
            {rank}
          </RankBadge>
        </UserDetails>
      </UserInfo>
      
      <XpProgressContainer>
        <XpProgressBar>
          <XpProgressFill 
            as={motion.div}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1 }}
            rank={rank}
          />
        </XpProgressBar>
        <XpText>
          XP: {xp} / {xpToNextLevel}
        </XpText>
      </XpProgressContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const UserAvatar = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 1rem;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-purple);
  background-color: var(--primary-dark); /* Fallback if image doesn't load */
`;

const LevelBadge = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: var(--accent-pink);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
  color: var(--text-light);
`;

const RankBadge = styled.div`
  display: inline-block;
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
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: ${props => props.rank === 'LEGENDARY' ? '0 0 10px rgba(255, 215, 0, 0.7)' : 'none'};
  animation: ${props => props.rank === 'LEGENDARY' ? 'glow 2s infinite' : 'none'};
`;

const XpProgressContainer = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 60%;
  }
`;

const XpProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--primary-dark);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const XpProgressFill = styled.div`
  height: 100%;
  background: ${props => {
    switch (props.rank) {
      case 'NOVICE': return 'var(--accent-blue)';
      case 'APPRENTICE': return '#4CAF50';
      case 'ADEPT': return 'var(--accent-blue)';
      case 'EXPERT': return 'var(--accent-purple)';
      case 'MASTER': return 'var(--accent-pink)';
      case 'LEGENDARY': return 'linear-gradient(to right, #FF0000, #FFA500, #FFFF00, #008000, #0000FF, #4B0082, #EE82EE)';
      default: return 'var(--accent-blue)';
    }
  }};
  box-shadow: ${props => props.rank === 'LEGENDARY' ? '0 0 10px rgba(255, 215, 0, 0.7)' : '0 0 5px rgba(123, 179, 255, 0.7)'};
`;

const XpText = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: right;
`;

export default UserStatusHeader;