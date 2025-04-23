import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  size: number;
  duration: number;
}

export default function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    const colors = [
      '#FFD700', '#FF6347', '#4682B4', '#32CD32', 
      '#BA55D3', '#FF69B4', '#1E90FF', '#FF4500'
    ];
    
    const pieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: 5 + Math.random() * 15,
        duration: 2 + Math.random() * 3
      });
    }
    
    setConfetti(pieces);
    
    // Clean up after animation is done
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          initial={{ 
            x: `${piece.x}vw`, 
            y: `${piece.y}vh`, 
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: '120vh', 
            rotate: piece.rotation, 
            opacity: 0
          }}
          transition={{ 
            duration: piece.duration, 
            ease: 'easeOut',
            delay: Math.random() * 0.5
          }}
          style={{ 
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            background: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            zIndex: 50
          }}
        />
      ))}
    </div>
  );
}