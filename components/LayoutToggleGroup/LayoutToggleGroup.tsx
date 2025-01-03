import React, { useCallback, useMemo } from 'react';
import { ToggleGroupItem as ToggleGroupItems } from '../../components-radix-ui/ToggleGroup/toggleGroupLib';
import { TbLayoutGrid, TbLayoutRows } from 'react-icons/tb';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import { LayoutToggleGroupOption } from './layoutToggleGroupLib';
import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import { setModuleListLayoutLocalStore } from '../../store/lib/ModuleListLayout/moduleLayoutLocalStore';
import { useModuleListLayout } from '../../store/lib/ModuleListLayout/useModuleListLayout';

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
  moduleType?: PbModuleType;
};

const LayoutToggleGroup: React.FC<LayoutToggleGroupProps> = ({
  moduleType = PbModuleType.MODULE_TYPE_UNKNOWN,
  ...toggleGroupProps
}) => {
  const [layout, setLayout] = useModuleListLayout(moduleType);

  const defaultValue = layout;

  const changeHandler = useCallback(
    (value: LayoutToggleGroupOption) => {
      setLayout(value);
      if (moduleType) {
        setModuleListLayoutLocalStore(moduleType, value);
      }
    },
    [moduleType, setLayout],
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
