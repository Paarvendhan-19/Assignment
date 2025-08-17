import { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import { ErrorBoundaryProps } from '../src/components/ErrorBoundary/ErrorBoundary.types';

// Component that throws an error for demonstration
const ErrorComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a demo error for Storybook');
  }
  return <div className="p-4 bg-green-100 text-green-800 rounded">No error - component rendered successfully!</div>;
};

const meta: Meta<ErrorBoundaryProps> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  argTypes: {
    fallback: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<ErrorBoundaryProps>;

export const NoError: Story = {
  args: {
    children: <ErrorComponent shouldThrow={false} />,
  },
};

export const WithError: Story = {
  args: {
    children: <ErrorComponent shouldThrow={true} />,
  },
};

export const CustomFallback: Story = {
  args: {
    children: <ErrorComponent shouldThrow={true} />,
    fallback: (
      <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded">
        <h3 className="font-bold">Custom Error Fallback</h3>
        <p>This is a custom error message with custom styling.</p>
      </div>
    ),
  },
};

export const WithCallback: Story = {
  args: {
    children: <ErrorComponent shouldThrow={true} />,
    onError: (error, errorInfo) => {
      console.log('Error caught by ErrorBoundary:', error);
      console.log('Error info:', errorInfo);
    },
  },
};
