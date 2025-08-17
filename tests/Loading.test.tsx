import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Loading from '../src/components/Loading/Loading';

describe('Loading', () => {
  test('renders spinner variant by default', () => {
    render(<Loading />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  test('renders with text', () => {
    render(<Loading text="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('renders dots variant', () => {
    render(<Loading variant="dots" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('flex space-x-1');
  });

  test('renders skeleton variant', () => {
    render(<Loading variant="skeleton" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('space-y-2');
  });

  test('applies correct size classes', () => {
    const { rerender } = render(<Loading size="sm" />);
    expect(screen.getByRole('progressbar')).toHaveClass('w-4 h-4');

    rerender(<Loading size="md" />);
    expect(screen.getByRole('progressbar')).toHaveClass('w-8 h-8');

    rerender(<Loading size="lg" />);
    expect(screen.getByRole('progressbar')).toHaveClass('w-12 h-12');
  });

  test('applies custom className', () => {
    render(<Loading className="custom-class" />);
    const container = screen.getByRole('progressbar').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
