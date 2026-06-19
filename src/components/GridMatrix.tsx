import React, { useEffect, useState, useRef } from 'react';

interface GridMatrixProps {
  slogan?: string;
  gridSize?: number; // Size of each cell in pixels
  flickerRate?: number; // Probability of a character flickering per tick
}

export const GridMatrix: React.FC<GridMatrixProps> = ({
  slogan = "PROJECT MATRIX INDEX // 空间重组与逻辑视界",
  gridSize = 24, // Perfect grid spacing
  flickerRate = 0.18, // Significantly increased probability for rich high-frequency shimmer
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [grid, setGrid] = useState<{ char: string; opacity: number; weight: string; color: string }[][]>([]);

  // Beautifully pale gray palette matching light slate and zinc minimalism
  const grayPalette = [
    { color: "#94a3b8", weight: "400" }, // Slate 400
    { color: "#cbd5e1", weight: "400" }, // Slate 300 (Delicate)
    { color: "#e2e8f0", weight: "300" }, // Slate 200 (Whisper of gray)
    { color: "#f1f5f9", weight: "300" }  // Slate 100 (Near white)
  ];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//X[]<>+".split("");

  // Populate grid based on current size
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize the grid content
  useEffect(() => {
    const cols = Math.ceil(dimensions.width / gridSize) + 1;
    const rows = Math.ceil(dimensions.height / gridSize) + 1;

    const initialGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => {
        const styleSample = grayPalette[Math.floor(Math.random() * grayPalette.length)];
        return {
          char: alphabet[Math.floor(Math.random() * alphabet.length)],
          opacity: 0.15 + Math.random() * 0.45, // Delicately controlled opacity range
          weight: styleSample.weight,
          color: styleSample.color,
        };
      })
    );

    setGrid(initialGrid);
  }, [dimensions, gridSize]);

  // Handle subtle breathing and shimmering lifecycle animation without shifts or scrolls
  useEffect(() => {
    if (grid.length === 0) return;

    const interval = setInterval(() => {
      setGrid(prevGrid =>
        prevGrid.map(row =>
          row.map(cell => {
            // Only flicker a subset of cells per tick to keep the effect premium and static
            if (Math.random() < flickerRate) {
              const styleSample = grayPalette[Math.floor(Math.random() * grayPalette.length)];
              return {
                ...cell,
                // Soft breathing updates with higher density shifts
                opacity: 0.1 + Math.random() * 0.4,
                weight: styleSample.weight,
                color: styleSample.color,
                // 15% chance to cycle to a new character for interactive code structure change
                char: Math.random() < 0.15 ? alphabet[Math.floor(Math.random() * alphabet.length)] : cell.char,
              };
            }
            return cell;
          })
        )
      );
    }, 45); // Rapid 45ms updates for ultra-fast shimmering effect

    return () => clearInterval(interval);
  }, [grid.length, flickerRate]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-white select-none pointer-events-none">
      {/* Absolute grid representation using standard HTML markup for crisp subpixel font rendering */}
      <div 
        className="absolute inset-0 p-4 grid gap-0 leading-none select-none"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${gridSize}px, 1fr))`,
          gridTemplateRows: `repeat(auto-fill, minmax(${gridSize}px, 1fr))`,
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className="flex items-center justify-center font-mono select-none"
              style={{
                width: `${gridSize}px`,
                height: `${gridSize}px`,
                fontSize: `${gridSize * 0.45}px`,
                fontWeight: cell.weight as any,
                color: cell.color,
                opacity: cell.opacity,
                transition: 'opacity 0.15s ease-out, color 0.15s ease-out',
              }}
            >
              {cell.char}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
