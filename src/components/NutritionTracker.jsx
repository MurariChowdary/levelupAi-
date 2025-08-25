import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';

const NutritionTracker = () => {
  const { level, addXp } = useUserLevel();
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    
    carbs: '',
    fat: '',
    time: ''
  });
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2500,
    protein: 180,
    carbs: 250,
    fat: 80
  });
  const [dailyTotals, setDailyTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [showFoodDatabase, setShowFoodDatabase] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock food database
  const foodDatabase = [
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice (100g)', calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
    { name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { name: 'Salmon (100g)', calories: 206, protein: 22, carbs: 0, fat: 13 },
    { name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
    { name: 'Avocado (100g)', calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
    { name: 'Egg (1 large)', calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
    { name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
    { name: 'Oatmeal (100g)', calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },
    { name: 'Spinach (100g)', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    { name: 'Quinoa (100g)', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
    { name: 'Beef Steak (100g)', calories: 271, protein: 25.9, carbs: 0, fat: 17.9 },
    { name: 'Lentils (100g)', calories: 116, protein: 9, carbs: 20, fat: 0.4 }
  ];
  
  // Filter foods based on search term
  const filteredFoods = foodDatabase.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate daily totals whenever meals change
  useEffect(() => {
    const totals = meals.reduce((acc, meal) => {
      return {
        calories: acc.calories + Number(meal.calories),
        protein: acc.protein + Number(meal.protein),
        carbs: acc.carbs + Number(meal.carbs),
        fat: acc.fat + Number(meal.fat)
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    setDailyTotals(totals);
  }, [meals]);
  
  // Load mock data on component mount
  useEffect(() => {
    const mockMeals = [
      { id: 1, name: 'Breakfast - Oatmeal with Berries', calories: 350, protein: 15, carbs: 55, fat: 8, time: '08:00' },
      { id: 2, name: 'Snack - Protein Shake', calories: 180, protein: 25, carbs: 10, fat: 3, time: '10:30' },
      { id: 3, name: 'Lunch - Chicken Salad', calories: 450, protein: 40, carbs: 25, fat: 20, time: '13:00' }
    ];
    
    setMeals(mockMeals);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddMeal = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newMeal.name || !newMeal.calories) {
      return;
    }
    
    const mealToAdd = {
      ...newMeal,
      id: Date.now(),
      time: newMeal.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMeals(prev => [...prev, mealToAdd]);
    
    // Reset form
    setNewMeal({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      time: ''
    });
    
    // Add XP for logging a meal
    addXp(5);
    
    // Close food database if open
    setShowFoodDatabase(false);
  };
  
  const handleDeleteMeal = (id) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };
  
  const handleSelectFood = (food) => {
    setNewMeal({
      ...newMeal,
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat
    });
    setShowFoodDatabase(false);
  };
  
  const calculatePercentage = (current, goal) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };
  
  return (
    <TrackerContainer>
      <TrackerHeader>
        <h2>Nutrition Tracker</h2>
        <p>Log your meals and track your macros</p>
      </TrackerHeader>
      
      <NutritionSummary>
        <MacroCard>
          <MacroTitle>Calories</MacroTitle>
          <MacroValue>
            {dailyTotals.calories} <span>/ {dailyGoals.calories}</span>
          </MacroValue>
          <MacroProgressBar>
            <MacroProgress 
              width={calculatePercentage(dailyTotals.calories, dailyGoals.calories)}
              type="calories"
            />
          </MacroProgressBar>
          <MacroPercentage>
            {calculatePercentage(dailyTotals.calories, dailyGoals.calories)}%
          </MacroPercentage>
        </MacroCard>
        
        <MacroCard>
          <MacroTitle>Protein</MacroTitle>
          <MacroValue>
            {dailyTotals.protein}g <span>/ {dailyGoals.protein}g</span>
          </MacroValue>
          <MacroProgressBar>
            <MacroProgress 
              width={calculatePercentage(dailyTotals.protein, dailyGoals.protein)}
              type="protein"
            />
          </MacroProgressBar>
          <MacroPercentage>
            {calculatePercentage(dailyTotals.protein, dailyGoals.protein)}%
          </MacroPercentage>
        </MacroCard>
        
        <MacroCard>
          <MacroTitle>Carbs</MacroTitle>
          <MacroValue>
            {dailyTotals.carbs}g <span>/ {dailyGoals.carbs}g</span>
          </MacroValue>
          <MacroProgressBar>
            <MacroProgress 
              width={calculatePercentage(dailyTotals.carbs, dailyGoals.carbs)}
              type="carbs"
            />
          </MacroProgressBar>
          <MacroPercentage>
            {calculatePercentage(dailyTotals.carbs, dailyGoals.carbs)}%
          </MacroPercentage>
        </MacroCard>
        
        <MacroCard>
          <MacroTitle>Fat</MacroTitle>
          <MacroValue>
            {dailyTotals.fat}g <span>/ {dailyGoals.fat}g</span>
          </MacroValue>
          <MacroProgressBar>
            <MacroProgress 
              width={calculatePercentage(dailyTotals.fat, dailyGoals.fat)}
              type="fat"
            />
          </MacroProgressBar>
          <MacroPercentage>
            {calculatePercentage(dailyTotals.fat, dailyGoals.fat)}%
          </MacroPercentage>
        </MacroCard>
      </NutritionSummary>
      
      <TrackerContent>
        <MealLogSection>
          <SectionTitle>Today's Meals</SectionTitle>
          
          {meals.length > 0 ? (
            <MealsList>
              {meals.map(meal => (
                <MealItem 
                  key={meal.id}
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MealTime>{meal.time}</MealTime>
                  <MealDetails>
                    <MealName>{meal.name}</MealName>
                    <MealMacros>
                      <MacroBadge type="calories">{meal.calories} cal</MacroBadge>
                      <MacroBadge type="protein">{meal.protein}g protein</MacroBadge>
                      <MacroBadge type="carbs">{meal.carbs}g carbs</MacroBadge>
                      <MacroBadge type="fat">{meal.fat}g fat</MacroBadge>
                    </MealMacros>
                  </MealDetails>
                  <DeleteButton onClick={() => handleDeleteMeal(meal.id)}>
                    ×
                  </DeleteButton>
                </MealItem>
              ))}
            </MealsList>
          ) : (
            <EmptyState>No meals logged today. Add your first meal below!</EmptyState>
          )}
        </MealLogSection>
        
        <AddMealSection>
          <SectionTitle>Add New Meal</SectionTitle>
          
          <AddMealForm onSubmit={handleAddMeal}>
            <FormRow>
              <FormGroup>
                <FormLabel>Meal Name</FormLabel>
                <FormInput 
                  type="text" 
                  name="name" 
                  value={newMeal.name} 
                  onChange={handleInputChange}
                  placeholder="Enter meal name"
                  required
                />
                <DatabaseButton 
                  type="button" 
                  onClick={() => setShowFoodDatabase(!showFoodDatabase)}
                >
                  {showFoodDatabase ? 'Hide Database' : 'Food Database'}
                </DatabaseButton>
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Calories</FormLabel>
                <FormInput 
                  type="number" 
                  name="calories" 
                  value={newMeal.calories} 
                  onChange={handleInputChange}
                  placeholder="kcal"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Protein</FormLabel>
                <FormInput 
                  type="number" 
                  name="protein" 
                  value={newMeal.protein} 
                  onChange={handleInputChange}
                  placeholder="g"
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Carbs</FormLabel>
                <FormInput 
                  type="number" 
                  name="carbs" 
                  value={newMeal.carbs} 
                  onChange={handleInputChange}
                  placeholder="g"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Fat</FormLabel>
                <FormInput 
                  type="number" 
                  name="fat" 
                  value={newMeal.fat} 
                  onChange={handleInputChange}
                  placeholder="g"
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Time</FormLabel>
                <FormInput 
                  type="time" 
                  name="time" 
                  value={newMeal.time} 
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit"
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Meal
              </SubmitButton>
            </FormRow>
          </AddMealForm>
          
          {showFoodDatabase && (
            <FoodDatabaseContainer
              as={motion.div}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DatabaseSearch 
                type="text" 
                placeholder="Search foods..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <FoodList>
                {filteredFoods.map((food, index) => (
                  <FoodItem 
                    key={index} 
                    onClick={() => handleSelectFood(food)}
                    as={motion.div}
                    whileHover={{ backgroundColor: 'var(--secondary-dark)' }}
                  >
                    <FoodName>{food.name}</FoodName>
                    <FoodMacros>
                      <span>{food.calories} cal</span>
                      <span>{food.protein}g protein</span>
                      <span>{food.carbs}g carbs</span>
                      <span>{food.fat}g fat</span>
                    </FoodMacros>
                  </FoodItem>
                ))}
              </FoodList>
            </FoodDatabaseContainer>
          )}
        </AddMealSection>
      </TrackerContent>
      
      {level < 20 && (
        <LockedFeatureCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <LockedIcon>🔒</LockedIcon>
          <LockedContent>
            <h3>Meal Planning</h3>
            <p>Create and save meal plans for the week</p>
            <LockedLevel>Unlocks at Level 20</LockedLevel>
            <ProgressBar>
              <ProgressFill width={(level / 20) * 100} />
            </ProgressBar>
            <ProgressText>{level}/20</ProgressText>
          </LockedContent>
        </LockedFeatureCard>
      )}
    </TrackerContainer>
  );
};

const TrackerContainer = styled.div`
  padding: 1rem;
`;

const TrackerHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.75rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
  }
  
  p {
    color: var(--text-secondary);
    margin: 0;
  }
`;

const NutritionSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MacroCard = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MacroTitle = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const MacroValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 0.75rem;
  
  span {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 400;
  }
`;

const MacroProgressBar = styled.div`
  height: 8px;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const MacroProgress = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  border-radius: 4px;
  background-color: ${props => {
    switch(props.type) {
      case 'calories': return 'var(--accent-pink)';
      case 'protein': return 'var(--accent-blue)';
      case 'carbs': return 'var(--accent-purple)';
      case 'fat': return 'var(--accent-yellow)';
      default: return 'var(--accent-pink)';
    }
  }};
  box-shadow: 0 0 10px ${props => {
    switch(props.type) {
      case 'calories': return 'rgba(232, 106, 240, 0.5)';
      case 'protein': return 'rgba(123, 179, 255, 0.5)';
      case 'carbs': return 'rgba(158, 55, 159, 0.5)';
      case 'fat': return 'rgba(255, 180, 0, 0.5)';
      default: return 'rgba(232, 106, 240, 0.5)';
    }
  }};
`;

const MacroPercentage = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: right;
`;

const TrackerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MealLogSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 1.25rem 0;
  color: var(--text-light);
`;

const MealsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--secondary-dark);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-purple);
    border-radius: 3px;
  }
`;

const MealItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1rem;
  position: relative;
`;

const MealTime = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-purple);
  background-color: rgba(158, 55, 159, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 1rem;
  min-width: 60px;
  text-align: center;
`;

const MealDetails = styled.div`
  flex: 1;
`;

const MealName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const MealMacros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const MacroBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  
  ${props => props.type === 'calories' && `
    background-color: rgba(232, 106, 240, 0.1);
    color: var(--accent-pink);
  `}
  
  ${props => props.type === 'protein' && `
    background-color: rgba(123, 179, 255, 0.1);
    color: var(--accent-blue);
  `}
  
  ${props => props.type === 'carbs' && `
    background-color: rgba(158, 55, 159, 0.1);
    color: var(--accent-purple);
  `}
  
  ${props => props.type === 'fat' && `
    background-color: rgba(255, 180, 0, 0.1);
    color: var(--accent-yellow);
  `}
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--accent-pink);
    background-color: rgba(232, 106, 240, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  font-size: 1rem;
  background-color: var(--secondary-dark);
  border-radius: 8px;
`;

const AddMealSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const AddMealForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  padding: 0.75rem;
  background-color: var(--secondary-dark);
  border: 1px solid var(--secondary-dark);
  border-radius: 4px;
  color: var(--text-light);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 2px rgba(158, 55, 159, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
  
  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
  }
`;

const DatabaseButton = styled.button`
  margin-top: 0.5rem;
  align-self: flex-start;
  background-color: var(--secondary-dark);
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--accent-purple);
    color: white;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--accent-purple);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
  margin-top: auto;
  box-shadow: 0 4px 8px rgba(158, 55, 159, 0.3);
  
  &:hover {
    background-color: var(--accent-pink);
    box-shadow: 0 4px 12px rgba(232, 106, 240, 0.4);
  }
`;

const FoodDatabaseContainer = styled.div`
  margin-top: 1rem;
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
`;

const DatabaseSearch = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-dark);
  border: 1px solid var(--primary-dark);
  border-radius: 4px;
  color: var(--text-light);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 2px rgba(158, 55, 159, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const FoodList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--primary-dark);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-purple);
    border-radius: 3px;
  }
`;

const FoodItem = styled.div`
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const FoodName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 0.25rem;
`;

const FoodMacros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  
  span {
    background-color: var(--primary-dark);
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
  }
`;

const LockedFeatureCard = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  border: 1px solid var(--secondary-dark);
`;

const LockedIcon = styled.div`
  font-size: 2.5rem;
  background-color: var(--secondary-dark);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LockedContent = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
    font-size: 1.25rem;
  }
  
  p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
`;

const LockedLevel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-pink);
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: var(--secondary-dark);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: var(--accent-pink);
  border-radius: 3px;
`;

const ProgressText = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: right;
`;

export default NutritionTracker;