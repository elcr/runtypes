import { create } from '../runtype';
/**
 * Validates that a value is a string.
 */
export const String = create(value => typeof value === 'string'
    ? { success: true, value }
    : {
        success: false,
        message: `Expected string, but was ${value === null ? value : typeof value}`,
    }, { tag: 'string' });
//# sourceMappingURL=string.js.map