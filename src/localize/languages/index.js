import en from './en.json';
import fr from './fr.json';
import de from './de.json';
import es from './es.json';
import it from './it.json';
import nl from './nl.json';
import ptBR from './pt-BR.json';
import pl from './pl.json';

// Seeded translations. Any HA language not listed here resolves to English
// via the fallback in localize(); add a JSON file + an entry to translate it.
export const LANGUAGES = {
  en,
  fr,
  de,
  es,
  it,
  nl,
  'pt-BR': ptBR,
  pl,
};

// Full list of Home Assistant frontend language codes (used by the editor and
// to document coverage). Unlisted-in-LANGUAGES codes fall back to English.
export const HA_LANGUAGES = [
  'af', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en',
  'en-GB', 'eo', 'es', 'es-419', 'et', 'eu', 'fa', 'fi', 'fr', 'fy', 'gl',
  'gsw', 'he', 'hi', 'hr', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'ka', 'kn',
  'ko', 'lb', 'lt', 'lv', 'ml', 'nb', 'nl', 'nn', 'pl', 'pt', 'pt-BR', 'ro',
  'ru', 'sk', 'sl', 'sr', 'sr-Latn', 'sv', 'ta', 'te', 'th', 'tr', 'uk',
  'ur', 'vi', 'zh-Hans', 'zh-Hant',
];
