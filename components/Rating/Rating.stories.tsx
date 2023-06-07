import { Meta, StoryObj } from '@storybook/react';
import Rating from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  render: (args) => <Rating {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const storyDefault: Story = {
  name: 'Default',
  args: {
    defaultValue: 3,
    disabled: false,
  },
};

export const storyDisabled: Story = {
  name: 'Disabled',
  args: {
    defaultValue: 3,
    disabled: true,
  },
};
