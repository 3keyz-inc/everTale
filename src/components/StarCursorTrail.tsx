import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  type: 'star' | 'sparkle' | 'orb';
}

export const StarCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const posRef = useRef<{ x: number; y: number; visible: boolean }>({ x: -100, y: -100, visible: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = [
      '#f59e0b', // Amber gold
      '#fbbf24', // Bright yellow
      '#22d3ee', // Cyan
      '#38bdf8', // Sky blue
      '#818cf8', // Indigo
      '#ffffff', // Pure white sparkle
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY, visible: true };

      // Spawn stardust particles on movement
      const count = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const types: ('star' | 'sparkle' | 'orb')[] = ['star', 'star', 'sparkle', 'orb'];

        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          size: Math.random() * 8 + 3,
          color,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5, // float upward slightly
          alpha: 1.0,
          decay: Math.random() * 0.025 + 0.015,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.1,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    const handleMouseLeave = () => {
      posRef.current.visible = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Draw 4-point golden celestial star
    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string, alpha: number, rotation: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;

      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(0, -outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Draw sparkle cross
    const drawSparkle = (x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
      ctx.restore();
    };

    // Animation Loop
    let starRotation = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starRotation += 0.02;

      // Update and draw trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.vRot;
        p.size = Math.max(0, p.size - 0.05);

        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'star') {
          drawStar(p.x, p.y, 4, p.size, p.size * 0.4, p.color, p.alpha, p.rotation);
        } else if (p.type === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.color, p.alpha);
        } else {
          // glowing orb
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Draw active cursor head star if mouse is inside window
      const pos = posRef.current;
      if (pos.visible) {
        // Outer aura glow
        ctx.save();
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 16;
        drawStar(pos.x, pos.y, 4, 12, 4, '#f59e0b', 0.9, starRotation);
        drawStar(pos.x, pos.y, 4, 7, 2, '#ffffff', 1.0, -starRotation * 1.5);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ touchAction: 'none' }}
    />
  );
};
