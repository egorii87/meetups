import { dataCyAttribute } from './dataCyAttribute';

export function dataCy(key: keyof typeof dataCyAttribute) {
  if (!key) {
    return {};
  }
  const value = dataCyAttribute[key];
  return { 'data-cy': value };
}
