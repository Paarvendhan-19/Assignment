// Utility functions for the component library

/**
 * Generates a unique ID for components
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Debounces a function call
 */
// eslint-disable-next-line no-unused-vars
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
// eslint-disable-next-line no-unused-vars
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line no-unused-vars
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttles a function call
 */
// eslint-disable-next-line no-unused-vars
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
// eslint-disable-next-line no-unused-vars
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  // eslint-disable-next-line no-unused-vars
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Clamps a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Formats a number with proper thousand separators
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}; 