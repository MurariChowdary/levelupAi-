import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';

const MealPlanGenerator = () => {
  const { level, addXp } = useUserLevel();
  const [userPreferences, setUserPreferences] = useState({
    goal: 'muscle_gain',
    calories: 2500,
    meals: 4,
    dietType: 'balanced',
    excludeIngredients: ''
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  
  // Check if feature is unlocked based on user level
  const isFeatureUnlocked = level >= 20;
  
  // Load mock saved plans on component mount
  useEffect(() => {
    if (isFeatureUnlocked) {
      const mockSavedPlans = [
        { id: 1, name: 'Bulking Plan', goal: 'muscle_gain', calories: 3000, meals: 5, dietType: 'high_protein' },
        { id: 2, name: 'Cutting Plan', goal: 'fat_loss', calories: 2000, meals: 6, dietType: 'low_carb' }
      ];
      setSavedPlans(mockSavedPlans);
    }
  }, [isFeatureUnlocked]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setUserPreferences(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };
  
  const handleGeneratePlan = () => {
    if (!isFeatureUnlocked) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockPlan = generateMockMealPlan(userPreferences);
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
      
      // Add XP for generating a meal plan
      addXp(15);
    }, 1500);
  };
  
  const handleSavePlan = () => {
    if (!generatedPlan) return;
    
    const newSavedPlan = {
      id: Date.now(),
      name: `Meal Plan (${new Date().toLocaleDateString()})`,
      ...userPreferences,
      plan: generatedPlan
    };
    
    setSavedPlans(prev => [newSavedPlan, ...prev]);
    addXp(10); // Add XP for saving a plan
  };
  
  const handleDeletePlan = (id) => {
    setSavedPlans(prev => prev.filter(plan => plan.id !== id));
  };
  
  const handleLoadPlan = (plan) => {
    setUserPreferences({
      goal: plan.goal,
      calories: plan.calories,
      meals: plan.meals,
      dietType: plan.dietType,
      excludeIngredients: ''
    });
    
    if (plan.plan) {
      setGeneratedPlan(plan.plan);
    } else {
      handleGeneratePlan();
    }
  };
  
  // Helper function to generate a mock meal plan based on user preferences
  const generateMockMealPlan = (preferences) => {
    const { goal, calories, meals, dietType } = preferences;
    
    // Adjust food choices based on diet type
    let proteinSources = [];
    let carbSources = [];
    let fatSources = [];
    let vegetables = ['Broccoli', 'Spinach', 'Kale', 'Bell Peppers', 'Asparagus', 'Cauliflower'];
    let fruits = ['Apple', 'Banana', 'Berries', 'Orange', 'Kiwi'];
    
    switch (dietType) {
      case 'balanced':
        proteinSources = ['Chicken Breast', 'Turkey', 'Lean Beef', 'Fish', 'Tofu', 'Greek Yogurt', 'Eggs'];
        carbSources = ['Brown Rice', 'Sweet Potato', 'Quinoa', 'Oats', 'Whole Grain Bread'];
        fatSources = ['Avocado', 'Olive Oil', 'Nuts', 'Seeds'];
        break;
      case 'high_protein':
        proteinSources = ['Chicken Breast', 'Turkey', 'Lean Beef', 'Fish', 'Whey Protein', 'Eggs', 'Cottage Cheese'];
        carbSources = ['Brown Rice', 'Sweet Potato', 'Oats'];
        fatSources = ['Avocado', 'Nuts', 'Nut Butter'];
        break;
      case 'low_carb':
        proteinSources = ['Chicken Breast', 'Turkey', 'Beef', 'Fish', 'Eggs'];
        carbSources = ['Sweet Potato', 'Quinoa', 'Beans'];
        fatSources = ['Avocado', 'Olive Oil', 'Coconut Oil', 'Nuts', 'Seeds', 'Cheese'];
        break;
      case 'vegetarian':
        proteinSources = ['Tofu', 'Tempeh', 'Lentils', 'Beans', 'Greek Yogurt', 'Eggs', 'Protein Powder'];
        carbSources = ['Brown Rice', 'Sweet Potato', 'Quinoa', 'Oats', 'Whole Grain Bread'];
        fatSources = ['Avocado', 'Olive Oil', 'Nuts', 'Seeds'];
        break;
      case 'vegan':
        proteinSources = ['Tofu', 'Tempeh', 'Lentils', 'Beans', 'Seitan', 'Plant Protein Powder'];
        carbSources = ['Brown Rice', 'Sweet Potato', 'Quinoa', 'Oats', 'Whole Grain Bread'];
        fatSources = ['Avocado', 'Olive Oil', 'Nuts', 'Seeds'];
        break;
      default:
        proteinSources = ['Chicken Breast', 'Turkey', 'Lean Beef', 'Fish', 'Tofu', 'Greek Yogurt', 'Eggs'];
        carbSources = ['Brown Rice', 'Sweet Potato', 'Quinoa', 'Oats', 'Whole Grain Bread'];
        fatSources = ['Avocado', 'Olive Oil', 'Nuts', 'Seeds'];
    }
    
    // Calculate macros based on goal
    let proteinPercentage, carbPercentage, fatPercentage;
    
    switch (goal) {
      case 'muscle_gain':
        proteinPercentage = 0.3; // 30%
        carbPercentage = 0.5; // 50%
        fatPercentage = 0.2; // 20%
        break;
      case 'fat_loss':
        proteinPercentage = 0.4; // 40%
        carbPercentage = 0.3; // 30%
        fatPercentage = 0.3; // 30%
        break;
      case 'maintenance':
        proteinPercentage = 0.3; // 30%
        carbPercentage = 0.4; // 40%
        fatPercentage = 0.3; // 30%
        break;
      default:
        proteinPercentage = 0.3;
        carbPercentage = 0.4;
        fatPercentage = 0.3;
    }
    
    // Calculate calories per meal
    const caloriesPerMeal = Math.round(calories / meals);
    
    // Calculate macros in grams
    const proteinCalories = calories * proteinPercentage;
    const carbCalories = calories * carbPercentage;
    const fatCalories = calories * fatPercentage;
    
    const proteinGrams = Math.round(proteinCalories / 4); // 4 calories per gram of protein
    const carbGrams = Math.round(carbCalories / 4); // 4 calories per gram of carb
    const fatGrams = Math.round(fatCalories / 9); // 9 calories per gram of fat
    
    // Generate meal plan
    const mealPlan = {
      dailyNutrition: {
        calories,
        protein: proteinGrams,
        carbs: carbGrams,
        fat: fatGrams
      },
      meals: []
    };
    
    // Helper function to get random item from array
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    
    // Generate meals
    for (let i = 0; i < meals; i++) {
      let mealName;
      let mealItems = [];
      
      // Assign meal names based on time of day
      if (i === 0) mealName = 'Breakfast';
      else if (i === meals - 1) mealName = 'Dinner';
      else if (i === Math.floor(meals / 2)) mealName = 'Lunch';
      else mealName = `Meal ${i + 1}`;
      
      // Add protein source
      mealItems.push(getRandomItem(proteinSources));
      
      // Add carb source
      if (dietType !== 'low_carb' || Math.random() > 0.5) {
        mealItems.push(getRandomItem(carbSources));
      }
      
      // Add fat source
      mealItems.push(getRandomItem(fatSources));
      
      // Add vegetable
      mealItems.push(getRandomItem(vegetables));
      
      // Add fruit for some meals
      if (Math.random() > 0.5) {
        mealItems.push(getRandomItem(fruits));
      }
      
      // Calculate meal macros (simplified)
      const mealProtein = Math.round(proteinGrams / meals);
      const mealCarbs = Math.round(carbGrams / meals);
      const mealFat = Math.round(fatGrams / meals);
      
      mealPlan.meals.push({
        name: mealName,
        items: mealItems,
        nutrition: {
          calories: caloriesPerMeal,
          protein: mealProtein,
          carbs: mealCarbs,
          fat: mealFat
        }
      });
    }
    
    return mealPlan;
  };
  
  // If feature is locked, show locked state
  if (!isFeatureUnlocked) {
    return (
      <LockedFeatureContainer
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LockedIcon>🔒</LockedIcon>
        <LockedContent>
          <h2>Meal Plan Generator</h2>
          <p>Create personalized meal plans based on your goals and preferences</p>
          <LockedLevel>Unlocks at Level 20</LockedLevel>
          <ProgressBar>
            <ProgressFill width={(level / 20) * 100} />
          </ProgressBar>
          <ProgressText>{level}/20</ProgressText>
        </LockedContent>
      </LockedFeatureContainer>
    );
  }
  
  return (
    <GeneratorContainer>
      <GeneratorHeader>
        <h2>Meal Plan Generator</h2>
        <p>Create personalized meal plans based on your goals and preferences</p>
      </GeneratorHeader>
      
      <GeneratorContent>
        <PreferencesSection>
          <SectionTitle>Your Preferences</SectionTitle>
          
          <PreferencesForm>
            <FormGroup>
              <FormLabel>Goal</FormLabel>
              <FormSelect 
                name="goal" 
                value={userPreferences.goal} 
                onChange={handleInputChange}
              >
                <option value="muscle_gain">Muscle Gain</option>
                <option value="fat_loss">Fat Loss</option>
                <option value="maintenance">Maintenance</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Daily Calories</FormLabel>
              <FormInput 
                type="number" 
                name="calories" 
                value={userPreferences.calories} 
                onChange={handleNumberChange}
                min="1500"
                max="5000"
                step="100"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Meals Per Day</FormLabel>
              <FormInput 
                type="number" 
                name="meals" 
                value={userPreferences.meals} 
                onChange={handleNumberChange}
                min="3"
                max="8"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Diet Type</FormLabel>
              <FormSelect 
                name="dietType" 
                value={userPreferences.dietType} 
                onChange={handleInputChange}
              >
                <option value="balanced">Balanced</option>
                <option value="high_protein">High Protein</option>
                <option value="low_carb">Low Carb</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Exclude Ingredients (comma separated)</FormLabel>
              <FormInput 
                type="text" 
                name="excludeIngredients" 
                value={userPreferences.excludeIngredients} 
                onChange={handleInputChange}
                placeholder="e.g. nuts, dairy, eggs"
              />
            </FormGroup>
            
            <GenerateButton 
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isGenerating ? 'Generating...' : 'Generate Meal Plan'}
            </GenerateButton>
          </PreferencesForm>
        </PreferencesSection>
        
        <ResultsSection>
          <SectionTitle>Generated Meal Plan</SectionTitle>
          
          {isGenerating ? (
            <LoadingState>
              <LoadingSpinner />
              <p>Generating your personalized meal plan...</p>
            </LoadingState>
          ) : generatedPlan ? (
            <MealPlanResult>
              <NutritionSummary>
                <h3>Daily Nutrition</h3>
                <NutritionGrid>
                  <NutritionItem>
                    <NutritionLabel>Calories</NutritionLabel>
                    <NutritionValue>{generatedPlan.dailyNutrition.calories}</NutritionValue>
                  </NutritionItem>
                  
                  <NutritionItem>
                    <NutritionLabel>Protein</NutritionLabel>
                    <NutritionValue>{generatedPlan.dailyNutrition.protein}g</NutritionValue>
                  </NutritionItem>
                  
                  <NutritionItem>
                    <NutritionLabel>Carbs</NutritionLabel>
                    <NutritionValue>{generatedPlan.dailyNutrition.carbs}g</NutritionValue>
                  </NutritionItem>
                  
                  <NutritionItem>
                    <NutritionLabel>Fat</NutritionLabel>
                    <NutritionValue>{generatedPlan.dailyNutrition.fat}g</NutritionValue>
                  </NutritionItem>
                </NutritionGrid>
              </NutritionSummary>
              
              <MealsList>
                {generatedPlan.meals.map((meal, index) => (
                  <MealCard 
                    key={index}
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <MealHeader>
                      <h3>{meal.name}</h3>
                      <MacroBadges>
                        <MacroBadge type="calories">{meal.nutrition.calories} cal</MacroBadge>
                        <MacroBadge type="protein">{meal.nutrition.protein}g protein</MacroBadge>
                        <MacroBadge type="carbs">{meal.nutrition.carbs}g carbs</MacroBadge>
                        <MacroBadge type="fat">{meal.nutrition.fat}g fat</MacroBadge>
                      </MacroBadges>
                    </MealHeader>
                    
                    <MealIngredients>
                      {meal.items.map((item, i) => (
                        <IngredientItem key={i}>
                          <IngredientIcon>🍽️</IngredientIcon>
                          <IngredientName>{item}</IngredientName>
                        </IngredientItem>
                      ))}
                    </MealIngredients>
                  </MealCard>
                ))}
              </MealsList>
              
              <SaveButton 
                onClick={handleSavePlan}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save This Meal Plan
              </SaveButton>
            </MealPlanResult>
          ) : (
            <EmptyState>
              <p>Set your preferences and generate a meal plan</p>
            </EmptyState>
          )}
        </ResultsSection>
      </GeneratorContent>
      
      {savedPlans.length > 0 && (
        <SavedPlansSection>
          <SectionTitle>Saved Meal Plans</SectionTitle>
          
          <SavedPlansList>
            {savedPlans.map(plan => (
              <SavedPlanCard 
                key={plan.id}
                as={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <SavedPlanHeader>
                  <h3>{plan.name}</h3>
                  <SavedPlanActions>
                    <ActionButton onClick={() => handleLoadPlan(plan)}>
                      Load
                    </ActionButton>
                    <ActionButton onClick={() => handleDeletePlan(plan.id)}>
                      Delete
                    </ActionButton>
                  </SavedPlanActions>
                </SavedPlanHeader>
                
                <SavedPlanDetails>
                  <DetailItem>
                    <DetailLabel>Goal:</DetailLabel>
                    <DetailValue>
                      {plan.goal === 'muscle_gain' ? 'Muscle Gain' : 
                       plan.goal === 'fat_loss' ? 'Fat Loss' : 'Maintenance'}
                    </DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailLabel>Calories:</DetailLabel>
                    <DetailValue>{plan.calories}</DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailLabel>Meals:</DetailLabel>
                    <DetailValue>{plan.meals}</DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailLabel>Diet Type:</DetailLabel>
                    <DetailValue>
                      {plan.dietType === 'balanced' ? 'Balanced' :
                       plan.dietType === 'high_protein' ? 'High Protein' :
                       plan.dietType === 'low_carb' ? 'Low Carb' :
                       plan.dietType === 'vegetarian' ? 'Vegetarian' : 'Vegan'}
                    </DetailValue>
                  </DetailItem>
                </SavedPlanDetails>
              </SavedPlanCard>
            ))}
          </SavedPlansList>
        </SavedPlansSection>
      )}
    </GeneratorContainer>
  );
};

const GeneratorContainer = styled.div`
  padding: 1rem;
`;

const GeneratorHeader = styled.div`
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

const GeneratorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 1.25rem 0;
  color: var(--text-light);
`;

const PreferencesSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const PreferencesForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
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
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  background-color: var(--secondary-dark);
  border: 1px solid var(--secondary-dark);
  border-radius: 4px;
  color: var(--text-light);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a0a0a0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 2px rgba(158, 55, 159, 0.2);
  }
  
  option {
    background-color: var(--primary-dark);
  }
