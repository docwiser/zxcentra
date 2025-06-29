'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // 3D perspective effect
        const perspective = 1000;
        const scale = perspective / (perspective + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        // Wrap around edges
        if (particle.x > canvas.width / 2) particle.x = -canvas.width / 2;
        if (particle.x < -canvas.width / 2) particle.x = canvas.width / 2;
        if (particle.y > canvas.height / 2) particle.y = -canvas.height / 2;
        if (particle.y < -canvas.height / 2) particle.y = canvas.height / 2;
        if (particle.z > 1000) particle.z = -1000;
        if (particle.z < -1000) particle.z = 1000;

        // Draw particle
        const size = particle.size * scale;
        const opacity = particle.opacity * scale;

        if (size > 0.1 && x2d >= 0 && x2d <= canvas.width && y2d >= 0 && y2d <= canvas.height) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.fill();

          // Add glow effect
          ctx.shadowBlur = size * 2;
          ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Connect nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const dz = particle.z - otherParticle.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 100) {
              const otherScale = perspective / (perspective + otherParticle.z);
              const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
              const otherY2d = otherParticle.y * otherScale + canvas.height / 2;

              const lineOpacity = (1 - distance / 100) * 0.1 * Math.min(scale, otherScale);

              if (lineOpacity > 0.01) {
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                ctx.lineTo(otherX2d, otherY2d);
                ctx.strokeStyle = `rgba(59, 130, 246, ${lineOpacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}