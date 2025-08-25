import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ParticleBackground = ({ color = '#8A2BE2', count = 50, speed = 1, size = 2, opacity = 0.5 }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      // Recreate particles when canvas is resized
      createParticles();
    };
    
    // Create particles
    const createParticles = () => {
      particles = [];
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * size + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * opacity + 0.1
        });
      }
    };
    
    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', `, ${particle.opacity})`);
        ctx.fill();
        
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      // Draw connections between particles
      drawConnections();
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    // Draw connections between nearby particles
    const drawConnections = () => {
      const maxDistance = 100;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Line opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = color.replace(')', `, ${opacity * 0.2})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };
    
    // Initialize
    resizeCanvas();
    drawParticles();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count, speed, size, opacity]);
  
  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export default ParticleBackground;