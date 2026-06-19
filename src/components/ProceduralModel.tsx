/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ProceduralModelProps {
  shapeType: 'bottle' | 'box' | 'cylinder' | 'abstract' | 'sphere' | 'poly' | 'organic' | 'donut';
  gradientStart: string;
  gradientEnd: string;
  accentColor: string;
  complexity: number;
}

export const ProceduralModel: React.FC<ProceduralModelProps> = ({
  shapeType,
  gradientStart,
  gradientEnd,
  accentColor,
  complexity
}) => {
  // We can render custom high-precision SVG vector 3D-looking drafts with specular lights, gradients, wireframe lines, and CAD bounds.
  const gradientId = React.useId();
  const wireGlowId = React.useId();

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 select-none overflow-hidden">
      {/* Decorative CAD background grid lines */}
      <div className="absolute inset-0 border border-slate-200/50 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.25] pointer-events-none" />
      
      {/* CAD technical axes */}
      <div className="absolute bottom-2 left-2 flex flex-col font-mono text-[8px] text-slate-400 gap-0.5 pointer-events-none">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
          <span>X-AXIS</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          <span>Y-AXIS</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          <span>Z_DEPTH: +{(complexity * 12.5).toFixed(1)}mm</span>
        </div>
      </div>

      {/* Main SVG Graphic representing physical and blueprint details */}
      <svg
        viewBox="0 0 200 220"
        className="w-full h-full max-w-[160px] lg:max-w-[180px] drop-shadow-xl transition-transform duration-500 hover:scale-105"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
          <linearGradient id={`${gradientId}-specular`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
            <stop offset="30%" stopColor="#ffffff" stopOpacity={0.1} />
            <stop offset="100%" stopColor={gradientEnd} stopOpacity={0.0} />
          </linearGradient>
          <filter id={wireGlowId}>
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Tech bounding box dimensions */}
        <rect
          x="10"
          y="10"
          width="180"
          height="200"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.5"
          strokeDasharray="4 6"
          opacity="0.3"
        />
        
        {/* Dynamic measurement ticks */}
        <line x1="6" y1="10" x2="14" y2="10" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="6" y1="210" x2="14" y2="210" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="10" y1="10" x2="10" y2="210" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="12" y="114" fill="#94a3b8" fontSize="7" fontFamily="monospace" transform="rotate(-90 12 114)" textAnchor="middle">
          SCALE: 1:{(1.2 + (complexity % 3) * 0.1).toFixed(1)}
        </text>

        {/* 3D Core Rendering based on type */}
        {shapeType === 'bottle' && (
          <g>
            {/* Outer Bottle blueprint wire */}
            <path
              d="M 60,190 L 60,80 Q 60,65 75,60 L 75,35 Q 75,30 85,30 L 115,30 Q 125,30 125,35 L 125,60 Q 140,65 140,80 L 140,190 Q 140,200 130,200 L 70,200 Q 60,200 60,190 Z"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
            {/* Render Solid filled body with 3D gradient */}
            <path
              d="M 65,185 L 65,82 Q 65,70 78,65 L 78,38 L 122,38 L 122,65 Q 135,70 135,82 L 135,185 Q 135,195 125,195 L 75,195 Q 65,195 65,185 Z"
              fill={`url(#${gradientId})`}
              opacity="0.85"
            />
            {/* Liquid level */}
            <path
              d="M 65,120 Q 100,125 135,120 L 135,185 Q 135,195 125,195 L 75,195 Q 65,195 65,185 Z"
              fill={accentColor}
              opacity="0.3"
            />
            {/* Specular Highlight Gloss line */}
            <path
              d="M 75,180 L 75,85"
              fill="none"
              stroke={`url(#${gradientId}-specular)`}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.75"
            />
            {/* Caps & Collars */}
            <rect x="80" y="22" width="40" height="8" rx="2" fill="#071930" opacity="0.8" />
            <line x1="80" y1="26" x2="120" y2="26" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
            {/* Horizontal topology subdivisions */}
            <ellipse cx="100" cy="85" rx="35" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" strokeDasharray="1 2" />
            <ellipse cx="100" cy="140" rx="35" ry="5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" strokeDasharray="1 2" />
          </g>
        )}

        {shapeType === 'box' && (
          <g transform="translate(10, 10)">
            {/* Back wire wires */}
            <polygon points="50,60 140,30 140,150 50,180" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            {/* Isometric solid faces */}
            {/* Left face */}
            <polygon points="50,180 50,60 95,95 95,210" fill={`url(#${gradientId})`} opacity="0.9" />
            {/* Right face */}
            <polygon points="95,210 95,95 140,65 140,175" fill={accentColor} opacity="0.5" />
            {/* Top face */}
            <polygon points="50,60 95,30 140,65 95,95" fill="white" opacity="0.35" />
            {/* Edge highlights */}
            <line x1="95" y1="95" x2="95" y2="210" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
            <line x1="50" y1="60" x2="95" y2="95" stroke="#ffffff" strokeWidth="0.7" opacity="0.9" />
            <line x1="95" y1="95" x2="140" y2="65" stroke="#ffffff" strokeWidth="0.7" opacity="0.5" />
            {/* Geometry measurements annotation on box */}
            <text x="70" y="150" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity="0.8">H: 140mm</text>
            <text x="110" y="115" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity="0.8" transform="rotate(30 110 115)">W: 85</text>
          </g>
        )}

        {shapeType === 'cylinder' && (
          <g>
            {/* Bottom Ellipse contour */}
            <ellipse cx="100" cy="175" rx="40" ry="15" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
            {/* Solid Cylinder core */}
            <path
              d="M 60,65 A 40,15 0 0,0 140,65 L 140,175 A 40,15 0 0,1 60,175 Z"
              fill={`url(#${gradientId})`}
              opacity="0.85"
            />
            {/* Cylinder Top flat cap */}
            <ellipse cx="100" cy="65" rx="40" ry="15" fill={`url(#${gradientId})`} opacity="1" filter={`url(#${wireGlowId})`} />
            <ellipse cx="100" cy="65" rx="40" ry="15" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
            {/* Linear highlight band */}
            <path
              d="M 75,65 L 75,175"
              fill="none"
              stroke={`url(#${gradientId}-specular)`}
              strokeWidth="5"
              opacity="0.8"
            />
            {/* Structural wire splits for 3D layout illustration */}
            {Array.from({ length: complexity }).map((_, step) => {
              const y = 65 + ((175 - 65) / (complexity + 1)) * (step + 1);
              return (
                <ellipse
                  key={step}
                  cx="100"
                  cy={y}
                  rx="40"
                  ry="15"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.4"
                  strokeDasharray="2 3"
                  opacity="0.4"
                />
              );
            })}
          </g>
        )}

        {shapeType === 'sphere' && (
          <g>
            {/* Bounding wireframe ring behind */}
            <circle cx="100" cy="110" r="50" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
            {/* Solid sphere body with 3D spherical gradient representation via masking/overlaps */}
            <circle cx="100" cy="110" r="48" fill={`url(#${gradientId})`} />
            {/* Inner ellipse wires (latitudes & longitudes) */}
            <ellipse cx="100" cy="110" rx="48" ry="14" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
            <ellipse cx="100" cy="110" rx="14" ry="48" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
            {/* Extreme specular gloss spot */}
            <circle cx="82" cy="92" r="12" fill="white" opacity="0.15" filter="blur(2px)" />
            <circle cx="80" cy="90" r="5" fill="white" opacity="0.6" />
          </g>
        )}

        {shapeType === 'poly' && (
          <g transform="translate(10, 10)">
            {/* Polyhedral design: Diamond or crystal facet structure */}
            {/* Facet 1 top */}
            <polygon points="90,20 130,70 90,90 50,70" fill="white" opacity="0.25" />
            {/* Facet 2 front-left */}
            <polygon points="50,70 90,90 90,170 30,120" fill={`url(#${gradientId})`} opacity="0.85" />
            {/* Facet 3 front-right */}
            <polygon points="90,90 130,70 150,120 90,170" fill={accentColor} opacity="0.65" />
            {/* Facet 4 bottom cap */}
            <polygon points="30,120 90,170 150,120 90,195" fill={`url(#${gradientId})`} opacity="0.9" />
            {/* Facet edge wires */}
            <line x1="90" y1="20" x2="90" y2="90" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" />
            <line x1="90" y1="90" x2="90" y2="170" stroke="#ffffff" strokeWidth="0.6" opacity="0.9" />
            <line x1="50" y1="70" x2="90" y2="90" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
            <line x1="130" y1="70" x2="90" y2="90" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
            <line x1="30" y1="120" x2="90" y2="170" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
            <line x1="150" y1="120" x2="90" y2="170" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
            <line x1="90" y1="170" x2="90" y2="195" stroke="#ffffff" strokeWidth="0.6" opacity="0.9" />
          </g>
        )}

        {shapeType === 'donut' && (
          <g>
            {/* Solid outer ring */}
            <path
              d="M 50,110 A 50,40 0 1,1 150,110 A 50,40 0 1,1 50,110 Z"
              fill={`url(#${gradientId})`}
              opacity="0.9"
            />
            {/* Hollow inner hole cutout */}
            <path
              d="M 78,110 A 22,17 0 1,1 122,110 A 22,17 0 1,1 78,110 Z"
              fill="#ffffff"
            />
            {/* Specular rings representation */}
            <path
              d="M 60,110 A 40,32 0 0,1 140,110"
              fill="none"
              stroke={`url(#${gradientId}-specular)`}
              strokeWidth="4"
              opacity="0.7"
            />
            {/* Inner blueprint lines */}
            <ellipse cx="100" cy="110" rx="35" ry="25" fill="none" stroke={accentColor} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.7" />
            <ellipse cx="100" cy="110" rx="49" ry="39" fill="none" stroke="#cbd5e1" strokeWidth="0.4" opacity="0.6" />
          </g>
        )}

        {shapeType === 'abstract' && (
          <g transform="translate(10, 10)">
            {/* Dynamic generative fluid helix sculpture */}
            <path
              d="M 40,40 Q 60,160 140,80 T 130,170"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 40,40 Q 60,160 140,80 T 130,170"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Secondary wire overlays */}
            <path
              d="M 45,35 Q 65,155 145,75 T 135,165"
              fill="none"
              stroke={accentColor}
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
            {/* Vertex points of the CAD splines */}
            <circle cx="40" cy="40" r="3" fill="#ef4444" />
            <circle cx="140" cy="80" r="3" fill="#ef4444" />
            <circle cx="130" cy="170" r="3" fill="#ef4444" />
            <line x1="40" y1="40" x2="60" y2="160" stroke="#ef4444" strokeWidth="0.4" strokeDasharray="2 2" />
            <line x1="140" y1="80" x2="60" y2="160" stroke="#ef4444" strokeWidth="0.4" strokeDasharray="2 2" />
          </g>
        )}

        {shapeType === 'organic' && (
          <g>
            {/* Flowing organic blob representational topography */}
            <path
              d="M 60,110 C 50,60 110,40 130,60 C 150,80 160,130 130,160 C 100,190 70,160 60,110 Z"
              fill={`url(#${gradientId})`}
              opacity="0.9"
            />
            <path
              d="M 70,110 C 62,70 110,60 120,75 C 130,90 140,130 120,150 C 100,170 78,150 70,110 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.6"
              opacity="0.5"
            />
            {/* Highlight bubble */}
            <path
              d="M 85,90 Q 100,80 115,90"
              fill="none"
              stroke={`url(#${gradientId}-specular)`}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.75"
            />
            <circle cx="130" cy="110" r="2" fill="#ef4444" />
            <text x="135" y="112" fill="#64748b" fontSize="6" fontFamily="monospace">O-ANCHOR</text>
          </g>
        )}

        {/* Dynamic geometric stats overlays (aesthetic value) */}
        <g transform="translate(140, 195)" className="font-mono" fontSize="5" fill="#64748b" opacity="0.8">
          <text x="0" y="0">E_VERTEX: {(complexity * 12).toFixed(0)}</text>
          <text x="0" y="6">G_COMP: {complexity}/10</text>
        </g>
      </svg>
    </div>
  );
};
