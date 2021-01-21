import { create } from '../runtype.js';
/**
 * Validates that a value is a boolean.
 */
export const Boolean = create(value => typeof value === 'boolean'
    ? { success: true, value }
    : {
        success: false,
        message: `Expected boolean, but was ${value === null ? value : typeof value}`,
    }, { tag: 'boolean' });
//# sourceMappingURL=boolean.js.map