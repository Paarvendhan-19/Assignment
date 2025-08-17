import React, { useState, useRef, useEffect } from 'react';
import { InputFieldProps } from './InputField.types';

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      value: propValue,
      defaultValue,
      onChange,
      label,
      placeholder = '',
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      showClearButton = false,
      showPasswordToggle = false,
      className = '',
      ...restProps
    } = props;

    // Generate unique ID for this component instance
    const inputId = restProps.id || `input-field-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    console.log('InputField rendering with inputId:', inputId, 'label:', label);

    const [internalValue, setInternalValue] = useState(propValue || defaultValue || '');
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (propValue !== undefined) {
        setInternalValue(propValue);
      }
    }, [propValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    const handleClear = () => {
      setInternalValue('');
      if (inputRef.current) {
        inputRef.current.value = '';
        const syntheticEvent = {
          target: inputRef.current,
          currentTarget: inputRef.current,
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

    // Create CSS classes - CRITICAL: Use bg-gray-100 for filled variant
    const createInputClasses = () => {
      const classes = [];

      // Base classes
      classes.push('w-full', 'border', 'rounded-md', 'transition-all', 'duration-200');
      classes.push('placeholder-gray-400', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-opacity-50');
      classes.push('disabled:bg-gray-100', 'disabled:cursor-not-allowed', 'disabled:opacity-50');

      // Variant classes - ENSURE bg-gray-100 for filled
      if (variant === 'filled') {
        classes.push('bg-gray-100', 'border-gray-300', 'focus:bg-white', 'focus:border-blue-500');
      } else if (variant === 'outlined') {
        classes.push('bg-white', 'border-gray-300', 'focus:border-blue-500');
      } else if (variant === 'ghost') {
        classes.push('bg-transparent', 'border-transparent', 'border-b', 'border-b-gray-300', 'rounded-none', 'focus:border-b-blue-500');
      }

      // Size classes
      if (size === 'sm') {
        classes.push('px-2', 'py-1', 'text-sm');
      } else if (size === 'md') {
        classes.push('px-3', 'py-2', 'text-base');
      } else if (size === 'lg') {
        classes.push('px-4', 'py-3', 'text-lg');
      }

      // State classes
      if (invalid) {
        classes.push('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
      }
      if (loading) {
        classes.push('opacity-75');
      }

      return classes.join(' ');
    };

    return (
      <div className={`input-field ${className}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
            }}
            type={inputType}
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            aria-invalid={invalid}
            aria-required={restProps.required}
            className={createInputClasses()}
            {...restProps}
            id={inputId}
          />
          {loading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div
                className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"
                role="status"
                aria-label="Loading"
              />
            </div>
          )}
          {showClearButton && internalValue && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear input"
            >
              ×
            </button>
          )}
          {showPasswordToggle && type === 'password' && !loading && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          )}
        </div>
        {(helperText || errorMessage) && (
          <div className="mt-1">
            <span className={`text-xs ${invalid ? 'text-red-500' : 'text-gray-500'}`}>
              {errorMessage || helperText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;