import { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  render: (args) => <Loading {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const storyDefault: Story = {
  name: 'Default',
  args: {},
};
