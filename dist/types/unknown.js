import { create } from '../runtype.js';
/**
 * Validates anything, but provides no new type information about it.
 */
export const Unknown = create(value => ({ success: true, value }), { tag: 'unknown' });
//# sourceMappingURL=unknown.js.map