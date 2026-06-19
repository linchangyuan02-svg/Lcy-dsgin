/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string; // unique identifier
  index: number; // item index 1-50
  title: string; // item name
  category: string; // specific subclass
  software: string[]; // tools used
  year: string; // design date
  description: string; // narrative explanation
  gradientStart: string; // aesthetic gradient
  gradientEnd: string; // aesthetic gradient
  accentColor: string; // secondary color for tags
  shapeType: 'bottle' | 'box' | 'cylinder' | 'abstract' | 'sphere' | 'poly' | 'organic' | 'donut'; // procedural geometry for beautiful CSS rendering
  complexity: number; // 3D details config
  imageUrl?: string; // real image URL if provided
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface EducationExperience {
  id: string;
  school: string;
  major: string;
  period: string;
  achievements: string[];
}

export interface SoftwareTool {
  name: string;
  level: string; // e.g. "Expert", "Proficient", "Advanced"
  percentage: number; // for progress display
  category: '3D' | 'Rendering' | 'Design' | 'AI';
  color: string;
}
