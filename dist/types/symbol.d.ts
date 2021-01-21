import { Runtype } from '../runtype.js';
interface Sym extends Runtype<symbol> {
    tag: 'symbol';
}
/**
 * Validates that a value is a symbol.
 */
declare const Sym: Sym;
export { Sym as Symbol };
