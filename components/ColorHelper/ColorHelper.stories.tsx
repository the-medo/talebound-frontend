import { Meta, StoryObj } from '@storybook/react';
import ColorHelper from './ColorHelper';
import {
  baseColors,
  primaryColors,
  secondaryColors,
  statusColors,
  tertiaryColors,
  transparentColors,
  whiteColors,
} from './colorHelperLib';

const meta: Meta<typeof ColorHelper> = {
  title: '1. Colors/Colors',
  component: ColorHelper,
  render: (args) => <ColorHelper {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const storyBaseColors: Story = {
  name: 'Color - Base',
  args: {
    colors: baseColors,
  },
};

export const storyPrimaryColors: Story = {
  name: 'Color - Primary',
  args: {
    colors: primaryColors,
  },
};

export const storySecondaryColors: Story = {
  name: 'Color - Secondary',
  args: {
    colors: secondaryColors,
  },
};

export const storyTertiaryColors: Story = {
  name: 'Color - Tertiary',
  args: {
    colors: tertiaryColors,
  },
};

export const storyWhiteColors: Story = {
  name: 'Shades of white',
  args: {
    bg: 'dark',
    colors: whiteColors,
  },
};

export const storyTransparentColors: Story = {
  name: 'Shades of transparent',
  args: {
    bg: 'image',
    colors: transparentColors,
  },
};

export const storyStatusColors: Story = {
  name: 'Status colors',
  args: {
    colors: statusColors,
  },
};
