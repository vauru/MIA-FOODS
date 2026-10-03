/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DEFAULT_DECK } from '../data/starterDecks';
import { PresentationDeck, SlideData, SlideLayout } from '../types/presentation';

const STORAGE_KEY = 'presenta_studio_deck_mia_foods_v3';

export function loadSavedDeck(): PresentationDeck {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DECK;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.slides) && parsed.slides.length > 0) {
      return parsed;
    }
    return DEFAULT_DECK;
  } catch (e) {
    console.error('Error loading deck from localStorage', e);
    return DEFAULT_DECK;
  }
}

export function saveDeckToStorage(deck: PresentationDeck): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  } catch (e) {
    console.error('Error saving deck to localStorage', e);
  }
}

export function exportDeckAsJSON(deck: PresentationDeck): void {
  const jsonStr = JSON.stringify(deck, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const sanitizedTitle = (deck.title || 'presentacion').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  a.download = `${sanitizedTitle}.presenta.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateSlideId(): string {
  return 'slide-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
}

export function createNewSlide(layout: SlideLayout): SlideData {
  const id = generateSlideId();
  switch (layout) {
    case 'title':
      return {
        id,
        layout: 'title',
        tag: 'Tema Principal · Fecha',
        title: 'Título de la Nueva Diapositiva',
        subtitle: 'Subtítulo descriptivo que contextualiza el contenido o el objetivo de la sesión.',
        content: 'Tu Nombre · Departamento o Empresa',
        notes: '',
      };
    case 'impact':
      return {
        id,
        layout: 'impact',
        tag: 'Idea Central',
        title: 'Escribe aquí una declaración contundente que resuma el mensaje clave.',
        subtitle: 'Una breve explicación o dato que respalde y amplifique el impacto de la frase principal.',
        notes: '',
      };
    case 'metrics':
      return {
        id,
        layout: 'metrics',
        tag: 'Indicadores Clave',
        title: 'Resultados y Métricas de Alto Impacto',
        subtitle: 'Datos cuantitativos que demuestran el progreso y la tracción.',
        metrics: [
          {
            id: 'm-' + Math.random().toString(36).substring(2, 6),
            label: 'Métrica Primaria',
            value: '+125%',
            change: '+35% este mes',
            changePositive: true,
            description: 'Breve explicación del resultado obtenido y su relevancia.',
          },
          {
            id: 'm-' + Math.random().toString(36).substring(2, 6),
            label: 'Volumen Total',
            value: '45.2K',
            change: 'Objetivo superado',
            changePositive: true,
            description: 'Distribución por segmentos con crecimiento estable.',
          },
          {
            id: 'm-' + Math.random().toString(36).substring(2, 6),
            label: 'Eficiencia / Calidad',
            value: '99.4%',
            change: '+2.1% incremento',
            changePositive: true,
            description: 'Optimización de tiempos y reducción de fallos.',
          },
        ],
        notes: '',
      };
    case 'split':
      return {
        id,
        layout: 'split',
        tag: 'Análisis Comparativo',
        title: 'Punto A frente a Punto B',
        subtitle: 'Desglose en dos columnas para contrastar enfoques o situaciones.',
        columns: [
          {
            id: 'col-1',
            title: 'Columna Izquierda',
            subtitle: 'Situación inicial o reto',
            items: [
              'Primer punto clave a destacar en esta sección.',
              'Segundo aspecto relevante o fricción identificada.',
              'Tercer elemento que requiere atención prioritaria.',
            ],
          },
          {
            id: 'col-2',
            title: 'Columna Derecha',
            subtitle: 'Propuesta o solución',
            items: [
              'Respuesta directa con plan de acción implementable.',
              'Beneficio medible a corto y mediano plazo.',
              'Resultado esperado para consolidar la meta.',
            ],
          },
        ],
        notes: '',
      };
    case 'features':
      return {
        id,
        layout: 'features',
        tag: 'Estructura Modular',
        title: 'Tres Pilares o Características',
        subtitle: 'Resumen ordenado de componentes o principios esenciales.',
        features: [
          {
            id: 'f-1',
            title: 'Primer Componente',
            description: 'Descripción concisa de la función o ventaja que aporta este pilar al proyecto.',
            iconName: 'Zap',
          },
          {
            id: 'f-2',
            title: 'Segundo Componente',
            description: 'Explicación clara de la metodología, tecnología o enfoque utilizado.',
            iconName: 'ShieldCheck',
          },
          {
            id: 'f-3',
            title: 'Tercer Componente',
            description: 'Impacto final en el usuario y cómo se integra con el resto del sistema.',
            iconName: 'Globe',
          },
        ],
        notes: '',
      };
    case 'timeline':
      return {
        id,
        layout: 'timeline',
        tag: 'Cronograma & Fases',
        title: 'Hoja de Ruta del Proyecto',
        subtitle: 'Secuencia temporal de hitos y metas programadas.',
        timeline: [
          {
            id: 't-1',
            date: 'Fase 1 · Mes 1',
            title: 'Investigación & Definición',
            description: 'Levantamiento de requerimientos y validación con usuarios.',
            completed: true,
          },
          {
            id: 't-2',
            date: 'Fase 2 · Mes 2',
            title: 'Diseño & Prototipado',
            description: 'Creación de especificaciones técnicas y pruebas iniciales.',
            completed: false,
          },
          {
            id: 't-3',
            date: 'Fase 3 · Mes 3',
            title: 'Desarrollo & Despliegue',
            description: 'Implementación completa y pruebas de rendimiento.',
            completed: false,
          },
          {
            id: 't-4',
            date: 'Fase 4 · Mes 4',
            title: 'Medición & Escala',
            description: 'Monitoreo de adopción y optimización continua.',
            completed: false,
          },
        ],
        notes: '',
      };
    case 'quote':
      return {
        id,
        layout: 'quote',
        tag: 'Voz del Cliente o Experto',
        title: 'Cita Destacada',
        subtitle: 'Una reflexión profunda que conecta con la audiencia.',
        quote: {
          text: 'La verdadera innovación no radica en añadir más complejidad, sino en simplificar lo esencial con máxima precisión.',
          author: 'Nombre del Autor',
          role: 'Cargo o Especialidad',
          organization: 'Institución o Empresa',
        },
        notes: '',
      };
    case 'chart':
      return {
        id,
        layout: 'chart',
        tag: 'Distribución Cuantitativa',
        title: 'Comparativa de Segmentos',
        subtitle: 'Valores proporcionales de cada categoría analizada.',
        chartData: [
          { id: 'ch-1', label: 'Segmento Principal', value: 65, max: 100, highlight: true },
          { id: 'ch-2', label: 'Segundo Segmento', value: 25, max: 100 },
          { id: 'ch-3', label: 'Segmento Emergente', value: 10, max: 100 },
        ],
        notes: '',
      };
    case 'table':
      return {
        id,
        layout: 'table',
        tag: 'Matriz / Cuadro de Mando',
        title: 'Tabla Comparativa de Dimensiones',
        subtitle: 'Desglose estructurado de indicadores, herramientas y objetivos.',
        tableData: {
          headers: ['Dimensión', 'Métrica Clave', 'Herramienta de Medición', 'Meta a 9 Meses'],
          rows: [
            {
              id: 'row-1',
              dimension: 'Tráfico Web',
              metric: 'Visitas totales, tráfico orgánico, permanencia',
              tool: 'Google Analytics 4 / Search Console',
              goal: '+120% incremento orgánico',
            },
            {
              id: 'row-2',
              dimension: 'Alcance y Marca',
              metric: 'Impresiones LinkedIn, engagement rate',
              tool: 'LinkedIn Analytics',
              goal: '+200% impresiones corporativas',
            },
          ],
        },
        notes: '',
      };
    case 'closing':
      return {
        id,
        layout: 'closing',
        tag: 'Conclusiones',
        title: '¡Muchas Gracias por su Atención!',
        subtitle: 'Espacio abierto para responder inquietudes y definir próximos pasos.',
        closing: {
          title: '¿Comenzamos la conversación?',
          subtitle: 'Disponible para reuniones de seguimiento y detalles adicionales.',
          email: 'contacto@ejemplo.com',
          website: 'www.ejemplo.com',
          actionText: 'Contactar al Equipo',
        },
        notes: '',
      };
    case 'blank':
    default:
      return {
        id,
        layout: 'blank',
        tag: 'Diapositiva Libre',
        title: 'Título del Lienzo',
        subtitle: 'Haz clic aquí para escribir y estructurar tu mensaje.',
        content: 'Escribe libremente cualquier nota, lista o contenido que desees compartir.',
        notes: '',
      };
  }
}

export function duplicateSlide(slide: SlideData): SlideData {
  const cloned: SlideData = JSON.parse(JSON.stringify(slide));
  cloned.id = generateSlideId();
  cloned.title = `${cloned.title} (Copia)`;
  return cloned;
}
