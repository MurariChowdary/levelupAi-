import React, { createContext, useState, useContext, useEffect } from 'react';

// Define Hunter rank thresholds (Solo Leveling inspired)
const RANKS = {
  E_RANK: { min: 1, max: 9, color: '#1a1a2e' },       // Weakest hunter rank
  D_RANK: { min: 10, max: 24, color: '#1e3163' },     // Beginning hunter
  C_RANK: { min: 25, max: 49, color: '#2d2e8b' },     // Average hunter
  B_RANK: { min: 50, max: 99, color: '#3a1078' },     // Above average hunter
  A_RANK: { min: 100, max: 149, color: '#4a0e8f' },   // Elite hunter
  S_RANK: { min: 150, max: 199, color: '#560bad' },   // National level hunter
  SHADOW_MONARCH: { min: 200, max: Infinity, color: '#7209b7' } // Sung Jin-Woo's title
};

// Create context
export const UserLevelContext = createContext();

// Provider component
export const UserLevelProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(100);
  const [rank, setRank] = useState('E_RANK');
  const [unlockedFeatures, setUnlockedFeatures] = useState([]);
  
  // Calculate XP needed for next level (increases with each level)
  const calculateXpToNextLevel = (currentLevel) => {
    return Math.floor(100 * Math.pow(1.1, currentLevel - 1));
  };
  
  // Determine rank based on level
  const determineRank = (level) => {
    for (const [rankName, rankData] of Object.entries(RANKS)) {
      if (level >= rankData.min && level <= rankData.max) {
        return rankName;
      }
    }
    return 'E_RANK'; // Default
  };
  
  // Check for unlockable features based on level (Solo Leveling inspired)
  const checkUnlockables = (newLevel) => {
    const unlockableLevels = {
      10: ['DailyQuestTracker', 'StatMeasurements'],     // D-Rank abilities
      25: ['SkillAcquisition', 'DungeonPlanner'],        // C-Rank abilities
      50: ['ShadowExtraction'],                          // B-Rank abilities
      100: ['ShadowArmy'],                               // A-Rank abilities
      150: ['RulerAuthority'],                           // S-Rank abilities
      200: ['MonarchDomain']                             // Shadow Monarch abilities
    };
    
    let newUnlocked = [...unlockedFeatures];
    
    Object.entries(unlockableLevels).forEach(([levelThreshold, features]) => {
      if (newLevel >= parseInt(levelThreshold) && !features.every(f => unlockedFeatures.includes(f))) {
        features.forEach(feature => {
          if (!newUnlocked.includes(feature)) {
            newUnlocked.push(feature);
          }
        });
      }
    });
    
    if (newUnlocked.length !== unlockedFeatures.length) {
      setUnlockedFeatures(newUnlocked);
      return newUnlocked.filter(f => !unlockedFeatures.includes(f)); // Return newly unlocked features
    }
    
    return [];
  };
  
  // Add XP and handle level up
  const addXp = (amount) => {
    const newXp = xp + amount;
    let newLevel = level;
    let currentXp = newXp;
    let xpForNextLevel = xpToNextLevel;
    
    // Handle level up (possibly multiple levels)
    while (currentXp >= xpForNextLevel) {
      currentXp -= xpForNextLevel;
      newLevel++;
      xpForNextLevel = calculateXpToNextLevel(newLevel);
    }
    
    // Update state
    setXp(currentXp);
    
    // If level changed
    if (newLevel !== level) {
      setLevel(newLevel);
      setXpToNextLevel(xpForNextLevel);
      
      // Check rank change
      const newRank = determineRank(newLevel);
      if (newRank !== rank) {
        setRank(newRank);
      }
      
      // Check for unlockables
      const newlyUnlocked = checkUnlockables(newLevel);
      
      return { 
        leveledUp: true, 
        newLevel, 
        rankChanged: newRank !== rank, 
        newRank, 
        newlyUnlocked 
      };
    }
    
    return { leveledUp: false };
  };
  
  // Check if a feature is unlocked
  const isFeatureUnlocked = (featureName) => {
    return unlockedFeatures.includes(featureName);
  };
  
  // Get current rank data
  const getCurrentRankData = () => {
    return RANKS[rank] || RANKS.E_RANK;
  };
  
  // Calculate XP progress percentage
  const getXpProgressPercentage = () => {
    return (xp / xpToNextLevel) * 100;
  };
  
  // Initialize XP to next level on first render
  useEffect(() => {
    setXpToNextLevel(calculateXpToNextLevel(level));
  }, []);
  
  const value = {
    level,
    xp,
    xpToNextLevel,
    rank,
    unlockedFeatures,
    addXp,
    isFeatureUnlocked,
    getCurrentRankData,
    getXpProgressPercentage,
    RANKS
  };
  
  return (
    <UserLevelContext.Provider value={value}>
      {children}
    </UserLevelContext.Provider>
  );
};

// Custom hook for using the context
export const useUserLevel = () => {
  const context = useContext(UserLevelContext);
  if (!context) {
    throw new Error('useUserLevel must be used within a UserLevelProvider');
  }
  return context;
};