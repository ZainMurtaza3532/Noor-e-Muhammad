import { en } from './en';
import { ur } from './ur';
import { ar } from './ar';
import type { Language } from '../types';

export const translations = { en, ur, ar };

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
