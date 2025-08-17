import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import InputField from '../src/components/InputField/InputField';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />);
    // Check that both label and input are rendered
    expect(screen.getByText('Test Label')).toBeDefined();
    expect(screen.getByRole('textbox')).toBeDefined();
  });

  test('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<InputField onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('shows error message when invalid', () => {
    render(<InputField invalid errorMessage="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('shows helper text', () => {
    render(<InputField helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  test('disables input when disabled prop is true', () => {
    render(<InputField disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('shows loading spinner when loading', () => {
    render(<InputField loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('clear button clears input', () => {
    render(<InputField showClearButton defaultValue="test" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const clearButton = screen.getByLabelText('Clear input');
    fireEvent.click(clearButton);
    expect(input.value).toBe('');
  });

  test('password toggle changes input type', () => {
    render(<InputField type="password" showPasswordToggle />);
    const input = screen.getByDisplayValue('');
    const toggleButton = screen.getByLabelText('Show password');

    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  test('applies correct classes for size variants', () => {
    const { rerender } = render(<InputField size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-sm');

    rerender(<InputField size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-base');

    rerender(<InputField size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-lg');
  });

  test('applies correct classes for variant types', () => {
    const { rerender } = render(<InputField variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-100');

    rerender(<InputField variant="outlined" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-white');

    rerender(<InputField variant="ghost" />);
    expect(screen.getByRole('textbox')).toHaveClass('rounded-none');
  });
});