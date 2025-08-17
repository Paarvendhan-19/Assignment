// Constants for the component library

/**
 * Component size variants
 */
export const COMPONENT_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type ComponentSize = typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES];

/**
 * Input field variants
 */
export const INPUT_VARIANTS = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  GHOST: 'ghost',
} as const;

export type InputVariant = typeof INPUT_VARIANTS[keyof typeof INPUT_VARIANTS];

/**
 * Data table sorting directions
 */
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: 'none',
} as const;

export type SortDirection = typeof SORT_DIRECTIONS[keyof typeof SORT_DIRECTIONS];

/**
 * Common CSS class names
 */
export const CSS_CLASSES = {
  LOADING: 'loading',
  DISABLED: 'disabled',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * Z-index values for layering
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  MODAL: 1050,
  TOOLTIP: 1100,
  NOTIFICATION: 1150,
} as const; 