/**
 * Component size variants
 */
export declare const COMPONENT_SIZES: {
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
};
export type ComponentSize = typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES];
/**
 * Input field variants
 */
export declare const INPUT_VARIANTS: {
    readonly FILLED: "filled";
    readonly OUTLINED: "outlined";
    readonly GHOST: "ghost";
};
export type InputVariant = typeof INPUT_VARIANTS[keyof typeof INPUT_VARIANTS];
/**
 * Data table sorting directions
 */
export declare const SORT_DIRECTIONS: {
    readonly ASC: "asc";
    readonly DESC: "desc";
    readonly NONE: "none";
};
export type SortDirection = typeof SORT_DIRECTIONS[keyof typeof SORT_DIRECTIONS];
/**
 * Common CSS class names
 */
export declare const CSS_CLASSES: {
    readonly LOADING: "loading";
    readonly DISABLED: "disabled";
    readonly ERROR: "error";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
};
/**
 * Animation durations (in milliseconds)
 */
export declare const ANIMATION_DURATIONS: {
    readonly FAST: 150;
    readonly NORMAL: 300;
    readonly SLOW: 500;
};
/**
 * Z-index values for layering
 */
export declare const Z_INDEX: {
    readonly DROPDOWN: 1000;
    readonly MODAL: 1050;
    readonly TOOLTIP: 1100;
    readonly NOTIFICATION: 1150;
};
//# sourceMappingURL=index.d.ts.map