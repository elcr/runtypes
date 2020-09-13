import { create } from '../runtype';
/**
 * Validates that a value is a symbol.
 */
const Sym = create(value => typeof value === 'symbol'
    ? { success: true, value }
    : {
        success: false,
        message: `Expected symbol, but was ${value === null ? value : typeof value}`,
    }, { tag: 'symbol' });
export { Sym as Symbol };
//# sourceMappingURL=symbol.js.map