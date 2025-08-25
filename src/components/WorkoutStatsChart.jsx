import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WorkoutStatsChart = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('workouts');
  
  // Mock data for different time ranges and chart types
  const mockData = {
    workouts: {
      week: [
        { day: 'Mon', value: 1 },
        { day: 'Tue', value: 0 },
        { day: 'Wed', value: 1 },
        { day: 'Thu', value: 0 },
        { day: 'Fri', value: 1 },
        { day: 'Sat', value: 0 },
        { day: 'Sun', value: 1 }
      ],
      month: [
        { day: 'Week 1', value: 4 },
        { day: 'Week 2', value: 3 },
        { day: 'Week 3', value: 5 },
        { day: 'Week 4', value: 4 }
      ],
      year: [
        { day: 'Jan', value: 15 },
        { day: 'Feb', value: 18 },
        { day: 'Mar', value: 20 },
        { day: 'Apr', value: 17 },
        { day: 'May', value: 22 },
        { day: 'Jun', value: 19 },
        { day: 'Jul', value: 21 },
        { day: 'Aug', value: 23 },
        { day: 'Sep', value: 18 },
        { day: 'Oct', value: 20 },
        { day: 'Nov', value: 16 },
        { day: 'Dec', value: 14 }
      ]
    },
    calories: {
      week: [
        { day: 'Mon', value: 350 },
        { day: 'Tue', value: 150 },
        { day: 'Wed', value: 420 },
        { day: 'Thu', value: 180 },
        { day: 'Fri', value: 380 },
        { day: 'Sat', value: 200 },
        { day: 'Sun', value: 300 }
      ],
      month: [
        { day: 'Week 1', value: 1500 },
        { day: 'Week 2', value: 1800 },
        { day: 'Week 3', value: 2100 },
        { day: 'Week 4', value: 1700 }
      ],
      year: [
        { day: 'Jan', value: 6500 },
        { day: 'Feb', value: 7200 },
        { day: 'Mar', value: 8100 },
        { day: 'Apr', value: 7500 },
        { day: 'May', value: 8300 },
        { day: 'Jun', value: 7800 },
        { day: 'Jul', value: 8500 },
        { day: 'Aug', value: 9000 },
        { day: 'Sep', value: 8200 },
        { day: 'Oct', value: 7900 },
        { day: 'Nov', value: 7300 },
        { day: 'Dec', value: 6800 }
      ]
    },
    weight: {
      week: [
        { day: 'Mon', value: 82.5 },
        { day: 'Tue', value: 82.3 },
        { day: 'Wed', value: 82.1 },
        { day: 'Thu', value: 82.0 },
        { day: 'Fri', value: 81.8 },
        { day: 'Sat', value: 81.7 },
        { day: 'Sun', value: 81.5 }
      ],
      month: [
        { day: 'Week 1', value: 83.2 },
        { day: 'Week 2', value: 82.5 },
        { day: 'Week 3', value: 81.9 },
        { day: 'Week 4', value: 81.5 }
      ],
      year: [
        { day: 'Jan', value: 85.0 },
        { day: 'Feb', value: 84.5 },
        { day: 'Mar', value: 84.0 },
        { day: 'Apr', value: 83.5 },
        { day: 'May', value: 83.0 },
        { day: 'Jun', value: 82.5 },
        { day: 'Jul', value: 82.0 },
        { day: 'Aug', value: 81.5 },
        { day: 'Sep', value: 81.0 },
        { day: 'Oct', value: 80.5 },
        { day: 'Nov', value: 80.0 },
        { day: 'Dec', value: 79.5 }
      ]
    },
    strength: {
      week: [
        { day: 'Mon', value: 100 },
        { day: 'Tue', value: 100 },
        { day: 'Wed', value: 105 },
        { day: 'Thu', value: 105 },
        { day: 'Fri', value: 110 },
        { day: 'Sat', value: 110 },
        { day: 'Sun', value: 110 }
      ],
      month: [
        { day: 'Week 1', value: 95 },
        { day: 'Week 2', value: 100 },
        { day: 'Week 3', value: 105 },
        { day: 'Week 4', value: 110 }
      ],
      year: [
        { day: 'Jan', value: 80 },
        { day: 'Feb', value: 85 },
        { day: 'Mar', value: 87 },
        { day: 'Apr', value: 90 },
        { day: 'May', value: 92 },
        { day: 'Jun', value: 95 },
        { day: 'Jul', value: 97 },
        { day: 'Aug', value: 100 },
        { day: 'Sep', value: 103 },
        { day: 'Oct', value: 105 },
        { day: 'Nov', value: 108 },
        { day: 'Dec', value: 110 }
      ]
    }
  };
  
  // Get current data based on selected time range and chart type
  const currentData = mockData[chartType][timeRange];
  
  // Find max value for scaling
  const maxValue = Math.max(...currentData.map(item => item.value));
  
  // Calculate summary statistics
  const calculateSummary = () => {
    const values = currentData.map(item => item.value);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    
    let trend = 0;
    if (values.length > 1) {
      // Simple trend: compare last value to first value
      trend = ((values[values.length - 1] - values[0]) / values[0]) * 100;
    }
    
    return {
      total: total.toFixed(chartType === 'weight' ? 1 : 0),
      average: average.toFixed(chartType === 'weight' ? 1 : 0),
      trend: trend.toFixed(1)
    };
  };
  
  const summary = calculateSummary();
  
  // Get appropriate unit based on chart type
  const getUnit = () => {
    switch (chartType) {
      case 'workouts': return '';
      case 'calories': return 'kcal';
      case 'weight': return 'kg';
      case 'strength': return 'kg';
      default: return '';
    }
  };
  
  // Get appropriate label based on chart type
  const getLabel = () => {
    switch (chartType) {
      case 'workouts': return 'Workouts';
      case 'calories': return 'Calories Burned';
      case 'weight': return 'Body Weight';
      case 'strength': return 'Strength (Bench Press)';
      default: return '';
    }
  };
  
  // Get color based on chart type
  const getColor = () => {
    switch (chartType) {
      case 'workouts': return 'var(--accent-purple)';
      case 'calories': return 'var(--accent-pink)';
      case 'weight': return 'var(--accent-blue)';
      case 'strength': return 'var(--accent-yellow)';
      default: return 'var(--accent-purple)';
    }
  };
  
  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>{getLabel()} Over Time</ChartTitle>
        
        <ChartControls>
          <ControlGroup>
            <ControlLabel>View:</ControlLabel>
            <ButtonGroup>
              <ControlButton 
                active={timeRange === 'week'} 
                onClick={() => setTimeRange('week')}
              >
                Week
              </ControlButton>
              <ControlButton 
                active={timeRange === 'month'} 
                onClick={() => setTimeRange('month')}
              >
                Month
              </ControlButton>
              <ControlButton 
                active={timeRange === 'year'} 
                onClick={() => setTimeRange('year')}
              >
                Year
              </ControlButton>
            </ButtonGroup>
          </ControlGroup>
          
          <ControlGroup>
            <ControlLabel>Metric:</ControlLabel>
            <ButtonGroup>
              <ControlButton 
                active={chartType === 'workouts'} 
                onClick={() => setChartType('workouts')}
              >
                Workouts
              </ControlButton>
              <ControlButton 
                active={chartType === 'calories'} 
                onClick={() => setChartType('calories')}
              >
                Calories
              </ControlButton>
              <ControlButton 
                active={chartType === 'weight'} 
                onClick={() => setChartType('weight')}
              >
                Weight
              </ControlButton>
              <ControlButton 
                active={chartType === 'strength'} 
                onClick={() => setChartType('strength')}
              >
                Strength
              </ControlButton>
            </ButtonGroup>
          </ControlGroup>
        </ChartControls>
      </ChartHeader>
      
      <ChartSummary>
        <SummaryItem>
          <SummaryLabel>Total</SummaryLabel>
          <SummaryValue>{summary.total}{getUnit()}</SummaryValue>
        </SummaryItem>
        
        <SummaryItem>
          <SummaryLabel>Average</SummaryLabel>
          <SummaryValue>{summary.average}{getUnit()}</SummaryValue>
        </SummaryItem>
        
        <SummaryItem>
          <SummaryLabel>Trend</SummaryLabel>
          <SummaryValue trend={parseFloat(summary.trend)}>
            {summary.trend > 0 ? '+' : ''}{summary.trend}%
          </SummaryValue>
        </SummaryItem>
      </ChartSummary>
      
      <ChartContent>
        <YAxis>
          {[...Array(5)].map((_, i) => {
            const value = maxValue * (1 - i / 4);
            return (
              <YAxisLabel key={i}>
                {chartType === 'weight' ? value.toFixed(1) : Math.round(value)}
              </YAxisLabel>
            );
          })}
        </YAxis>
        
        <BarChartContainer>
          {currentData.map((item, index) => {
            const barHeight = (item.value / maxValue) * 100;
            return (
              <BarGroup key={index}>
                <Bar 
                  height={barHeight} 
                  color={getColor()}
                  as={motion.div}
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <BarValue>{item.value}{getUnit()}</BarValue>
                </Bar>
                <XAxisLabel>{item.day}</XAxisLabel>
              </BarGroup>
            );
          })}
        </BarChartContainer>
      </ChartContent>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ChartHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  color: var(--text-light);
