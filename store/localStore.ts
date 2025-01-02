import { PbModuleType, PbUser } from '../generated/api-types/data-contracts';
import { LayoutToggleGroupOption } from '../components/LayoutToggleGroup/layoutToggleGroupLib';

export enum LSKey {
  USER = 'user',
  MODULE_LIST_LAYOUT = 'module-list-layout',
}

export interface LSValues {
  [LSKey.USER]?: PbUser;
  [LSKey.MODULE_LIST_LAYOUT]?: Record<PbModuleType, LayoutToggleGroupOption | undefined>;
}

export function setItem<T extends LSKey>(key: T, value: LSValues[T]): void {
  if (typeof window !== 'undefined') {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}

export function removeItem<T extends LSKey>(key: T): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export function getItem<T extends LSKey>(key: T): LSValues[T] | undefined {
  if (typeof window !== 'undefined') {
    const savedItem = localStorage.getItem(key);
    if (savedItem && savedItem !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return JSON.parse(savedItem) as LSValues[T];
    }
  }
  return undefined;
}
