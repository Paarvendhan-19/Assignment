import { Meta, StoryObj } from '@storybook/react';
import InputField from '../src/components/InputField/InputField';
import { InputFieldProps } from '../src/components/InputField/InputField.types';

const meta: Meta<InputFieldProps> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    loading: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
  },
};

export default meta;

type Story = StoryObj<InputFieldProps>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text',
    label: 'Input Label',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    ...Default.args,
    invalid: true,
    errorMessage: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    ...Default.args,
    helperText: 'This is helper text',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const WithClearButton: Story = {
  args: {
    ...Default.args,
    showClearButton: true,
    defaultValue: 'Clear me',
  },
};

export const PasswordInput: Story = {
  args: {
    ...Default.args,
    type: 'password',
    showPasswordToggle: true,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    ...Default.args,
    className: 'dark:text-white',
  },
};