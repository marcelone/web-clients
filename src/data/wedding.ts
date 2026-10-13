/**
 * Wedding configuration — single source of truth.
 * Edit this file to customise the event without touching components.
 *
 * Anything left as `null` will render a clearly-labelled "Próximamente"
 * state so the site never shows broken counters or empty links.
 */

export type Nullable<T> = T | null;

export interface ContactPerson {
  name: string;
  role?: string;
  phone?: Nullable<string>;
  email?: Nullable<string>;
  whatsapp?: Nullable<string>;
}

export interface Accommodation {
  name: string;
  description?: string;
  town?: string;
  distance?: string;
  booking?: string;
  url?: string;
  note?: string;
}

export interface WeddingConfig {
  couple: {
    a: string;
    b: string;
    hashtag?: string;
  };
  event: {
    /** ISO date — e.g. "2026-09-12" */
    date: string;
    /** 24h time — e.g. "19:00" */
    time: string;
    /** Friendly weekday / day label to show */
    dayLabel?: string;
    /** Time guests should arrive */
    arrivalTime?: string;
  };
  venue: {
    name: string;
    address: string;
    city?: string;
    /** Full Google Maps URL */
    mapsUrl: string;
  };
  copy: {
    heroClaim: string;
    heroSubtitle: string;
    dateHeading: string;
    dressHeading: string;
    dressCopy: string;
    dressRequirement: string;
    locationHeading: string;
    locationArrivalLabel: string;
    accommodationHeading: string;
    accommodationCopy: string;
    contactHeading: string;
    contactCopy: string;
    footerMessage: string;
  };
  dressCode: {
    label: string;
    requirement: string;
    note: string;
  };
  accommodation: Accommodation[];
  contact: ContactPerson[];
  seo: {
    title: string;
    description: string;
    url?: string;
    image?: string;
  };
}

const cfg: WeddingConfig = {
  couple: {
    a: 'Miguel',
    b: 'Fran',
    hashtag: '#MiguelYFran',
  },

  /* TODO: confirm date / time with the couple.
     Placeholder is a Saturday in the future so the countdown
     stays alive while the real date is being confirmed. */
  event: {
    date: '2027-09-11',
    time: '19:00',
    dayLabel: 'Sábado',
    arrivalTime: '18:30',
  },

  /* TODO: confirm venue + address.
     The placeholders below make it obvious the data is editable. */
  venue: {
    name: 'Próximamente',
    address: 'Dirección por confirmar',
    city: '',
    mapsUrl: '',
  },

  copy: {
    heroClaim: 'El amor es cosa seria. La fiesta, también.',
    heroSubtitle: '¡Nos casamos!',
    dateHeading: 'Save the date, baby!',
    dressHeading: 'Dress to impress!',
    dressCopy:
      'Ven guapo, ven guapa, ven como tú quieras… ¡pero ven con ganas de darlo todo!',
    dressRequirement: 'Próximamente',
    locationHeading: 'The place to be',
    locationArrivalLabel: 'Hora de llegada',
    accommodationHeading: 'Sleep later, party now!',
    accommodationCopy:
      'Sabemos que después de una noche legendaria necesitarás recuperar fuerzas. Aquí tienes algunas opciones para descansar.',
    contactHeading: 'Any questions, party people?',
    contactCopy:
      '¿Dudas, preguntas o una emergencia estilística de última hora? ¡Escríbenos!',
    footerMessage: 'Nos vemos en la pista de baile.',
  },

  dressCode: {
    label: 'Dress code',
    requirement: 'Próximamente',
    note: 'Pronto publicaremos las indicaciones oficiales. Por ahora: ven con actitud.',
  },

  /* TODO: confirm accommodations with the couple. */
  accommodation: [
    {
      name: 'Próximamente',
      description: 'Pronto añadiremos aquí alojamientos recomendados.',
      town: '',
      distance: '',
      booking: '',
      url: '',
      note: 'Estamos cerrando acuerdos con hoteles locales.',
    },
  ],

  /* TODO: confirm contact details (phone / WhatsApp / email). */
  contact: [
    {
      name: 'Miguel',
      role: 'El novio',
      phone: null,
      email: null,
      whatsapp: null,
    },
    {
      name: 'Fran',
      role: 'El otro novio',
      phone: null,
      email: null,
      whatsapp: null,
    },
  ],

  seo: {
    title: 'Miguel & Fran — Love, Funk & Disco',
    description:
      'La web de la boda de Miguel y Fran. Fecha, dress code, ubicación, alojamientos y contacto. Una experiencia funky, disco y llena de amor.',
    url: 'https://miguel-Fran.com/',
    image: '/og-image.svg',
  },
};

export default cfg;

/* ---------- helpers used by components ---------- */

const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

const WEEKDAYS_ES = [
  'domingo', 'lunes', 'martes', 'miércoles',
  'jueves', 'viernes', 'sábado',
];

export function formatLongDate(iso: string): { day: number; month: string; year: number; weekday: string } | null {
  if (!iso) return null;
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return null;
  return {
    day: d.getDate(),
    month: MONTHS_ES[d.getMonth()],
    year: d.getFullYear(),
    weekday: WEEKDAYS_ES[d.getDay()],
  };
}

export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  const v = value.trim().toLowerCase();
  return v === '' || v === 'próximamente' || v === 'proximamente';
}