`;

const ChartControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ControlLabel = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const ButtonGroup = styled.div`
  display: flex;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  overflow: hidden;
`;

const ControlButton = styled.button`
  background-color: ${props => props.active ? 'var(--accent-purple)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-purple)' : 'rgba(158, 55, 159, 0.2)'};
    color: ${props => props.active ? 'white' : 'var(--text-light)'};
  }
`;

const ChartSummary = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryLabel = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const SummaryValue = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => {
    if (props.trend > 0) return 'var(--accent-green)';
    if (props.trend < 0) return 'var(--accent-pink)';
    return 'var(--text-light)';
  }};
`;

const ChartContent = styled.div`
  display: flex;
  height: 300px;
`;

const YAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 0.75rem;
  width: 50px;
`;

const YAxisLabel = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: right;
`;

const BarChartContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  border-left: 1px solid var(--secondary-dark);
  border-bottom: 1px solid var(--secondary-dark);
  padding-top: 1rem;
  position: relative;
`;

const BarGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Bar = styled.div`
  width: 70%;
  max-width: 40px;
  height: ${props => props.height}%;
  background-color: ${props => props.color};
  border-radius: 4px 4px 0 0;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BarValue = styled.span`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: var(--text-secondary);
  white-space: nowrap;
`;

const XAxisLabel = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  text-align: center;
`;

export default WorkoutStatsChart;