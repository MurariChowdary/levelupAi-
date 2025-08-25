import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LevelProgressionSystem from '../components/LevelProgressionSystem';

const LevelPage = () => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader>
        <HeaderTitle>Level Progression</HeaderTitle>
        <HeaderSubtitle>Track your fitness journey progress and unlock new features</HeaderSubtitle>
      </PageHeader>
      
      <ContentGrid>
        <MainSection>
          <LevelProgressionSystem />
        </MainSection>
        
        <InfoSection>
          <InfoCard>
            <InfoCardTitle>How Leveling Works</InfoCardTitle>
            <InfoList>
              <InfoItem>
                <InfoIcon>🏋️</InfoIcon>
                <InfoText>Complete workouts to earn XP</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>🎯</InfoIcon>
                <InfoText>Finish daily tasks and missions</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>🏆</InfoIcon>
                <InfoText>Unlock achievements for bonus XP</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>📊</InfoIcon>
                <InfoText>Track your nutrition consistently</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>⭐</InfoIcon>
                <InfoText>Reach new ranks with higher levels</InfoText>
              </InfoItem>
            </InfoList>
          </InfoCard>
          
          <InfoCard>
            <InfoCardTitle>Rank System</InfoCardTitle>
            <RankList>
              <RankItem>
                <RankName style={{ color: 'var(--text-secondary)' }}>Novice</RankName>
                <RankLevel>Levels 1-9</RankLevel>
              </RankItem>
              <RankItem>
                <RankName style={{ color: 'var(--accent-green)' }}>Beginner</RankName>
                <RankLevel>Levels 10-24</RankLevel>
              </RankItem>
              <RankItem>
                <RankName style={{ color: 'var(--accent-blue)' }}>Intermediate</RankName>
                <RankLevel>Levels 25-49</RankLevel>
              </RankItem>
              <RankItem>
                <RankName style={{ color: 'var(--accent-purple)' }}>Advanced</RankName>
                <RankLevel>Levels 50-99</RankLevel>
              </RankItem>
              <RankItem>
                <RankName style={{ 
                  background: 'linear-gradient(90deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}>
                  Elite
                </RankName>
                <RankLevel>Levels 100+</RankLevel>
              </RankItem>
            </RankList>
          </InfoCard>
          
          <InfoCard>
            <InfoCardTitle>Feature Unlocks</InfoCardTitle>
            <FeatureList>
              <FeatureUnlock>
                <FeatureLevel>Level 10</FeatureLevel>
                <FeatureDetails>
                  <FeatureName>Calorie Counter</FeatureName>
                  <FeatureDescription>Track your daily calorie intake</FeatureDescription>
                </FeatureDetails>
              </FeatureUnlock>
              
              <FeatureUnlock>
                <FeatureLevel>Level 25</FeatureLevel>
                <FeatureDetails>
                  <FeatureName>Body Measurements</FeatureName>
                  <FeatureDescription>Record and track body measurements</FeatureDescription>
                </FeatureDetails>
              </FeatureUnlock>
              
              <FeatureUnlock>
                <FeatureLevel>Level 50</FeatureLevel>
                <FeatureDetails>
                  <FeatureName>Custom Workout Builder</FeatureName>
                  <FeatureDescription>Create personalized workout routines</FeatureDescription>
                </FeatureDetails>
              </FeatureUnlock>
              
              <FeatureUnlock>
                <FeatureLevel>Level 100</FeatureLevel>
                <FeatureDetails>
                  <FeatureName>AI Coach Chat</FeatureName>
                  <FeatureDescription>Get personalized AI fitness advice</FeatureDescription>
                </FeatureDetails>
              </FeatureUnlock>
            </FeatureList>
          </InfoCard>
        </InfoSection>
      </ContentGrid>
    </PageContainer>
  );
};

const PageContainer = styled(motion.div)`
  padding: 1.5rem;
  height: 100%;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const HeaderTitle = styled.h1`
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-light);
`;

const HeaderSubtitle = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MainSection = styled.div``;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InfoCardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  color: var(--text-light);
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.span`
  font-size: 1.25rem;
  margin-right: 0.75rem;
  width: 24px;
  text-align: center;
`;

const InfoText = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const RankList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RankItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--secondary-dark);
  
  &:last-child {
    border-bottom: none;
  }
`;

const RankName = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const RankLevel = styled.span`
  font-size: 0.875rem;
  color: var(--text-tertiary);
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureUnlock = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  padding: 0.75rem;
`;

const FeatureLevel = styled.div`
  background-color: var(--accent-purple);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.75rem;
  min-width: 70px;
  text-align: center;
`;

const FeatureDetails = styled.div`
  flex: 1;
`;

const FeatureName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 0.25rem;
`;

const FeatureDescription = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

export default LevelPage;