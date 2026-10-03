/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SlideLayout =
  | 'title'
  | 'impact'
  | 'metrics'
  | 'split'
  | 'features'
  | 'timeline'
  | 'quote'
  | 'chart'
  | 'table'
  | 'closing'
  | 'blank';

export type SlideTheme =
  | 'mia-foods'
  | 'dark-slate'
  | 'obsidian-emerald'
  | 'midnight-blue'
  | 'warm-editorial'
  | 'clean-white'
  | 'sunset-gradient';

export type SlideTransition = 'slide' | 'fade' | 'zoom' | 'none';

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  description?: string;
}

export interface ColumnItem {
  id: string;
  title: string;
  subtitle?: string;
  items: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface TimelineNode {
  id: string;
  date: string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface QuoteData {
  text: string;
  author: string;
  role: string;
  organization?: string;
}

export interface ChartDatum {
  id: string;
  label: string;
  value: number;
  max?: number;
  highlight?: boolean;
}

export interface TableRow {
  id: string;
  dimension: string;
  metric: string;
  tool: string;
  goal: string;
}

export interface TableData {
  headers: string[];
  rows: TableRow[];
}

export interface ClosingData {
  title: string;
  subtitle: string;
  email?: string;
  website?: string;
  actionText?: string;
}

export interface SlideData {
  id: string;
  layout: SlideLayout;
  title: string;
  subtitle?: string;
  tag?: string;
  content?: string;
  themeOverride?: SlideTheme;
  transition?: SlideTransition;
  notes?: string;
  metrics?: MetricItem[];
  columns?: ColumnItem[];
  features?: FeatureItem[];
  timeline?: TimelineNode[];
  quote?: QuoteData;
  chartData?: ChartDatum[];
  tableData?: TableData;
  imageUrl?: string;
  imageAlt?: string;
  closing?: ClosingData;
}

export interface PresentationDeck {
  id: string;
  title: string;
  author: string;
  theme: SlideTheme;
  aspectRatio: '16:9' | '4:3';
  transition: SlideTransition;
  slides: SlideData[];
  createdAt: string;
  updatedAt: string;
}

export interface ThemeConfig {
  id: SlideTheme;
  name: string;
  bgClass: string;
  textPrimary: string;
  textSecondary: string;
  accentClass: string;
  accentBg: string;
  borderClass: string;
  cardBg: string;
  badgeClass: string;
}

export const THEME_CONFIGS: Record<SlideTheme, ThemeConfig> = {
  'mia-foods': {
    id: 'mia-foods',
    name: 'MIA FOODS (Clara Corporativa)',
    bgClass: 'bg-[#FBF8F3]',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-600',
    accentClass: 'text-amber-800',
    accentBg: 'bg-amber-800 text-white',
    borderClass: 'border-stone-200',
    cardBg: 'bg-white border border-stone-200/90 shadow-xs',
    badgeClass: 'text-amber-800 font-bold',
  },
  'dark-slate': {
    id: 'dark-slate',
    name: 'Pizarra Oscura',
    bgClass: 'bg-neutral-950',
    textPrimary: 'text-neutral-100',
    textSecondary: 'text-neutral-400',
    accentClass: 'text-amber-400',
    accentBg: 'bg-amber-400 text-neutral-950',
    borderClass: 'border-neutral-800',
    cardBg: 'bg-neutral-900/70 border border-neutral-800/80',
    badgeClass: 'text-amber-300 font-medium',
  },
  'obsidian-emerald': {
    id: 'obsidian-emerald',
    name: 'Obsidiana & Esmeralda',
    bgClass: 'bg-zinc-950',
    textPrimary: 'text-zinc-100',
    textSecondary: 'text-zinc-400',
    accentClass: 'text-emerald-400',
    accentBg: 'bg-emerald-500 text-zinc-950',
    borderClass: 'border-zinc-800',
    cardBg: 'bg-zinc-900/70 border border-zinc-800/80',
    badgeClass: 'text-emerald-300 font-medium',
  },
  'midnight-blue': {
    id: 'midnight-blue',
    name: 'Azul Medianoche',
    bgClass: 'bg-slate-950',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accentClass: 'text-sky-400',
    accentBg: 'bg-sky-400 text-slate-950',
    borderClass: 'border-slate-800',
    cardBg: 'bg-slate-900/80 border border-slate-800/80',
    badgeClass: 'text-sky-300 font-medium',
  },
  'warm-editorial': {
    id: 'warm-editorial',
    name: 'Editorial Cálido',
    bgClass: 'bg-stone-100',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-600',
    accentClass: 'text-amber-700',
    accentBg: 'bg-amber-700 text-stone-100',
    borderClass: 'border-stone-300',
    cardBg: 'bg-white border border-stone-200/90 shadow-xs',
    badgeClass: 'text-amber-800 font-medium',
  },
  'clean-white': {
    id: 'clean-white',
    name: 'Blanco Estudio',
    bgClass: 'bg-white',
    textPrimary: 'text-neutral-900',
    textSecondary: 'text-neutral-600',
    accentClass: 'text-indigo-600',
    accentBg: 'bg-indigo-600 text-white',
    borderClass: 'border-neutral-200',
    cardBg: 'bg-neutral-50/80 border border-neutral-200 shadow-xs',
    badgeClass: 'text-indigo-600 font-medium',
  },
  'sunset-gradient': {
    id: 'sunset-gradient',
    name: 'Atardecer Púrpura',
    bgClass: 'bg-gradient-to-br from-neutral-950 via-slate-900 to-indigo-950',
    textPrimary: 'text-neutral-100',
    textSecondary: 'text-neutral-300',
    accentClass: 'text-rose-400',
    accentBg: 'bg-rose-400 text-neutral-950',
    borderClass: 'border-indigo-900/50',
    cardBg: 'bg-neutral-900/60 backdrop-blur-xs border border-white/10',
    badgeClass: 'text-rose-300 font-medium',
  },
};

export const LAYOUT_DEFINITIONS: {
  id: SlideLayout;
  title: string;
  description: string;
  iconName: string;
}[] = [
  {
    id: 'title',
    title: 'Portada Principal',
    description: 'Título imponente, subtítulo, autor y fecha para abrir la presentación.',
    iconName: 'LayoutTemplate',
  },
  {
    id: 'impact',
    title: 'Gran Declaración',
    description: 'Mensaje de máximo impacto visual para enfatizar una idea clave.',
    iconName: 'Sparkles',
  },
  {
    id: 'metrics',
    title: 'Métricas & KPIs',
    description: 'Tres tarjetas de datos con cifras numéricas y variaciones.',
    iconName: 'BarChart2',
  },
  {
    id: 'split',
    title: 'Dos Columnas',
    description: 'Comparación paralela: Reto vs Solución o Antes vs Después.',
    iconName: 'Columns2',
  },
  {
    id: 'features',
    title: 'Tres Pilares',
    description: 'Tres tarjetas descriptivas con encabezado y detalles estructurados.',
    iconName: 'Grid3X3',
  },
  {
    id: 'timeline',
    title: 'Hoja de Ruta',
    description: 'Cuatro etapas o trimestres con hitos, fecha y progreso.',
    iconName: 'GitCommit',
  },
  {
    id: 'quote',
    title: 'Cita / Testimonio',
    description: 'Cita destacada con autor, cargo y credencial de organización.',
    iconName: 'Quote',
  },
  {
    id: 'chart',
    title: 'Distribución & Datos',
    description: 'Gráfico visual de barras comparativas y valores porcentuales.',
    iconName: 'SlidersHorizontal',
  },
  {
    id: 'table',
    title: 'Matriz / Tabla de Datos',
    description: 'Cuadro comparativo con filas, dimensiones, herramientas y metas.',
    iconName: 'Table',
  },
  {
    id: 'closing',
    title: 'Cierre & Contacto',
    description: 'Conclusión, agradecimiento, llamada a la acción y canales.',
    iconName: 'CheckCircle2',
  },
  {
    id: 'blank',
    title: 'Lienzo Libre',
    description: 'Espacio minimalista para redactar contenido personalizado.',
    iconName: 'FileText',
  },
];
