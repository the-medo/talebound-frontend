import { PbModuleType } from '../generated/api-types/data-contracts';
import { LayoutToggleGroupOption } from '../components/LayoutToggleGroup/layoutToggleGroupLib';
import { getItem, LSKey, LSValues, setItem } from './localStore';

export const getModuleLayoutLocalStore = (
  moduleType: PbModuleType,
  defaultValue?: LayoutToggleGroupOption,
): LayoutToggleGroupOption => {
  return getItem(LSKey.MODULE_LIST_LAYOUT)?.[moduleType] ?? defaultValue ?? 'rowLayout';
};

export const setModuleLayoutLocalStore = (
  moduleType: PbModuleType,
  value: LayoutToggleGroupOption,
) => {
  const currentLocalStore = getItem(LSKey.MODULE_LIST_LAYOUT);

  const newValue = currentLocalStore
    ? { ...currentLocalStore, [moduleType]: value }
    : ({ [moduleType]: value } as LSValues[LSKey.MODULE_LIST_LAYOUT]);

  setItem(LSKey.MODULE_LIST_LAYOUT, newValue);
};
