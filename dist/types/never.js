import { create } from '../runtype';
/**
 * Validates nothing (unknown fails).
 */
export const Never = create(value => ({
    success: false,
    message: `Expected nothing, but was ${value === null ? value : typeof value}`,
}), { tag: 'never' });
//# sourceMappingURL=never.js.map