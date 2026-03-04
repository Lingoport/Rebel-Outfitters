import { locale, i18nMode } from '../app.js';

const currencyMap = {
  'en-us': { code: 'USD', bcp47: 'en-US' },
  'fr-fr': { code: 'EUR', bcp47: 'fr-FR' },
  'zh-cn': { code: 'CNY', bcp47: 'zh-CN' },
  'yo':    { code: 'USD', bcp47: 'en-US' },
  'si':    { code: 'USD', bcp47: 'en-US' },
};

const cache = {};  // { [locale]: stringsObject }

async function loadStrings(loc) {
  if (!cache[loc]) {
    const res = await fetch(`/content/${loc}/strings.json`);
    cache[loc] = await res.json();
  }
  return cache[loc];
}

// Resolve dot-notation key ("navbar.home") into nested object
function resolve(obj, key) {
  return key.split('.').reduce((o, k) => o?.[k], obj);
}

// Core lookup. Falls back to `fallback` if key not found.
async function getString(key, fallback = '') {
  const strings = await loadStrings(locale);
  return resolve(strings, key) ?? fallback;
}

// t() — use in components. Returns fallback immediately in non-i18n mode.
async function t(key, fallback) {
  if (i18nMode !== 'i18n') return fallback;
  return getString(key, fallback);
}

function formatCurrency(amount) {
  if (i18nMode !== 'i18n') {
    // existing bad i18n behavior
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const { code, bcp47 } = currencyMap[locale] ?? currencyMap['en-us'];
  return new Intl.NumberFormat(bcp47, { style: 'currency', currency: code }).format(amount);
}

function formatDate(date) {
  if (i18nMode !== 'i18n') {
    // existing bad i18n behavior
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    return `${mm}/${dd}/${date.getFullYear()}`;
  }
  const { bcp47 } = currencyMap[locale] ?? currencyMap['en-us'];
  return new Intl.DateTimeFormat(bcp47).format(date);
}

export default { t, formatCurrency, formatDate };