`;

const GenerateButton = styled.button`
  background-color: var(--accent-purple);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(158, 55, 159, 0.3);
  
  &:hover:not(:disabled) {
    background-color: var(--accent-pink);
    box-shadow: 0 4px 12px rgba(232, 106, 240, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ResultsSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  
  p {
    margin-top: 1rem;
    color: var(--text-secondary);
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(158, 55, 159, 0.3);
  border-radius: 50%;
  border-top-color: var(--accent-purple);
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-secondary);
`;

const MealPlanResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NutritionSummary = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1.25rem;
  
  h3 {
    font-size: 1.125rem;
    margin: 0 0 1rem 0;
    color: var(--text-light);
  }
`;

const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NutritionItem = styled.div`
  text-align: center;
`;

const NutritionLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const NutritionValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
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

const MealCard = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1.25rem;
`;

const MealHeader = styled.div`
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.125rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
  }
`;

const MacroBadges = styled.div`
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

const MealIngredients = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IngredientIcon = styled.span`
  font-size: 1rem;
`;

const IngredientName = styled.span`
  font-size: 0.875rem;
  color: var(--text-light);
`;

const SaveButton = styled.button`
  background-color: var(--accent-blue);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
  box-shadow: 0 4px 8px rgba(123, 179, 255, 0.3);
  
  &:hover {
    background-color: var(--accent-purple);
    box-shadow: 0 4px 12px rgba(158, 55, 159, 0.4);
  }
`;

const SavedPlansSection = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 1.5rem;
`;

const SavedPlansList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const SavedPlanCard = styled.div`
  background-color: var(--secondary-dark);
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SavedPlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1rem;
    margin: 0;
    color: var(--text-light);
  }
`;

const SavedPlanActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: var(--secondary-dark);
  border: 1px solid var(--primary-dark);
  color: var(--text-secondary);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-dark);
    color: var(--text-light);
  }
`;

const SavedPlanDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  font-size: 0.875rem;
`;

const DetailLabel = styled.span`
  color: var(--text-secondary);
  width: 80px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  color: var(--text-light);
`;

const LockedFeatureContainer = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1rem 0;
`;

const LockedIcon = styled.div`
  font-size: 3rem;
  background-color: var(--secondary-dark);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LockedContent = styled.div`
  flex: 1;
  
  h2 {
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
    font-size: 1.5rem;
  }
  
  p {
    margin: 0 0 1.5rem 0;
    color: var(--text-secondary);
    font-size: 1rem;
  }
`;

const LockedLevel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent-pink);
  margin-bottom: 0.75rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: var(--secondary-dark);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: var(--accent-pink);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(232, 106, 240, 0.5);
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

export default MealPlanGenerator;