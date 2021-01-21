import { create } from '../runtype';
/**
 * Validates that a value is a number.
 */
export const Number = create(value => typeof value === 'number'
    ? { success: true, value }
    : {
        success: false,
        message: `Expected number, but was ${value === null ? value : typeof value}`,
    }, { tag: 'number' });
//# sourceMappingURL=number.js.map