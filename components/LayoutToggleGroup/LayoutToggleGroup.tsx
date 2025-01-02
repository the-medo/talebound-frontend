import React, { useCallback, useMemo } from 'react';
import { ToggleGroupItem as ToggleGroupItems } from '../../components-radix-ui/ToggleGroup/toggleGroupLib';
import { TbLayoutGrid, TbLayoutRows } from 'react-icons/tb';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import { LayoutToggleGroupOption } from './layoutToggleGroupLib';
import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import { getItem, LSKey } from '../../store/localStore';
import { setModuleLayoutLocalStore } from '../../store/moduleLayoutLocalStore';

const layoutToggleGroupItems: ToggleGroupItems<LayoutToggleGroupOption>[] = [
  {
    label: 'Row layout',
    value: 'rowLayout',
    icon: <TbLayoutRows />,
  },
  {
    label: 'Grid layout',
    value: 'gridLayout',
    icon: <TbLayoutGrid />,
  },
];

type LayoutToggleGroupProps = Omit<
  ToggleGroupSingleProps,
  'type' | 'onValueChange' | 'defaultValue'
> & {
  onValueChange: (v: LayoutToggleGroupOption) => void;
  moduleType?: PbModuleType;
};

const LayoutToggleGroup: React.FC<LayoutToggleGroupProps> = ({
  moduleType,
  onValueChange,
  ...toggleGroupProps
}) => {
  const defaultValue = useMemo(
    () => (moduleType ? getItem(LSKey.MODULE_LIST_LAYOUT)?.[moduleType] : undefined) ?? 'rowLayout',
    [moduleType],
  );

  const changeHandler = useCallback(
    (v: LayoutToggleGroupOption) => {
      onValueChange(v);
      if (moduleType) {
        setModuleLayoutLocalStore(moduleType, v);
      }
    },
    [moduleType, onValueChange],
  );

  return (
    <ToggleGroup
      type="single"
      items={layoutToggleGroupItems}
      onValueChange={changeHandler}
      defaultValue={defaultValue}
      {...toggleGroupProps}
    />
  );
};

export default LayoutToggleGroup;
