/**
 * Generates a unique ID for components
 */
export declare const generateId: () => string;
/**
 * Debounces a function call
 */
export declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => (...args: Parameters<T>) => void;
/**
 * Throttles a function call
 */
export declare const throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => (...args: Parameters<T>) => void;
/**
 * Clamps a value between min and max
 */
export declare const clamp: (value: number, min: number, max: number) => number;
/**
 * Formats a number with proper thousand separators
 */
export declare const formatNumber: (num: number) => string;
/**
 * Capitalizes the first letter of a string
 */
export declare const capitalize: (str: string) => string;
//# sourceMappingURL=index.d.ts.map