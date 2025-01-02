import React from 'react';
import { ToggleGroupItem as ToggleGroupItems } from '../../components-radix-ui/ToggleGroup/toggleGroupLib';
import { TbLayoutGrid, TbLayoutRows } from 'react-icons/tb';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import { LayoutToggleGroupOption } from './layoutToggleGroupLib';
import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';

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
  defaultValue: LayoutToggleGroupOption;
};

const LayoutToggleGroup: React.FC<LayoutToggleGroupProps> = ({ ...toggleGroupProps }) => {
  return <ToggleGroup type="single" items={layoutToggleGroupItems} {...toggleGroupProps} />;
};

export default LayoutToggleGroup;
