/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Zap,
  ShieldCheck,
  Globe,
  Users,
  Target,
  Rocket,
  Award,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  CheckCircle,
  Table,
} from 'lucide-react';

export const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  ShieldCheck,
  Globe,
  Users,
  Target,
  Rocket,
  Award,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  CheckCircle,
  Table,
};

export function renderSlideIcon(name?: string, className = 'w-6 h-6'): React.ReactNode {
  const IconComponent = (name && ICON_MAP[name]) || Zap;
  return <IconComponent className={className} />;
}
