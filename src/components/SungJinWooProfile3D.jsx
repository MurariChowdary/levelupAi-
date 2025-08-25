import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, useAnimations, Stars } from '@react-three/drei';
import { useUserLevel } from '../context/UserLevelContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Character model component
const Character = ({ level }) => {
  const group = useRef();
  const { level: userLevel, rank, getCurrentRankData } = useUserLevel();
  const rankData = getCurrentRankData();
  
  // Animation ref
  const mixer = useRef();
  
  // Rotate the character slowly and handle animations
  useFrame((state, delta) => {
    if (group.current) {
      // Smoother rotation with slight bobbing motion for more lifelike appearance
      group.current.rotation.y += delta * 0.2;
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
    
    // Update animations
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });
  
  // Character evolution based on level - Sung Jin-Woo grows stronger and taller
  const getCharacterScale = () => {
    if (userLevel < 10) return 1.0; // E-Rank Hunter (weak)
    if (userLevel < 25) return 1.1; // D-Rank Hunter
    if (userLevel < 50) return 1.2; // C-Rank Hunter
    if (userLevel < 100) return 1.3; // B-Rank Hunter
    if (userLevel < 150) return 1.4; // A-Rank Hunter
    return 1.5; // S-Rank Hunter (Shadow Monarch)
  };
  
  // Aura color based on rank - Shadow Monarch theme with purple/blue hues
  const getAuraColor = () => {
    switch (rank) {
      case 'SHADOW_MONARCH': return new THREE.Color(0x7209b7); // Deep purple (Shadow Monarch)
      case 'S_RANK': return new THREE.Color(0x8a2be2); // Blue violet
      case 'A_RANK': return new THREE.Color(0x9370db); // Medium purple
      case 'B_RANK': return new THREE.Color(0x6a5acd); // Slate blue
      case 'C_RANK': return new THREE.Color(0x4a4a6a); // Dark blue-gray
      case 'D_RANK': return new THREE.Color(0x3a3a5a); // Darker blue-gray
      case 'E_RANK': return new THREE.Color(0x888888); // Gray
      default: return new THREE.Color(0x888888);
    }
  };
  
  // Enhanced character model with more details and animations
  return (
    <group ref={group} position={[0, -1, 0]} scale={[getCharacterScale(), getCharacterScale(), getCharacterScale()]}>
      {/* Body - Sung Jin-Woo's sleek hunter outfit */}
      <mesh castShadow>
        <cylinderGeometry args={[0.35, 0.5, 1.8, 8]} />
        <meshStandardMaterial 
          color={rank === 'LEGENDARY' ? '#1a1a2e' : '#373854'} 
          metalness={rank === 'LEGENDARY' ? 0.5 : 0.2}
          roughness={rank === 'LEGENDARY' ? 0.3 : 0.8}
        />
      </mesh>
      
      {/* Chest plate - Shadow Monarch armor */}
      <mesh castShadow position={[0, 0.3, 0.2]}>
        <boxGeometry args={[0.7, 0.5, 0.2]} />
        <meshStandardMaterial 
          color={userLevel >= 50 ? '#16213e' : '#2a2a3a'} 
          metalness={0.7} 
          roughness={0.2} 
          emissive={userLevel >= 100 ? new THREE.Color(0x7209b7) : '#000000'}
          emissiveIntensity={userLevel >= 100 ? 0.3 : 0}
        />
      </mesh>
      
      {/* Shadow Monarch emblem - appears at high levels */}
      {userLevel >= 100 && (
        <mesh castShadow position={[0, 0.3, 0.31]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial 
            color="#7209b7" 
            emissive="#7209b7"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}
      
      {/* Head - Sung Jin-Woo with sharp facial features */}
      <mesh castShadow position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color={userLevel >= 50 ? "#e0e0e0" : "#F5D0C5"} 
          metalness={userLevel >= 100 ? 0.2 : 0}
          roughness={userLevel >= 100 ? 0.7 : 1}
        />
      </mesh>
      
      {/* Hair - black hair covering part of forehead */}
      <mesh castShadow position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.1}
          roughness={0.9}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Eyes - glowing purple for Shadow Monarch powers */}
      <mesh position={[0.15, 1.25, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={userLevel >= 25 ? "#9c27b0" : '#000000'} 
          emissive={userLevel >= 25 ? "#9c27b0" : '#000000'}
          emissiveIntensity={userLevel >= 25 ? 3 : 0}
        />
      </mesh>
      <mesh position={[-0.15, 1.25, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={userLevel >= 25 ? "#9c27b0" : '#000000'} 
          emissive={userLevel >= 25 ? "#9c27b0" : '#000000'}
          emissiveIntensity={userLevel >= 25 ? 3 : 0}
        />
      </mesh>
      
      {/* Arms - Sung Jin-Woo's muscular arms with shadow armor */}
      <mesh castShadow position={[0.6, 0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 1.2, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={userLevel >= 50 ? '#16213e' : (userLevel >= 10 ? '#4a4a6a' : '#373854')} 
          metalness={userLevel >= 50 ? 0.6 : 0.4} 
          roughness={userLevel >= 50 ? 0.4 : 0.6} 
          emissive={userLevel >= 100 ? new THREE.Color(0x7209b7) : '#000000'}
          emissiveIntensity={userLevel >= 100 ? 0.2 : 0}
        />
      </mesh>
      <mesh castShadow position={[-0.6, 0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 1.2, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={userLevel >= 50 ? '#16213e' : (userLevel >= 10 ? '#4a4a6a' : '#373854')} 
          metalness={userLevel >= 50 ? 0.6 : 0.4} 
          roughness={userLevel >= 50 ? 0.4 : 0.6} 
          emissive={userLevel >= 100 ? new THREE.Color(0x7209b7) : '#000000'}
          emissiveIntensity={userLevel >= 100 ? 0.2 : 0}
        />
      </mesh>
      
      {/* Legs - Sung Jin-Woo's athletic legs with shadow armor */}
      <mesh castShadow position={[0.2, -1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
        <meshStandardMaterial 
          color={userLevel >= 50 ? '#16213e' : (userLevel >= 10 ? '#4a4a6a' : '#373854')} 
          metalness={userLevel >= 50 ? 0.6 : 0.4} 
          roughness={userLevel >= 50 ? 0.4 : 0.6} 
          emissive={userLevel >= 100 ? new THREE.Color(0x7209b7) : '#000000'}
          emissiveIntensity={userLevel >= 100 ? 0.2 : 0}
        />
      </mesh>
      <mesh castShadow position={[-0.2, -1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
        <meshStandardMaterial 
          color={userLevel >= 50 ? '#16213e' : (userLevel >= 10 ? '#4a4a6a' : '#373854')} 
          metalness={userLevel >= 50 ? 0.6 : 0.4} 
          roughness={userLevel >= 50 ? 0.4 : 0.6} 
          emissive={userLevel >= 100 ? new THREE.Color(0x7209b7) : '#000000'}
          emissiveIntensity={userLevel >= 100 ? 0.2 : 0}
        />
      </mesh>
      
      {/* Shadow Monarch Aura - dark mist with purple glow */}
      {userLevel >= 10 && (
        <>
          <mesh position={[0, 0, -0.5]}>
            <sphereGeometry args={[1.5 + (userLevel >= 100 ? 0.5 : 0), 32, 32]} />
            <meshStandardMaterial 
              color={"#000000"} 
              transparent={true} 
              opacity={0.2 + (userLevel >= 50 ? 0.1 : 0)} 
              emissive={getAuraColor()} 
              emissiveIntensity={2 + (userLevel >= 100 ? 1 : 0)} 
            />
          </mesh>
          
          {/* Shadow tendrils for higher levels */}
          {userLevel >= 50 && (
            <group>
              {[...Array(8)].map((_, i) => (
                <mesh 
                  key={i} 
                  position={[0, 0, -0.3]} 
                  rotation={[0, (Math.PI * 2 / 8) * i, 0]}
                >
                  <torusGeometry args={[1.8, 0.05, 16, 100, Math.PI / 4]} />
                  <meshStandardMaterial 
                    color={"#000000"} 
                    transparent={true} 
                    opacity={0.6} 
                    emissive={getAuraColor()} 
                    emissiveIntensity={1.5} 
                  />
                </mesh>
              ))}
            </group>
          )}
          
          {/* Shadow particles */}
          {userLevel >= 75 && (
            <group>
              {[...Array(20)].map((_, i) => {
                const radius = 1.5 + Math.random() * 0.5;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.sin(phi) * Math.sin(theta);
                const z = radius * Math.cos(phi);
                
                return (
                  <mesh key={i} position={[x, y, z]}>
                    <sphereGeometry args={[0.03 + Math.random() * 0.02, 8, 8]} />
                    <meshStandardMaterial 
                      color={"#000000"} 
                      emissive={getAuraColor()} 
                      emissiveIntensity={2} 
                      transparent={true}
                      opacity={0.7}
                    />
                  </mesh>
                );
              })}
            </group>
          )}
        </>
      )}
      
      {/* Weapon/Equipment based on level - Shadow Monarch's Dagger */}
      {userLevel >= 25 && (
        <group position={[0.5, 0.2, 0.3]} rotation={[0, 0, Math.PI / 4]}>
          {/* Dagger handle */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Dagger blade */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.08, 0.8, 0.02]} />
            <meshStandardMaterial 
              color={userLevel >= 100 ? '#16213e' : '#7b7b7b'} 
              metalness={0.9} 
              roughness={0.1} 
              emissive={userLevel >= 100 ? '#7209b7' : '#7b7b7b'} 
              emissiveIntensity={userLevel >= 100 ? 1 : 0.3} 
            />
          </mesh>
          
          {/* Shadow energy on blade */}
          {userLevel >= 75 && (
            <mesh position={[0, 0.5, 0]} scale={[1.2, 1.2, 1.2]}>
              <boxGeometry args={[0.08, 0.8, 0.02]} />
              <meshStandardMaterial 
                color={"#000000"}
                transparent={true}
                opacity={0.7}
                emissive={getAuraColor()}
                emissiveIntensity={2}
              />
            </mesh>
          )}
        </group>
      )}
      
      {/* Shadow Extraction Orb - Sung Jin-Woo's power source */}
      {userLevel >= 50 && (
        <group position={[-0.5, 0.2, 0.3]}>
          <mesh rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={"#000000"} 
              transparent={true} 
              opacity={0.8} 
              emissive={getAuraColor()} 
              emissiveIntensity={3} 
            />
          </mesh>
          
          {/* Shadow core */}
          <mesh rotation={[0, 0, 0]} scale={[0.7, 0.7, 0.7]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={getAuraColor()} 
              emissive={getAuraColor()} 
              emissiveIntensity={2} 
            />
          </mesh>
          
          {/* Shadow particles */}
          {userLevel >= 75 && [
            [0.3, 0, 0, 0.05],
            [0, 0.3, 0, 0.04],
            [0, 0, 0.3, 0.03],
            [0.25, 0.25, 0, 0.04],
            [0, 0.25, 0.25, 0.03],
            [0.25, 0, 0.25, 0.05]
          ].map((particle, i) => (
            <mesh 
              key={i}
              position={[
                particle[0] * Math.cos(i * 0.5),
                particle[1] * Math.sin(i * 0.5),
                particle[2] * Math.cos(i * 0.5)
              ]}
            >
              <sphereGeometry args={[particle[3], 8, 8]} />
              <meshStandardMaterial 
                color={"#000000"} 
                emissive={getAuraColor()} 
                emissiveIntensity={3} 
                transparent={true}
                opacity={0.9}
              />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Shadow Monarch Crown - appears for highest ranks */}
      {(rank === 'SHADOW_MONARCH' || rank === 'S_RANK') && (
        <group>
          <mesh position={[0, 1.7, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.15, 8, 1, true]} />
            <meshStandardMaterial 
              color="#16213e" 
              metalness={0.9} 
              roughness={0.1} 
              emissive="#7209b7" 
              emissiveIntensity={0.5} 
            />
          </mesh>
          
          {/* Crown spikes */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <mesh 
              key={i} 
              position={[
                0.35 * Math.cos(i * Math.PI / 3),
                0.1,
                0.35 * Math.sin(i * Math.PI / 3)
              ]}
            >
              <coneGeometry args={[0.05, 0.2, 8]} />
              <meshStandardMaterial 
                color="#16213e" 
                metalness={0.9} 
                roughness={0.1} 
                emissive="#7209b7" 
                emissiveIntensity={0.5} 
              />
            </mesh>
          ))}
          
          {/* Shadow energy around crown */}
          <mesh position={[0, 1.7, 0]} rotation={[0, 0, 0]} scale={[1.1, 1, 1.1]}>
            <cylinderGeometry args={[0.3, 0.4, 0.15, 16, 1, true]} />
            <meshStandardMaterial 
              color="#000000" 
              transparent={true}
              opacity={0.7}
              emissive="#7209b7" 
              emissiveIntensity={1.5} 
            />
          </mesh>
        </group>
      )}
      
      {/* Dynamic lighting effects */}
      {userLevel >= 50 && (
        <pointLight 
          position={[0, 0, 0]} 
          intensity={0.5 + (userLevel >= 100 ? 0.5 : 0)} 
          distance={3 + (userLevel >= 100 ? 2 : 0)} 
          color={getAuraColor()} 
        />
      )}
      
      {/* Shadow Monarch ground effect - shadow circle with runes */}
      {userLevel >= 100 && (
        <group>
          <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 2, 32]} />
            <meshStandardMaterial 
              color={"#000000"} 
              transparent={true} 
              opacity={0.5} 
              emissive={getAuraColor()} 
              emissiveIntensity={1.5} 
            />
          </mesh>
          
          {/* Inner shadow circle */}
          <mesh position={[0, -1.99, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.5, 32]} />
            <meshStandardMaterial 
              color={getAuraColor()} 
              transparent={true} 
              opacity={0.7} 
              emissive={getAuraColor()} 
              emissiveIntensity={2} 
            />
          </mesh>
          
          {/* Shadow Soldier Summon Effect - only for highest levels */}
          {userLevel >= 150 && [
            [-1.5, -1.8, -1.5],
            [1.5, -1.8, -1.5],
            [0, -1.8, -2],
          ].map((position, i) => (
            <group key={i} position={position}>
              {/* Shadow Soldier silhouette */}
              <mesh scale={[0.4, 0.8, 0.2]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial 
                  color={"#000000"} 
                  transparent={true} 
                  opacity={0.8} 
                  emissive={getAuraColor()} 
                  emissiveIntensity={0.5} 
                />
              </mesh>
              
              {/* Shadow Soldier head */}
              <mesh position={[0, 0.6, 0]} scale={[0.3, 0.3, 0.3]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial 
                  color={"#000000"} 
                  transparent={true} 
                  opacity={0.8} 
                  emissive={getAuraColor()} 
                  emissiveIntensity={0.5} 
                />
              </mesh>
              
              {/* Shadow effect around soldier */}
              <mesh scale={[0.5, 0.9, 0.3]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial 
                  color={"#000000"} 
                  transparent={true} 
                  opacity={0.3} 
                  emissive={getAuraColor()} 
                  emissiveIntensity={1} 
                />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
};

// Scene setup with enhanced lighting and effects
const Scene = () => {
  const { camera } = useThree();
  const { level: userLevel, rank } = useUserLevel();
  
  useEffect(() => {
    // Adjust camera position based on level
    camera.position.set(0, 0, 5);
    camera.fov = 45 - (userLevel > 100 ? 5 : 0); // Tighter FOV for higher levels
    camera.updateProjectionMatrix();
  }, [camera, userLevel]);
  
  return (
    <>
      {/* Dynamic lighting based on rank */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        color={rank === 'LEGENDARY' ? '#fffacd' : '#ffffff'}
      />
      
      {/* Spotlight effect for higher ranks */}
      {rank !== 'NOVICE' && (
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={0.5} 
          color={rank === 'LEGENDARY' ? '#fffacd' : '#ffffff'}
          castShadow
        />
      )}
      
      {/* Character */}
      <Character />
      
      {/* Enhanced background effects */}
      <Stars 
        radius={100} 
        depth={50} 
        count={rank === 'LEGENDARY' ? 7000 : 5000} 
        factor={4} 
        saturation={rank === 'LEGENDARY' ? 1 : 0} 
        fade 
        speed={rank === 'LEGENDARY' ? 2 : 1} 
      />
      
      {/* Ground plane with shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      
      {/* Enhanced controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI/3} 
        maxPolarAngle={Math.PI/2}
        autoRotate={rank === 'LEGENDARY'} 
        autoRotateSpeed={1} 
      />
    </>
  );
};

// Main component with enhanced UI and interactivity
const SungJinWooProfile3D = () => {
  const { level, rank, xp, xpToNextLevel } = useUserLevel();
  const [showInfo, setShowInfo] = useState(false);
  
  // Calculate XP percentage
  const xpPercentage = Math.min(100, Math.round((xp / xpToNextLevel) * 100));
  
  return (
    <CharacterContainer>
      <Canvas shadows>
        <Scene />
      </Canvas>
      
      {/* Enhanced character info with animations */}
      <CharacterInfo
        as={motion.div}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RankBadge 
          rank={rank}
          as={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {rank}
        </RankBadge>
        
        <LevelContainer>
          <LevelIndicator
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInfo(!showInfo)}
          >
            LEVEL {level}
          </LevelIndicator>
          
          <XPProgressBar>
            <XPProgress width={xpPercentage} rank={rank === 'LEGENDARY' ? 'LEGENDARY' : rank} />
            <XPText>{xp} / {xpToNextLevel} XP</XPText>
          </XPProgressBar>
        </LevelContainer>
      </CharacterInfo>
      
      {/* Character stats popup */}
      {showInfo && (
        <CharacterStats
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <StatsHeader>
            <h3>Hunter Stats</h3>
            <CloseButton onClick={() => setShowInfo(false)}>×</CloseButton>
          </StatsHeader>
          
          <StatsList>
            <StatItem>
              <StatLabel>Strength</StatLabel>
              <StatValue filled={Math.floor(level * 1.5) > 50 ? "true" : undefined}>{Math.floor(level * 1.5)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Agility</StatLabel>
              <StatValue filled={Math.floor(level * 1.2) > 50 ? "true" : undefined}>{Math.floor(level * 1.2)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Endurance</StatLabel>
              <StatValue filled={Math.floor(level * 1.3) > 50 ? "true" : undefined}>{Math.floor(level * 1.3)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Intelligence</StatLabel>
              <StatValue filled={Math.floor(level * 1.1) > 50 ? "true" : undefined}>{Math.floor(level * 1.1)}</StatValue>
            </StatItem>
          </StatsList>
        </CharacterStats>
      )}
    </CharacterContainer>
  );
};

const CharacterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(to bottom, #16213e, #0f0f1a);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(114, 9, 183, 0.3);
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    height: 400px;
  }
`;

const CharacterInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(22, 33, 62, 0.8);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(114, 9, 183, 0.4);
  border: 1px solid rgba(114, 9, 183, 0.3);
`;

const RankBadge = styled.div`
  background-color: ${props => {
    switch (props.rank) {
      case 'SHADOW_MONARCH': return 'linear-gradient(135deg, #16213e 0%, #7209b7 100%)';
      case 'S_RANK': return 'rgba(74, 14, 143, 0.8)';
      case 'A_RANK': return 'rgba(58, 16, 120, 0.8)';
      case 'B_RANK': return 'rgba(45, 46, 139, 0.8)';
      case 'C_RANK': return 'rgba(30, 49, 99, 0.8)';
      case 'D_RANK': return 'rgba(28, 40, 80, 0.8)';
      case 'E_RANK': return 'rgba(26, 26, 46, 0.8)';
      default: return 'rgba(26, 26, 46, 0.8)';
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 5px;
  box-shadow: ${props => props.rank === 'SHADOW_MONARCH' ? '0 0 15px rgba(114, 9, 183, 0.7)' : 'none'};
  animation: ${props => props.rank === 'SHADOW_MONARCH' ? 'glow 2s infinite' : 'none'};
  background: ${props => props.rank === 'SHADOW_MONARCH' ? 'linear-gradient(135deg, #16213e 0%, #7209b7 100%)' : ''};
  text-shadow: ${props => props.rank === 'SHADOW_MONARCH' ? '0 0 5px rgba(255, 255, 255, 0.7)' : 'none'};
  border: ${props => props.rank === 'SHADOW_MONARCH' ? '1px solid rgba(114, 9, 183, 0.7)' : 'none'};
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
`;

const LevelIndicator = styled.div`
  background-color: rgba(22, 33, 62, 0.7);
  color: #e5e5e5;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-shadow: ${props => {
    switch(props.rank) {
      case 'SHADOW_MONARCH': return '0 0 8px rgba(114, 9, 183, 0.9)';
      case 'S_RANK': return '0 0 6px rgba(114, 9, 183, 0.8)';
      case 'A_RANK': return '0 0 5px rgba(114, 9, 183, 0.7)';
      case 'B_RANK': return '0 0 4px rgba(114, 9, 183, 0.6)';
      case 'C_RANK': return '0 0 3px rgba(114, 9, 183, 0.5)';
      default: return 'none';
    }
  }};
  
  &:hover {
    background-color: rgba(114, 9, 183, 0.3);
    box-shadow: 0 0 10px rgba(114, 9, 183, 0.3);
  }
`;

const XPProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: rgba(15, 15, 26, 0.8);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(114, 9, 183, 0.3);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
`;

const XPProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.width}%;
  background: ${props => {
    switch (props.rank) {
      case 'SHADOW_MONARCH': return 'linear-gradient(to right, #7209b7, #560bad)';
      case 'S_RANK': return 'linear-gradient(to right, #560bad, #7209b7)';
      case 'A_RANK': return 'linear-gradient(to right, #480ca8, #560bad)';
      case 'B_RANK': return 'linear-gradient(to right, #3f37c9, #480ca8)';
      case 'C_RANK': return 'linear-gradient(to right, #4361ee, #4895ef)';
      case 'D_RANK': return 'linear-gradient(to right, #4895ef, #4cc9f0)';
      case 'E_RANK': return 'linear-gradient(to right, #3a0ca3, #3f37c9)';
      default: return 'linear-gradient(to right, #3a0ca3, #3f37c9)';
    }
  }};
  transition: width 0.5s ease-out;
  box-shadow: ${props => {
    switch(props.rank) {
      case 'SHADOW_MONARCH': return '0 0 15px rgba(114, 9, 183, 0.9), 0 0 5px rgba(114, 9, 183, 0.7) inset';
      case 'S_RANK': return '0 0 12px rgba(114, 9, 183, 0.8), 0 0 4px rgba(114, 9, 183, 0.6) inset';
      case 'A_RANK': return '0 0 10px rgba(114, 9, 183, 0.7)';
      case 'B_RANK': return '0 0 8px rgba(114, 9, 183, 0.5)';
      default: return 'none';
    }
  }};
`;

const XPText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e5e5e5;
  font-size: 0.6rem;
  font-weight: bold;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.9), 0 0 5px rgba(114, 9, 183, 0.5);
  white-space: nowrap;
`;

const CharacterStats = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(22, 33, 62, 0.9);
  border-radius: 10px;
  padding: 15px;
  width: 200px;
  z-index: 20;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(114, 9, 183, 0.3);
  border: 1px solid ${props => {
    switch (props.rank) {
      case 'SHADOW_MONARCH': return '#7209b7';
      case 'S_RANK': return '#560bad';
      case 'A_RANK': return '#480ca8';
      case 'B_RANK': return '#3a0ca3';
      case 'C_RANK': return '#4361ee';
      case 'D_RANK': return '#4895ef';
      case 'E_RANK': return '#3a0ca3';
      default: return '#3a0ca3';
    }
  }};
  backdrop-filter: blur(5px);
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(114, 9, 183, 0.3);
  padding-bottom: 8px;
  
  h3 {
    margin: 0;
    color: #e5e5e5;
    font-size: 1rem;
    text-shadow: 0 0 5px rgba(114, 9, 183, 0.5);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #e5e5e5;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: all 0.2s;
  
  &:hover {
    color: #7209b7;
    text-shadow: 0 0 8px rgba(114, 9, 183, 0.7);
  }
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: rgba(22, 33, 62, 0.8);
  border-radius: 5px;
  border: 1px solid rgba(114, 9, 183, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(114, 9, 183, 0.3);
    border: 1px solid rgba(114, 9, 183, 0.4);
  }
`;

const StatLabel = styled.span`
  color: #b8b8b8;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatValue = styled.span`
  color: #e5e5e5;
  font-weight: bold;
  font-size: 0.9rem;
  text-shadow: ${props => props.filled === "true" ? '0 0 8px rgba(114, 9, 183, 0.7)' : 'none'};
`;

export default SungJinWooProfile3D;