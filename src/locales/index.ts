import { en, LocaleDictionary } from './en.ts';
import { hi } from './hi.ts';

export { en, hi };
export type { LocaleDictionary };

export type SupportedLanguage = 'en' | 'hi';

export function getLocale(lang: SupportedLanguage): LocaleDictionary {
  return lang === 'hi' ? hi : en;
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
