import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({ size = 40, color = 'var(--accent-purple)', thickness = 3, text = 'Loading...' }) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} thickness={thickness} color={color} />
      {text && <SpinnerText>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Spinner = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: ${props => props.thickness}px solid rgba(255, 255, 255, 0.1);
  border-top: ${props => props.thickness}px solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SpinnerText = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export default LoadingSpinner;