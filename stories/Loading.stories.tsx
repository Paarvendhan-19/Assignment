import { Meta, StoryObj } from '@storybook/react';
import Loading from '../src/components/Loading/Loading';
import { LoadingProps } from '../src/components/Loading/Loading.types';

const meta: Meta<LoadingProps> = {
  title: 'Components/Loading',
  component: Loading,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['spinner', 'dots', 'skeleton'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    text: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<LoadingProps>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: 'Loading data...',
  },
};

export const Spinner: Story = {
  args: {
    variant: 'spinner',
    text: 'Loading...',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
    text: 'Please wait...',
  },
};

export const Skeleton: Story = {
  args: {
    variant: 'skeleton',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    text: 'Loading...',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    text: 'Loading...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    text: 'Loading...',
  },
};
