import { en, LocaleDictionary } from './en.ts';
import { hi } from './hi.ts';
import { mr } from './mr.ts';
import { bn } from './bn.ts';
import { ta } from './ta.ts';
import { te } from './te.ts';
import { gu } from './gu.ts';
import { kn } from './kn.ts';
import { ml } from './ml.ts';
import { pa } from './pa.ts';
import { or } from './or.ts';
import { ur } from './ur.ts';

export { en, hi, mr, bn, ta, te, gu, kn, ml, pa, or, ur };
export type { LocaleDictionary };

export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'mr'
  | 'bn'
  | 'ta'
  | 'te'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'ur';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;        // Native name
  englishName: string; // English name
  script: string;
  isRtl?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', englishName: 'English', script: 'Latin' },
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', script: 'Devanagari' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', script: 'Devanagari' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', script: 'Bengali' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', script: 'Tamil' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', script: 'Telugu' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', script: 'Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', script: 'Kannada' },
  { code: 'ml', name: 'മലയാളം', englishName: 'Malayalam', script: 'Malayalam' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', script: 'Gurmukhi' },
  { code: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia', script: 'Odia' },
  { code: 'ur', name: 'اردو', englishName: 'Urdu', script: 'Perso-Arabic', isRtl: true },
];

const localeMap: Record<SupportedLanguage, LocaleDictionary> = {
  en,
  hi,
  mr,
  bn,
  ta,
  te,
  gu,
  kn,
  ml,
  pa,
  or,
  ur,
};

export function getLocale(lang: SupportedLanguage): LocaleDictionary {
  return localeMap[lang] || en;
}

export function isRtlLanguage(lang: SupportedLanguage): boolean {
  return lang === 'ur';
}

/**
 * Universal localized string helper.
 * Extracts the appropriate string for the chosen language, with fallbacks.
 */
export function getLocalizedText(
  item: Record<string, string | undefined> | string | undefined | null,
  lang: SupportedLanguage,
  fallbackLang: SupportedLanguage = 'en'
): string {
  if (!item) return '';
  if (typeof item === 'string') return item;
  if (item[lang]) return item[lang] as string;
  // If not found in current language:
  if (lang !== 'hi' && item['hi']) return item['hi'] as string;
  if (item[fallbackLang]) return item[fallbackLang] as string;
  return Object.values(item)[0] || '';
}

/**
 * Programmatically compares two locale objects recursively.
 * Returns an array of missing key paths.
 */
export function findMissingLocaleKeys(
  base: Record<string, any>,
  target: Record<string, any>,
  prefix = ''
): string[] {
  const missing: string[] = [];

  for (const key of Object.keys(base)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (!(key in target)) {
      missing.push(currentPath);
    } else if (
      typeof base[key] === 'object' &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      if (typeof target[key] !== 'object' || target[key] === null) {
        missing.push(currentPath);
      } else {
        missing.push(...findMissingLocaleKeys(base[key], target[key], currentPath));
      }
    }
  }

  return missing;
}
