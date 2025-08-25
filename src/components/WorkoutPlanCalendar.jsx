import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WorkoutPlanCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock workout data
  const workoutSchedule = {
    '2023-08-01': { type: 'Chest & Triceps', completed: true },
    '2023-08-03': { type: 'Back & Biceps', completed: true },
    '2023-08-05': { type: 'Legs', completed: true },
    '2023-08-07': { type: 'Shoulders & Arms', completed: true },
    '2023-08-09': { type: 'Full Body', completed: false },
    '2023-08-11': { type: 'Chest & Triceps', completed: false },
    '2023-08-13': { type: 'Back & Biceps', completed: false },
    '2023-08-15': { type: 'Legs', completed: false },
    '2023-08-17': { type: 'Shoulders & Arms', completed: false },
    '2023-08-19': { type: 'Rest Day', completed: false },
    '2023-08-21': { type: 'Chest & Triceps', completed: false },
    '2023-08-23': { type: 'Back & Biceps', completed: false },
    '2023-08-25': { type: 'Legs', completed: false },
    '2023-08-27': { type: 'Shoulders & Arms', completed: false },
    '2023-08-29': { type: 'Full Body', completed: false },
  };
  
  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const dateString = dayDate.toISOString().split('T')[0];
      
      days.push({
        date: dayDate,
        dateString,
        day: i,
        workout: workoutSchedule[dateString] || null
      });
    }
    
    return days;
  };
  
  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate(day.date);
  };
  
  // Get workout type color
  const getWorkoutTypeColor = (type) => {
    if (!type) return 'var(--primary-dark)';
    
    switch (type.toLowerCase()) {
      case 'chest & triceps': return '#E91E63';
      case 'back & biceps': return '#2196F3';
      case 'legs': return '#4CAF50';
      case 'shoulders & arms': return '#FF9800';
      case 'full body': return '#9C27B0';
      case 'rest day': return '#607D8B';
      default: return 'var(--accent-purple)';
    }
  };
  
  const days = getDaysInMonth(currentMonth);
  
  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthNavigation>
          <NavButton onClick={prevMonth}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
          <MonthYear>{getMonthName(currentMonth)} {currentMonth.getFullYear()}</MonthYear>
          <NavButton onClick={nextMonth}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
        </MonthNavigation>
      </CalendarHeader>
      
      <WeekdaysHeader>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <WeekdayCell key={day}>{day}</WeekdayCell>
        ))}
      </WeekdaysHeader>
      
      <DaysGrid>
        {days.map(day => {
          const isToday = new Date().toDateString() === day.date.toDateString();
          const isSelected = selectedDate.toDateString() === day.date.toDateString();
          
          return (
            <DayCell 
              key={day.day}
              onClick={() => handleDateSelect(day)}
              isToday={isToday}
              isSelected={isSelected}
              hasWorkout={!!day.workout}
              as={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DayNumber>{day.day}</DayNumber>
              
              {day.workout && (
                <WorkoutIndicator 
                  type={day.workout.type}
                  completed={day.workout.completed}
                  color={getWorkoutTypeColor(day.workout.type)}
                >
                  {day.workout.type}
                  {day.workout.completed && (
                    <CompletedCheck>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </CompletedCheck>
                  )}
                </WorkoutIndicator>
              )}
            </DayCell>
          );
        })}
      </DaysGrid>
      
      <LegendContainer>
        <LegendTitle>Workout Types:</LegendTitle>
        <LegendItems>
          {['Chest & Triceps', 'Back & Biceps', 'Legs', 'Shoulders & Arms', 'Full Body', 'Rest Day'].map(type => (
            <LegendItem key={type}>
              <LegendColor color={getWorkoutTypeColor(type)} />
              <LegendText>{type}</LegendText>
            </LegendItem>
          ))}
        </LegendItems>
      </LegendContainer>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const CalendarHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MonthYear = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-light);
`;

const WeekdaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
`;

const WeekdayCell = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const DayCell = styled.div`
  position: relative;
  aspect-ratio: 1;
  background-color: ${props => props.isSelected ? 'var(--accent-purple)' : 'var(--primary-dark)'};
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${props => props.isSelected ? '0 0 10px var(--accent-purple)' : 'none'};
  border: ${props => props.isToday ? '2px solid var(--accent-pink)' : 'none'};
  opacity: ${props => props.hasWorkout ? 1 : 0.7};
  
  &:hover {
    background-color: ${props => props.isSelected ? 'var(--accent-purple)' : 'var(--secondary-dark)'};
    transform: translateY(-2px);
  }
`;

const DayNumber = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const WorkoutIndicator = styled.div`
  background-color: ${props => props.color};
  color: white;
  font-size: 0.6rem;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${props => props.completed ? 0.7 : 1};
  position: relative;
`;

const CompletedCheck = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #4CAF50;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LegendContainer = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LegendTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const LegendItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: ${props => props.color};
  margin-right: 0.25rem;
`;

const LegendText = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

export default WorkoutPlanCalendar;