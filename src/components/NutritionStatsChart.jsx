import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NutritionStatsChart = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('calories');
  
  // Mock data for different time ranges and chart types
  const mockData = {
    calories: {
      week: [
        { day: 'Mon', value: 2100, goal: 2200 },
        { day: 'Tue', value: 2050, goal: 2200 },
        { day: 'Wed', value: 2300, goal: 2200 },
        { day: 'Thu', value: 2150, goal: 2200 },
        { day: 'Fri', value: 2250, goal: 2200 },
        { day: 'Sat', value: 2400, goal: 2200 },
        { day: 'Sun', value: 2500, goal: 2200 }
      ],
      month: [
        { day: 'Week 1', value: 15400, goal: 15400 },
        { day: 'Week 2', value: 14800, goal: 15400 },
        { day: 'Week 3', value: 15600, goal: 15400 },
        { day: 'Week 4', value: 16100, goal: 15400 }
      ],
      year: [
        { day: 'Jan', value: 65000, goal: 66000 },
        { day: 'Feb', value: 62000, goal: 66000 },
        { day: 'Mar', value: 64000, goal: 66000 },
        { day: 'Apr', value: 63000, goal: 66000 },
        { day: 'May', value: 66000, goal: 66000 },
        { day: 'Jun', value: 67000, goal: 66000 },
        { day: 'Jul', value: 68000, goal: 66000 },
        { day: 'Aug', value: 67500, goal: 66000 },
        { day: 'Sep', value: 66500, goal: 66000 },
        { day: 'Oct', value: 65500, goal: 66000 },
        { day: 'Nov', value: 64500, goal: 66000 },
        { day: 'Dec', value: 66000, goal: 66000 }
      ]
    },
    protein: {
      week: [
        { day: 'Mon', value: 120, goal: 150 },
        { day: 'Tue', value: 135, goal: 150 },
        { day: 'Wed', value: 145, goal: 150 },
        { day: 'Thu', value: 155, goal: 150 },
        { day: 'Fri', value: 160, goal: 150 },
        { day: 'Sat', value: 170, goal: 150 },
        { day: 'Sun', value: 165, goal: 150 }
      ],
      month: [
        { day: 'Week 1', value: 980, goal: 1050 },
        { day: 'Week 2', value: 1020, goal: 1050 },
        { day: 'Week 3', value: 1100, goal: 1050 },
        { day: 'Week 4', value: 1150, goal: 1050 }
      ],
      year: [
        { day: 'Jan', value: 4200, goal: 4500 },
        { day: 'Feb', value: 4300, goal: 4500 },
        { day: 'Mar', value: 4400, goal: 4500 },
        { day: 'Apr', value: 4450, goal: 4500 },
        { day: 'May', value: 4500, goal: 4500 },
        { day: 'Jun', value: 4550, goal: 4500 },
        { day: 'Jul', value: 4600, goal: 4500 },
        { day: 'Aug', value: 4650, goal: 4500 },
        { day: 'Sep', value: 4700, goal: 4500 },
        { day: 'Oct', value: 4750, goal: 4500 },
        { day: 'Nov', value: 4800, goal: 4500 },
        { day: 'Dec', value: 4850, goal: 4500 }
      ]
    },
    carbs: {
      week: [
        { day: 'Mon', value: 220, goal: 200 },
        { day: 'Tue', value: 210, goal: 200 },
        { day: 'Wed', value: 230, goal: 200 },
        { day: 'Thu', value: 190, goal: 200 },
        { day: 'Fri', value: 200, goal: 200 },
        { day: 'Sat', value: 240, goal: 200 },
        { day: 'Sun', value: 250, goal: 200 }
      ],
      month: [
        { day: 'Week 1', value: 1500, goal: 1400 },
        { day: 'Week 2', value: 1450, goal: 1400 },
        { day: 'Week 3', value: 1550, goal: 1400 },
        { day: 'Week 4', value: 1600, goal: 1400 }
      ],
      year: [
        { day: 'Jan', value: 6500, goal: 6000 },
        { day: 'Feb', value: 6300, goal: 6000 },
        { day: 'Mar', value: 6200, goal: 6000 },
        { day: 'Apr', value: 6100, goal: 6000 },
        { day: 'May', value: 6000, goal: 6000 },
        { day: 'Jun', value: 6100, goal: 6000 },
        { day: 'Jul', value: 6200, goal: 6000 },
        { day: 'Aug', value: 6300, goal: 6000 },
        { day: 'Sep', value: 6400, goal: 6000 },
        { day: 'Oct', value: 6500, goal: 6000 },
        { day: 'Nov', value: 6600, goal: 6000 },
        { day: 'Dec', value: 6700, goal: 6000 }
      ]
    },
    fat: {
      week: [
        { day: 'Mon', value: 65, goal: 70 },
        { day: 'Tue', value: 68, goal: 70 },
        { day: 'Wed', value: 72, goal: 70 },
        { day: 'Thu', value: 67, goal: 70 },
        { day: 'Fri', value: 70, goal: 70 },
        { day: 'Sat', value: 75, goal: 70 },
        { day: 'Sun', value: 78, goal: 70 }
      ],
      month: [
        { day: 'Week 1', value: 480, goal: 490 },
        { day: 'Week 2', value: 490, goal: 490 },
        { day: 'Week 3', value: 500, goal: 490 },
        { day: 'Week 4', value: 510, goal: 490 }
      ],
      year: [
        { day: 'Jan', value: 2000, goal: 2100 },
        { day: 'Feb', value: 2050, goal: 2100 },
        { day: 'Mar', value: 2100, goal: 2100 },
        { day: 'Apr', value: 2150, goal: 2100 },
        { day: 'May', value: 2200, goal: 2100 },
        { day: 'Jun', value: 2250, goal: 2100 },
        { day: 'Jul', value: 2300, goal: 2100 },
        { day: 'Aug', value: 2350, goal: 2100 },
        { day: 'Sep', value: 2400, goal: 2100 },
        { day: 'Oct', value: 2450, goal: 2100 },
        { day: 'Nov', value: 2500, goal: 2100 },
        { day: 'Dec', value: 2550, goal: 2100 }
      ]
    }
  };
  
  // Get current data based on selected time range and chart type
  const currentData = mockData[chartType][timeRange];
  
  // Find max value for scaling (considering both value and goal)
  const maxValue = Math.max(
    ...currentData.map(item => Math.max(item.value, item.goal))
  ) * 1.1; // Add 10% padding
  
  // Calculate summary statistics
  const calculateSummary = () => {
    const values = currentData.map(item => item.value);
    const goals = currentData.map(item => item.goal);
    
    const totalValue = values.reduce((sum, val) => sum + val, 0);
    const totalGoal = goals.reduce((sum, val) => sum + val, 0);
    const averageValue = totalValue / values.length;
    const averageGoal = totalGoal / goals.length;
    
    // Calculate percentage of goal met
    const percentOfGoal = (totalValue / totalGoal) * 100;
    
    // Calculate trend (comparing last value to first value)
    let trend = 0;
    if (values.length > 1) {
      trend = ((values[values.length - 1] - values[0]) / values[0]) * 100;
    }
    
    return {
      average: averageValue.toFixed(0),
      goal: averageGoal.toFixed(0),
      percentOfGoal: percentOfGoal.toFixed(1),
      trend: trend.toFixed(1)
    };
  };
  
  const summary = calculateSummary();
  
  // Get appropriate unit based on chart type
  const getUnit = () => {
    switch (chartType) {
      case 'calories': return 'kcal';
      case 'protein': return 'g';
      case 'carbs': return 'g';
      case 'fat': return 'g';
      default: return '';
    }
  };
  
  // Get appropriate label based on chart type
  const getLabel = () => {
    switch (chartType) {
      case 'calories': return 'Calories';
      case 'protein': return 'Protein';
      case 'carbs': return 'Carbohydrates';
      case 'fat': return 'Fat';
      default: return '';
    }
  };
  
  // Get color based on chart type
  const getColor = () => {
    switch (chartType) {
      case 'calories': return 'var(--accent-blue)';
      case 'protein': return 'var(--accent-purple)';
      case 'carbs': return 'var(--accent-yellow)';
      case 'fat': return 'var(--accent-pink)';
      default: return 'var(--accent-blue)';
    }
  };
  
  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>{getLabel()} Intake Over Time</ChartTitle>
        
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
            <ControlLabel>Nutrient:</ControlLabel>
            <ButtonGroup>
              <ControlButton 
                active={chartType === 'calories'} 
                onClick={() => setChartType('calories')}
              >
                Calories
              </ControlButton>
              <ControlButton 
                active={chartType === 'protein'} 
                onClick={() => setChartType('protein')}
              >
                Protein
              </ControlButton>
              <ControlButton 
                active={chartType === 'carbs'} 
                onClick={() => setChartType('carbs')}
              >
                Carbs
              </ControlButton>
              <ControlButton 
                active={chartType === 'fat'} 
                onClick={() => setChartType('fat')}
              >
                Fat
              </ControlButton>
            </ButtonGroup>
          </ControlGroup>
        </ChartControls>
      </ChartHeader>
      
      <ChartSummary>
        <SummaryItem>
          <SummaryLabel>Average</SummaryLabel>
          <SummaryValue>{summary.average}{getUnit()}</SummaryValue>
        </SummaryItem>
        
        <SummaryItem>
          <SummaryLabel>Goal</SummaryLabel>
          <SummaryValue>{summary.goal}{getUnit()}</SummaryValue>
        </SummaryItem>
        
        <SummaryItem>
          <SummaryLabel>% of Goal</SummaryLabel>
          <SummaryValue 
            trend={parseFloat(summary.percentOfGoal) - 100}
          >
            {summary.percentOfGoal}%
          </SummaryValue>
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
                {Math.round(value)}
              </YAxisLabel>
            );
          })}
        </YAxis>
        
        <BarChartContainer>
          {currentData.map((item, index) => {
            const barHeight = (item.value / maxValue) * 100;
            const goalHeight = (item.goal / maxValue) * 100;
            return (
              <BarGroup key={index}>
                <GoalLine 
                  height={goalHeight}
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
                <Bar 
                  height={barHeight} 
                  color={getColor()}
                  as={motion.div}
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  overGoal={item.value > item.goal}
                >
                  <BarValue>{item.value}{getUnit()}</BarValue>
                </Bar>
                <XAxisLabel>{item.day}</XAxisLabel>
              </BarGroup>
            );
          })}
        </BarChartContainer>
      </ChartContent>
      
      <Legend>
        <LegendItem>
          <LegendColor color={getColor()} />
          <LegendText>Actual Intake</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendLine />
          <LegendText>Daily Goal</LegendText>
        </LegendItem>
      </Legend>
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
  background-color: ${props => props.active ? 'var(--accent-blue)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-blue)' : 'rgba(55, 125, 255, 0.2)'};
    color: ${props => props.active ? 'white' : 'var(--text-light)'};
  }
`;

const ChartSummary = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
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
  position: relative;
`;

const Bar = styled.div`
  width: 70%;
  max-width: 40px;
  height: ${props => props.height}%;
  background-color: ${props => props.color};
  border-radius: 4px 4px 0 0;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.overGoal ? 0.8 : 1};
`;

const GoalLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  bottom: ${props => props.height}%;
  z-index: 1;
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

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  border-radius: 2px;
`;

const LegendLine = styled.div`
  width: 12px;
  height: 2px;
  background-color: white;
`;

const LegendText = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

export default NutritionStatsChart;