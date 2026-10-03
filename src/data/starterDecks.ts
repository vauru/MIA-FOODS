/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PresentationDeck, SlideData } from '../types/presentation';

export const MIA_FOODS_DECK: PresentationDeck = {
  id: 'deck-mia-foods-9-meses',
  title: 'MIA FOODS · Plan de Trabajo: Medición & Crecimiento B2B (9 Meses)',
  author: 'MIA FOODS · Grupo Tradipan, Virgen del Brezo, Mandul & El Cateto (miafoods.es)',
  theme: 'mia-foods',
  aspectRatio: '16:9',
  transition: 'slide',
  createdAt: '2026-10-03T08:00:00.000Z',
  updatedAt: '2026-10-03T08:00:00.000Z',
  slides: [
    {
      id: 'mia-1',
      layout: 'title',
      tag: 'MIA FOODS · Plan Estratégico Digital a 9 Meses (miafoods.es)',
      title: 'Plan de Trabajo: Medición & Crecimiento B2B',
      subtitle: 'Estrategia integral de rendimiento digital para panadería y bollería industrial: captación orgánica, visibilidad corporativa en LinkedIn, generación de leads B2B y nutrición por email.',
      content: 'MIA FOODS · Dirección de Marketing & Expansión Comercial · Horizonte 9 Meses',
      imageUrl: '/src/assets/images/mia_bakery_hero_1791039490818.jpg',
      imageAlt: 'MIA FOODS · Panadería y bollería artesanal e industrial de tradición española',
      notes: 'Iniciar la presentación destacando la identidad de MIA FOODS: tradición centenaria y capacidad industrial combinadas con un plan digital riguroso a 9 meses.',
    },
    {
      id: 'mia-2',
      layout: 'impact',
      tag: 'Visión & Propósito Estratégico · MIA FOODS',
      title: 'Conectar la excelencia panadera y pastelera de MIA FOODS con retailers, distribuidores y canal Horeca a escala nacional e internacional.',
      subtitle: 'Eliminamos las métricas de vanidad. Cada dimensión cuenta con trazabilidad técnica auditable mediante Google Analytics 4, Search Console, LinkedIn Analytics, CRM y plataformas ESP de automatización.',
      notes: 'Destacar que las 4 metas responden a una lógica de embudo comercial directo: desde la notoriedad inicial hasta la solicitud recurrente de catálogos y pedidos.',
    },
    {
      id: 'mia-3',
      layout: 'table',
      tag: 'Cuadro de Mando Integral · miafoods.es',
      title: 'Matriz Principal de Trabajo: 4 Dimensiones, Herramientas & Metas',
      subtitle: 'Plan de medición estructurado para monitorear el progreso hacia los objetivos del mes 9.',
      tableData: {
        headers: ['Dimensión', 'Métrica Clave', 'Herramienta de Medición', 'Meta a 9 Meses'],
        rows: [
          {
            id: 'row-1',
            dimension: 'Tráfico Web',
            metric: 'Visitas totales, tráfico orgánico, tiempo de permanencia',
            tool: 'Google Analytics 4 / Search Console',
            goal: '+120% incremento en tráfico orgánico cualificado',
          },
          {
            id: 'row-2',
            dimension: 'Alcance y Marca',
            metric: 'Impresiones en LinkedIn, engagement rate, crecimiento de seguidores B2B',
            tool: 'LinkedIn Analytics',
            goal: '+200% de impresiones en perfil corporativo',
          },
          {
            id: 'row-3',
            dimension: 'Conversión B2B',
            metric: 'Solicitudes de catálogo, descargas de fichas técnicas, formularios B2B',
            tool: 'GA4 Event Tracking / CRM',
            goal: '30+ leads B2B cualificados/mes',
          },
          {
            id: 'row-4',
            dimension: 'Email Marketing',
            metric: 'Tasa de apertura (Open Rate), Tasa de Clics (CTR), Bajas',
            tool: 'ESP (Brevo, HubSpot, Mailchimp)',
            goal: '>28% Tasa de apertura B2B',
          },
        ],
      },
      notes: 'Explicar cómo cada celda corresponde a un compromiso de entrega con responsables técnicos en marketing y ventas B2B.',
    },
    {
      id: 'mia-4',
      layout: 'metrics',
      tag: 'Compromisos Cuantitativos · MIA FOODS',
      title: 'Las 4 Metas Clave de Impacto a 9 Meses',
      subtitle: 'Indicadores cuantitativos que validarán el éxito del plan de aceleración comercial en miafoods.es.',
      imageUrl: '/src/assets/images/mia_products_showcase_1791039505030.jpg',
      imageAlt: 'Catálogo de panadería y bollería MIA FOODS',
      metrics: [
        {
          id: 'm-mia-1',
          label: 'Tráfico Web Orgánico',
          value: '+120%',
          change: 'crecimiento cualificado',
          changePositive: true,
          description: 'Medido con GA4 y Search Console en búsquedas profesionales de panadería y bollería.',
        },
        {
          id: 'm-mia-2',
          label: 'Impresiones en LinkedIn',
          value: '+200%',
          change: 'alcance perfil corporativo',
          changePositive: true,
          description: 'Visibilidad de marca ante directores de compras, cadenas de retail y distribuidores.',
        },
        {
          id: 'm-mia-3',
          label: 'Generación de Leads B2B',
          value: '30+/mes',
          change: 'prospectos cualificados',
          changePositive: true,
          description: 'Descargas de fichas técnicas de producto y solicitudes de catálogo corporativo en CRM.',
        },
      ],
      notes: 'La cuarta meta (>28% Open Rate en email) complementa estas tres métricas asegurando la maduración de los prospectos.',
    },
    {
      id: 'mia-5',
      layout: 'split',
      tag: 'Dimensiones 1 & 2 · Notoriedad & Atracción',
      title: 'Tráfico Web y Posicionamiento en LinkedIn',
      subtitle: 'Atracción de compradores profesionales hacia la oferta de MIA FOODS.',
      columns: [
        {
          id: 'col-mia-1',
          title: 'Dimensión 1: Tráfico Web',
          subtitle: 'Google Analytics 4 / Search Console',
          items: [
            'Métricas clave: Visitas totales, tráfico orgánico y tiempo de permanencia.',
            'Herramientas técnicas: GA4 (eventos de permanencia) y Google Search Console.',
            'Meta a 9 meses: +120% de incremento en tráfico orgánico cualificado.',
            'Enfoque MIA FOODS: Posicionamiento SEO de gamas de panadería, masas madre y bollería congelada.',
          ],
        },
        {
          id: 'col-mia-2',
          title: 'Dimensión 2: Alcance y Marca',
          subtitle: 'LinkedIn Analytics',
          items: [
            'Métricas clave: Impresiones en LinkedIn, engagement rate y seguidores B2B.',
            'Herramientas técnicas: LinkedIn Page Analytics e informes de interacción.',
            'Meta a 9 meses: +200% de impresiones en el perfil corporativo de MIA FOODS.',
            'Enfoque MIA FOODS: Publicación de innovaciones de producto, tradición artesanal y presencia en ferias sectoriales.',
          ],
        },
      ],
      notes: 'La sinergia entre LinkedIn y el tráfico web permite posicionar a MIA FOODS como el socio industrial de referencia para el retail.',
    },
    {
      id: 'mia-6',
      layout: 'split',
      tag: 'Dimensiones 3 & 4 · Conversión & Fidelización',
      title: 'Conversión B2B y Email Marketing',
      subtitle: 'Captación de distribuidores y nutrición automatizada del ciclo de decisión.',
      columns: [
        {
          id: 'col-mia-3',
          title: 'Dimensión 3: Conversión B2B',
          subtitle: 'GA4 Event Tracking / CRM',
          items: [
            'Métricas clave: Solicitudes de catálogo, descargas de fichas técnicas y formularios.',
            'Herramientas técnicas: Seguimiento de eventos en GA4 y pipeline sincronizado en CRM.',
            'Meta a 9 meses: 30+ leads B2B cualificados por mes de manera sostenida.',
            'Enfoque MIA FOODS: Fichas técnicas detalladas por producto (ingredientes, alérgenos, trazabilidad y logística).',
          ],
        },
        {
          id: 'col-mia-4',
          title: 'Dimensión 4: Email Marketing',
          subtitle: 'ESP (Brevo / HubSpot / Mailchimp)',
          items: [
            'Métricas clave: Tasa de apertura (Open Rate), Tasa de Clics (CTR) y control de bajas.',
            'Herramientas técnicas: Plataforma ESP con etiquetado por tipo de cliente (Retail, Horeca, Export).',
            'Meta a 9 meses: >28% Tasa de apertura sostenida en comunicaciones B2B.',
            'Enfoque MIA FOODS: Secuencias automáticas tras descargar fichas y boletines de novedades de temporada.',
          ],
        },
      ],
      notes: 'Subrayar que cuando un comprador descarga una ficha técnica de Tradipan o Virgen del Brezo, el sistema activa el seguimiento comercial en menos de 24 horas.',
    },
    {
      id: 'mia-7',
      layout: 'timeline',
      tag: 'Plan de Implementación · MIA FOODS',
      title: 'Hoja de Ruta de Ejecución (9 Meses)',
      subtitle: 'Cronograma estructurado en 4 fases para alcanzar las metas progresivamente.',
      timeline: [
        {
          id: 't-mia-1',
          date: 'Meses 1 - 2 · Auditoría & Setup',
          title: 'Auditoría Técnica & Herramientas',
          description: 'Configuración de eventos de conversión en GA4 para fichas técnicas, píxel de LinkedIn y sincronización de CRM y ESP.',
          completed: true,
        },
        {
          id: 't-mia-2',
          date: 'Meses 3 - 4 · Lanzamiento',
          title: 'Contenidos SEO & Calendario LinkedIn',
          description: 'Optimización de palabras clave B2B para panadería industrial y activación del plan de contenidos corporativo en LinkedIn.',
          completed: false,
        },
        {
          id: 't-mia-3',
          date: 'Meses 5 - 7 · Automatización',
          title: 'Flujos de Nutrición & Fichas Técnicas',
          description: 'Despliegue de secuencias automáticas de email para solicitudes de catálogo y pruebas de formularios de contacto sin fricción.',
          completed: false,
        },
        {
          id: 't-mia-4',
          date: 'Meses 8 - 9 · Madurez & Metas',
          title: 'Consolidación de las 4 Metas',
          description: 'Alcanzar +120% tráfico web, +200% impresiones en LinkedIn, 30+ leads/mes y >28% Open Rate en campañas consolidadas.',
          completed: false,
        },
      ],
      notes: 'La fase inicial de setup garantiza que cada dato reportado a dirección sea 100% auditable y fidedigno.',
    },
    {
      id: 'mia-8',
      layout: 'closing',
      tag: 'Compromiso de Puesta en Marcha · MIA FOODS',
      title: 'Listos para iniciar la ejecución del Plan de Trabajo.',
      subtitle: 'Uniendo la tradición panadera y pastelera con la precisión del marketing digital B2B.',
      closing: {
        title: '¿Preguntas sobre las métricas, herramientas o fases del plan?',
        subtitle: 'Reunión quincenal de seguimiento de indicadores con informe ejecutivo para el comité de dirección.',
        email: 'comercial@miafoods.es',
        website: 'miafoods.es',
        actionText: 'Aprobar Plan de Trabajo MIA FOODS',
      },
      notes: 'Cierre de la presentación. Validar las fechas del primer sprint de setup y confirmación de accesos a las herramientas.',
    },
  ],
};

