import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ExerciseLibrary from '../components/ExerciseLibrary';
import VideoTutorials from '../components/VideoTutorials';
import FormGuideViewer from '../components/FormGuideViewer';

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState('exercises');
  
  const tabs = [
    { id: 'exercises', label: 'Exercise Library' },
    { id: 'videos', label: 'Video Tutorials' },
    { id: 'form', label: 'Form Guide' }
  ];
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Learn</PageTitle>
        <PageDescription>Expand your fitness knowledge</PageDescription>
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
        {activeTab === 'exercises' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ExerciseLibrary />
          </TabContent>
        )}
        
        {activeTab === 'videos' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VideoTutorials />
          </TabContent>
        )}
        
        {activeTab === 'form' && (
          <TabContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormGuideViewer />
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

export default LearnPage;