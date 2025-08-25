import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUserLevel } from '../context/UserLevelContext';

const VideoTutorials = () => {
  const { level, rank } = useUserLevel();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Mock video data
  useEffect(() => {
    const mockVideos = [
      {
        id: 1,
        title: 'Proper Squat Form for Beginners',
        thumbnail: '/thumbnails/squat-form.jpg',
        duration: '4:32',
        category: 'form',
        difficulty: 'beginner',
        requiredLevel: 1,
        description: 'Learn the basics of proper squat form to prevent injuries and maximize gains.'
      },
      {
        id: 2,
        title: 'Bench Press Technique Guide',
        thumbnail: '/thumbnails/bench-press.jpg',
        duration: '6:15',
        category: 'form',
        difficulty: 'beginner',
        requiredLevel: 1,
        description: 'Master the bench press with this comprehensive guide for beginners.'
      },
      {
        id: 3,
        title: 'Full Body HIIT Workout',
        thumbnail: '/thumbnails/hiit-workout.jpg',
        duration: '18:45',
        category: 'workout',
        difficulty: 'intermediate',
        requiredLevel: 5,
        description: 'A high-intensity interval training workout that targets your entire body.'
      },
      {
        id: 4,
        title: 'Advanced Deadlift Variations',
        thumbnail: '/thumbnails/deadlift-variations.jpg',
        duration: '12:20',
        category: 'form',
        difficulty: 'advanced',
        requiredLevel: 15,
        description: 'Take your deadlift to the next level with these advanced variations.'
      },
      {
        id: 5,
        title: 'Mobility Routine for Lifters',
        thumbnail: '/thumbnails/mobility.jpg',
        duration: '10:05',
        category: 'mobility',
        difficulty: 'beginner',
        requiredLevel: 3,
        description: 'Improve your lifting performance with this essential mobility routine.'
      },
      {
        id: 6,
        title: '30-Day Strength Program',
        thumbnail: '/thumbnails/strength-program.jpg',
        duration: '8:50',
        category: 'program',
        difficulty: 'intermediate',
        requiredLevel: 10,
        description: 'Overview of a comprehensive 30-day strength building program.'
      },
      {
        id: 7,
        title: 'Olympic Lifting Basics',
        thumbnail: '/thumbnails/olympic-lifting.jpg',
        duration: '15:30',
        category: 'form',
        difficulty: 'advanced',
        requiredLevel: 20,
        description: 'Introduction to the clean and jerk and snatch for serious lifters.'
      },
      {
        id: 8,
        title: 'Core Stability Exercises',
        thumbnail: '/thumbnails/core-stability.jpg',
        duration: '7:45',
        category: 'workout',
        difficulty: 'beginner',
        requiredLevel: 2,
        description: 'Build a strong foundation with these essential core stability exercises.'
      },
      {
        id: 9,
        title: 'Nutrition for Muscle Growth',
        thumbnail: '/thumbnails/nutrition.jpg',
        duration: '11:20',
        category: 'nutrition',
        difficulty: 'intermediate',
        requiredLevel: 8,
        description: 'Learn how to eat for optimal muscle growth and recovery.'
      },
      {
        id: 10,
        title: 'Recovery Techniques for Athletes',
        thumbnail: '/thumbnails/recovery.jpg',
        duration: '9:15',
        category: 'recovery',
        difficulty: 'intermediate',
        requiredLevel: 12,
        description: 'Advanced recovery methods to help you bounce back faster between workouts.'
      },
      {
        id: 11,
        title: 'Bodyweight Workout for Beginners',
        thumbnail: '/thumbnails/bodyweight.jpg',
        duration: '14:25',
        category: 'workout',
        difficulty: 'beginner',
        requiredLevel: 1,
        description: 'No equipment needed for this effective full-body workout.'
      },
      {
        id: 12,
        title: 'Advanced Calisthenics Tutorial',
        thumbnail: '/thumbnails/calisthenics.jpg',
        duration: '20:10',
        category: 'form',
        difficulty: 'advanced',
        requiredLevel: 25,
        description: 'Master impressive bodyweight skills like the muscle-up and front lever.'
      }
    ];

    setVideos(mockVideos);
    setFilteredVideos(mockVideos.filter(video => video.requiredLevel <= level));
  }, [level]);

  // Apply filters when they change
  useEffect(() => {
    let result = videos.filter(video => video.requiredLevel <= level);
    
    if (selectedCategory !== 'all') {
      result = result.filter(video => video.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      result = result.filter(video => video.difficulty === selectedDifficulty);
    }
    
    setFilteredVideos(result);
  }, [selectedCategory, selectedDifficulty, videos, level]);

  return (
    <TutorialsContainer>
      <TutorialsHeader>
        <h2>Video Tutorials</h2>
        <p>Learn proper form and techniques from expert trainers</p>
      </TutorialsHeader>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Category</FilterLabel>
          <FilterSelect 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="form">Form & Technique</option>
            <option value="workout">Workouts</option>
            <option value="mobility">Mobility</option>
            <option value="program">Programs</option>
            <option value="nutrition">Nutrition</option>
            <option value="recovery">Recovery</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Difficulty</FilterLabel>
          <FilterSelect 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>

      <VideosGrid>
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <VideoCard 
              key={video.id}
              as={motion.div}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThumbnailContainer>
                <ThumbnailPlaceholder difficulty={video.difficulty} />
                <VideoDuration>{video.duration}</VideoDuration>
              </ThumbnailContainer>
              <VideoDetails>
                <VideoTitle>{video.title}</VideoTitle>
                <VideoDescription>{video.description}</VideoDescription>
                <VideoMeta>
                  <VideoTag category={video.category}>
                    {video.category}
                  </VideoTag>
                  <VideoTag difficulty={video.difficulty}>
                    {video.difficulty}
                  </VideoTag>
                </VideoMeta>
              </VideoDetails>
            </VideoCard>
          ))
        ) : (
          <NoVideosMessage>
            No videos match your current filters or level.
            {level < 25 && (
              <div>More advanced tutorials will unlock as you level up!</div>
            )}
          </NoVideosMessage>
        )}
      </VideosGrid>

      {level < 100 && (
        <LockedFeatureCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <LockedIcon>🔒</LockedIcon>
          <LockedContent>
            <h3>AI Coach Chat</h3>
            <p>Get personalized training advice from our AI coach</p>
            <LockedLevel>Unlocks at Level 100</LockedLevel>
            <ProgressBar>
              <ProgressFill width={(level / 100) * 100} />
            </ProgressBar>
            <ProgressText>{level}/100</ProgressText>
          </LockedContent>
        </LockedFeatureCard>
      )}
    </TutorialsContainer>
  );
};

