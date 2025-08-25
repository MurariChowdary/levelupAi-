import React from 'react';
import styled from 'styled-components';

const ResponsiveLayout = ({ children, maxWidth = '1200px', padding = '1rem' }) => {
  return (
    <Container maxWidth={maxWidth} padding={padding}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth};
  margin: 0 auto;
  padding: ${props => props.padding};
  
  @media (max-width: 768px) {
    padding: calc(${props => props.padding} / 2);
  }
`;

// Grid components for responsive layouts
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap || '1rem'};
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.mobileColumns || 1}, 1fr);
    gap: ${props => props.mobileGap || props.gap || '1rem'};
  }
`;

export const GridItem = styled.div`
  grid-column: span ${props => props.span || 12};
  
  @media (max-width: 768px) {
    grid-column: span ${props => props.mobileSpan || props.span || 12};
  }
`;

// Flex components for responsive layouts
export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => props.gap || '0'};
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
    gap: ${props => props.mobileGap || props.gap || '0'};
  }
`;

export const FlexItem = styled.div`
  flex: ${props => props.flex || '0 1 auto'};
  
  @media (max-width: 768px) {
    flex: ${props => props.mobileFlex || props.flex || '0 1 auto'};
  }
`;

// Spacing components
export const Spacer = styled.div`
  height: ${props => props.height || '1rem'};
  width: ${props => props.width || '100%'};
  
  @media (max-width: 768px) {
    height: ${props => props.mobileHeight || props.height || '1rem'};
  }
`;

// Responsive visibility components
export const HideOnMobile = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ShowOnMobile = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export default ResponsiveLayout;