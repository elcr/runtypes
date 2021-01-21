import { create } from '../runtype.js';
/**
 * Construct a runtype for functions.
 */
export const Function = create(value => typeof value === 'function'
    ? { success: true, value }
    : {
        success: false,
        message: `Expected function, but was ${value === null ? value : typeof value}`,
    }, { tag: 'function' });
//# sourceMappingURL=function.js.map