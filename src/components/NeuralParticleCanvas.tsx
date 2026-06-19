import React, { useEffect, useRef } from 'react';

export const NeuralParticleCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions first
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Track mouse
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180, // influence radius
    };

    // Keep track of particles
    const particleCount = Math.min(Math.floor((width * height) / 11000), 120);
    const minParticles = 40;
    const finalCount = Math.max(particleCount, minParticles);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;
      pulseScale: number;
      glowIntensity: number;
      targetGlow: number;
      color: string;
      hitWaves: Set<number>; // Wave IDs that have affected this particle
    }

    interface PulseWave {
      id: number;
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;
      thickness: number;
    }

    const particles: Particle[] = [];
    let pulseWaves: PulseWave[] = [];
    let waveIdCounter = 0;

    // Initialize particles
    for (let i = 0; i < finalCount; i++) {
      const radius = Math.random() * 1.5 + 1.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: radius,
        radius: radius,
        pulseScale: 1,
        glowIntensity: 0,
        targetGlow: 0,
        color: '#172554', // Match the designer blue text
        hitWaves: new Set(),
      });
    }

    // Function to add a pulse wave
    const triggerPulse = (x: number, y: number, isBig = false) => {
      const id = ++waveIdCounter;
      pulseWaves.push({
        id,
        x,
        y,
        radius: 0,
        maxRadius: isBig ? Math.max(width, height) * 1.2 : 320,
        speed: isBig ? 6 : 4.5,
        opacity: 0.9,
        thickness: isBig ? 3.5 : 2,
      });
    };

    // Auto periodic central trigger (Central Heartbeat Pulse) Every 5 seconds
    const interval = setInterval(() => {
      triggerPulse(width / 2, height / 2, true);
    }, 4500);

    // Click handler to trigger custom pulse waves
    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      triggerPulse(x, y, false);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Apply event listeners
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleMouseClick);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Resize handling using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = entry.contentRect.width || container.clientWidth;
      const newHeight = entry.contentRect.height || container.clientHeight;

      width = newWidth;
      height = newHeight;
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Wrap-around particles outside new boundaries
      particles.forEach((p) => {
        if (p.x > newWidth) p.x = Math.random() * newWidth;
        if (p.y > newHeight) p.y = Math.random() * newHeight;
      });
    });

    resizeObserver.observe(container);

    let animationFrameId: number;

    const connectionMaxDist = 145;

    // Animation Loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw Pulse Waves (expanding circles)
      pulseWaves = pulseWaves.filter((wave) => {
        wave.radius += wave.speed;
        wave.opacity -= 0.009; // fade out gradually

        if (wave.opacity <= 0 || wave.radius >= wave.maxRadius) {
          return false; // remove wave
        }

        // Draw expanding subtle wave ripple
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        // Make color matching client theme: subtle #172554 blue glow
        const gradient = ctx.createRadialGradient(
          wave.x,
          wave.y,
          Math.max(0, wave.radius - wave.thickness * 4),
          wave.x,
          wave.y,
          wave.radius
        );
        gradient.addColorStop(0, 'rgba(23, 37, 84, 0)');
        gradient.addColorStop(0.5, `rgba(23, 37, 84, ${wave.opacity * 0.075})`);
        gradient.addColorStop(1, `rgba(23, 37, 84, ${wave.opacity * 0.15})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = wave.thickness;
        ctx.stroke();

        return true;
      });

      // 2. Update and draw Particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx * (1 + p.glowIntensity * 1.8); // Speeds up slightly during pulse
        p.y += p.vy * (1 + p.glowIntensity * 1.8);

        // Slow return to base properties (decay particle pulse response)
        p.glowIntensity += (p.targetGlow - p.glowIntensity) * 0.06;
        if (p.glowIntensity > 0.01) {
          p.targetGlow -= 0.03;
          if (p.targetGlow < 0) p.targetGlow = 0;
        }

        p.pulseScale += (1 - p.pulseScale) * 0.08;
        p.radius = p.baseRadius * p.pulseScale;

        // Perfect screen wraparound with some margin buffer
        const margin = 20;
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;

        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;

        // Mouse attraction or soft pushing
        if (mouse.x > -500) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Soft drift towards mouse
            p.x += (dx / dist) * force * 0.25;
            p.y += (dy / dist) * force * 0.25;
          }
        }

        // Pulse wave collision check
        pulseWaves.forEach((wave) => {
          if (p.hitWaves.has(wave.id)) return;

          const dx = p.x - wave.x;
          const dy = p.y - wave.y;
          const dist = Math.hypot(dx, dy);

          // If the shell of the pulse crosses the particle
          if (Math.abs(dist - wave.radius) < 8) {
            p.hitWaves.add(wave.id);
            // Trigger particle energetic state
            p.pulseScale = Math.random() * 2 + 1.8; // swell size
            p.targetGlow = 1.0; // max brightness
          }
        });

        // Simple cleanup: remove hitWave list for waves that don't exist anymore
        p.hitWaves.forEach((id) => {
          if (!pulseWaves.some((w) => w.id === id)) {
            p.hitWaves.delete(id);
          }
        });

        // Draw particle with glow if highly excited
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        if (p.glowIntensity > 0.1) {
          ctx.fillStyle = `rgba(37, 99, 235, ${0.4 + p.glowIntensity * 0.6})`; // Deep active blue when excited
          ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
          ctx.shadowBlur = p.glowIntensity * 8;
        } else {
          ctx.fillStyle = 'rgba(23, 37, 84, 0.3)'; // Discrete slate blue text match standard color
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      // 3. Draw inter-connecting lines
      ctx.shadowBlur = 0; // reset shadow
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionMaxDist) {
            // Enhanced opacity for connecting lines if either node is in a pulsed state
            const excitementFactor = Math.max(p1.glowIntensity, p2.glowIntensity);
            const baseAlpha = (1 - dist / connectionMaxDist) * 0.11;
            const finalAlpha = baseAlpha + excitementFactor * 0.22;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (excitementFactor > 0.15) {
              // Brighter connecting blue light gradient inside pulse wavefronts
              ctx.strokeStyle = `rgba(37, 99, 235, ${finalAlpha})`;
              ctx.lineWidth = 0.85 + excitementFactor * 0.65;
            } else {
              // Standard ultra-subtle elegant network lines
              ctx.strokeStyle = `rgba(23, 37, 84, ${finalAlpha})`;
              ctx.lineWidth = 0.6;
            }
            ctx.stroke();
          }
        }

        // Draw line from mouse to nearby particles
        if (mouse.x > -500) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius - 20) {
            const alpha = (1 - dist / (mouse.radius - 20)) * 0.13;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = `rgba(23, 37, 84, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleMouseClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="neural-particle-container" ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas id="neural-particle-canvas" ref={canvasRef} className="block w-full h-full cursor-crosshair opacity-80" />
    </div>
  );
};