const TutorialsContainer = styled.div`
  padding: 1rem;
`;

const TutorialsHeader = styled.div`
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

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: var(--primary-dark);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  font-weight: 500;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--secondary-dark);
  background-color: var(--secondary-dark);
  color: var(--text-light);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-purple);
  }
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const VideoCard = styled.div`
  background-color: var(--primary-dark);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
`;

const ThumbnailContainer = styled.div`
  position: relative;
`;

const ThumbnailPlaceholder = styled.div`
  height: 180px;
  background: linear-gradient(135deg, 
    ${props => {
      switch(props.difficulty) {
        case 'beginner': return 'var(--accent-blue), var(--secondary-dark)';
        case 'intermediate': return 'var(--accent-purple), var(--secondary-dark)';
        case 'advanced': return 'var(--accent-pink), var(--secondary-dark)';
        default: return 'var(--secondary-dark), var(--primary-dark)';
      }
    }});
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:after {
    content: '▶';
    font-size: 2.5rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const VideoDuration = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const VideoDetails = styled.div`
  padding: 1rem;
`;

const VideoTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--text-light);
  line-height: 1.4;
`;

const VideoDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

const VideoMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const VideoTag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  
  ${props => props.category && `
    background-color: rgba(123, 179, 255, 0.2);
    color: var(--accent-blue);
  `}
  
  ${props => props.difficulty && `
    background-color: ${props.difficulty === 'beginner' ? 'rgba(123, 179, 255, 0.2)' : 
                      props.difficulty === 'intermediate' ? 'rgba(158, 55, 159, 0.2)' : 
                      'rgba(232, 106, 240, 0.2)'};
    color: ${props.difficulty === 'beginner' ? 'var(--accent-blue)' : 
            props.difficulty === 'intermediate' ? 'var(--accent-purple)' : 
            'var(--accent-pink)'};
  `}
`;

const NoVideosMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: var(--primary-dark);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 1.125rem;
  
  div {
    margin-top: 1rem;
    color: var(--accent-pink);
    font-weight: 500;
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

export default VideoTutorials;