export const DEFAULT_DECK: PresentationDeck = MIA_FOODS_DECK;

export const TEMPLATE_DECKS: {
  id: string;
  name: string;
  category: string;
  description: string;
  slidesCount: number;
  deck: PresentationDeck;
}[] = [
  {
    id: 'deck-mia-foods-9-meses',
    name: 'MIA FOODS · Plan de Trabajo (9 Meses)',
    category: 'MIA FOODS (Versión Clara)',
    description: 'Imagen corporativa clara de MIA FOODS (miafoods.es) con imágenes de apoyo y las 4 dimensiones de medición.',
    slidesCount: 8,
    deck: MIA_FOODS_DECK,
  },
  {
    id: 'deck-pitch-startup',
    name: 'Pitch Deck para Inversores',
    category: 'Emprendimiento',
    description: 'El formato probado para rondas de capital: problema, solución, tracción y modelo de negocio.',
    slidesCount: 6,
    deck: {
      id: 'deck-pitch-startup',
      title: 'Pitch Deck · Ronda Seed 2026',
      author: 'Fundadores & Liderazgo',
      theme: 'obsidian-emerald',
      aspectRatio: '16:9',
      transition: 'slide',
      createdAt: '2026-03-01T08:00:00.000Z',
      updatedAt: '2026-03-01T08:00:00.000Z',
      slides: [
        {
          id: 'pitch-1',
          layout: 'title',
          tag: 'Oportunidad de Inversión · Serie Semilla',
          title: 'NexFlow: La Plataforma Inteligente de Logística B2B',
          subtitle: 'Reduciendo los costos de despacho en un 38% para empresas medianas mediante optimización algorítmica.',
          content: 'Confidencial · Presentación para Inversionistas',
        },
        {
          id: 'pitch-2',
          layout: 'impact',
          tag: 'El Problema',
          title: 'El 43% de los camiones de carga viajan con espacio desaprovechado, costando $120B anuales a las pymes.',
          subtitle: 'La falta de visibilidad en tiempo real genera sobrecostos, retrasos innecesarios y una alta huella de carbono.',
        },
        {
          id: 'pitch-3',
          layout: 'split',
          tag: 'Nuestra Propuesta de Valor',
          title: 'Una Solución Tecnológica Integrada',
          subtitle: 'Conectamos carga y capacidad disponible en menos de 90 segundos.',
          columns: [
            {
              id: 'col-p1',
              title: 'Para Empresas Generadoras',
              subtitle: 'Ahorro y predictibilidad',
              items: [
                'Cotizaciones instantáneas con precios dinámicos justos.',
                'Seguimiento GPS satelital en tiempo real sin hardware adicional.',
                'Facturación centralizada y seguros de carga incluidos.',
              ],
            },
            {
              id: 'col-p2',
              title: 'Para Transportistas',
              subtitle: 'Máxima utilización de flota',
              items: [
                'Rellenado inteligente de espacio ocioso en rutas existentes.',
                'Pagos garantizados en 48 horas sin intermediarios abusivos.',
                'Panel móvil sencillo adaptado a conductores en ruta.',
              ],
            },
          ],
        },
        {
          id: 'pitch-4',
          layout: 'metrics',
          tag: 'Tracción & Números',
          title: 'Validación en los Primeros 10 Meses',
          subtitle: 'Crecimiento orgánico sostenido con recomendaciones boca a boca.',
          metrics: [
            {
              id: 'pm-1',
              label: 'Volumen Bruto Procesado (GMV)',
              value: '$4.2M',
              change: '3.4x últimos 6 meses',
              changePositive: true,
              description: 'Más de 18,000 envíos coordinados sin incidencias mayores.',
            },
            {
              id: 'pm-2',
              label: 'Margen de Contribución',
              value: '19.4%',
              change: '+4.2% margen neto',
              changePositive: true,
              description: 'Modelo de comisión por transacción con economía unitaria positiva.',
            },
            {
              id: 'pm-3',
              label: 'Retención de Clientes',
              value: '91%',
              change: 'Cohortes estables',
              changePositive: true,
              description: 'El 84% de las empresas repiten pedidos en menos de 14 días.',
            },
          ],
        },
        {
          id: 'pitch-5',
          layout: 'quote',
          tag: 'Validación del Cliente',
          title: 'Lo que dicen quienes usan la plataforma a diario',
          subtitle: 'Impacto directo en la cuenta de resultados de nuestros usuarios.',
          quote: {
            text: 'NexFlow nos permitió reducir los tiempos de entrega a la mitad y recortar nuestro gasto logístico un 32% en el primer trimestre de adopción.',
            author: 'Mariana Silva',
            role: 'Directora de Operaciones & Cadena de Suministro',
            organization: 'Distribuidora Continental S.A.',
          },
        },
        {
          id: 'pitch-6',
          layout: 'closing',
          tag: 'Ronda de Inversión',
          title: 'Buscamos $2.5M para acelerar nuestro despliegue en 6 ciudades.',
          subtitle: '70% asignado a producto e ingeniería; 30% a ventas corporativas directas.',
          closing: {
            title: 'Hablemos de cómo revolucionar la logística juntos',
            subtitle: 'Data room completo y proyecciones auditadas disponibles.',
            email: 'founders@nexflow.io',
            website: 'www.nexflow.io',
            actionText: 'Agendar Reunión con Fundadores',
          },
        },
      ],
    },
  },
  {
    id: 'deck-blanco',
    name: 'Lienzo en Blanco',
    category: 'Personalizado',
    description: 'Empieza desde cero con una diapositiva limpia y añade las plantillas que necesites.',
    slidesCount: 1,
    deck: {
      id: 'deck-blanco',
      title: 'Nueva Presentación',
      author: 'Tu Nombre',
      theme: 'clean-white',
      aspectRatio: '16:9',
      transition: 'slide',
      createdAt: '2026-03-01T08:00:00.000Z',
      updatedAt: '2026-03-01T08:00:00.000Z',
      slides: [
        {
          id: 'b-1',
          layout: 'title',
          tag: 'Tema o Categoría',
          title: 'Haz clic aquí para escribir tu título',
          subtitle: 'Escribe un subtítulo explicativo o la idea central de tu presentación.',
          content: 'Nombre del Autor · Mes 2026',
        },
      ],
    },
  },
];
