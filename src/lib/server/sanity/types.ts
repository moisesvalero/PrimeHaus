import type { SiteLocale } from '$lib/i18n/site-locale';

export type SanitySitePortfolio = {
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  features?: Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>;
  pricing?: Array<{
    name?: string;
    price?: string;
    period?: string;
    description?: string;
    features?: string[];
    cta?: string;
    featured?: boolean;
  }>;
  faq?: Array<{
    question?: string;
    answer?: string;
  }>;
  testimonials?: Array<{
    name?: string;
    role?: string;
    content?: string;
    avatar?: string;
  }>;
  socialProof?: {
    proof?: string;
    rating?: string;
  };
};

export type SanitySitePortfolioContext = {
  projectId: string;
  dataset: string;
  baseUrl: string;
  locale: SiteLocale;
};

export type SanityLocaleString = {
  es?: string;
  en?: string;
  fr?: string;
  de?: string;
};

export type SanityLocaleText = {
  es?: string;
  en?: string;
  fr?: string;
  de?: string;
};

export type SanityPrimeProject = {
  _id: string;
  showOnHome?: boolean;
  homeSortOrder?: number;
  title?: SanityLocaleString;
  slug?: { current?: string };
  price?: string;
  location?: SanityLocaleString;
  heroTag?: SanityLocaleString;
  heroDescription?: SanityLocaleText;
  specs?: Array<{
    label?: SanityLocaleString;
    value?: string;
  }>;
  images?: {
    principal?: string;
    secondary1?: string;
    secondary2?: string;
  };
  videoUrl?: string;
  body?: SanityLocaleText;
  seoDescription?: SanityLocaleText;
};

export type MappedPrimeProject = {
  id: string;
  title: string;
  slug: string;
  price: string;
  location: string;
  heroTag: string;
  heroDescription: string;
  specs: Array<{ label: string; value: string }>;
  images: {
    principal: string;
    secondary1: string;
    secondary2: string;
  };
  videoUrl: string;
  body: string;
  seoDescription: string;
};
