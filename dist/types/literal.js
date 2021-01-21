import { create } from '../runtype.js';
/**
 * Be aware of an Array of Symbols `[Symbol()]` which would throw "TypeError: Cannot convert a Symbol value to a string"
 */
function literal(value) {
    return Array.isArray(value) ? String(value.map(String)) : String(value);
}
/**
 * Construct a runtype for a type literal.
 */
export function Literal(valueBase) {
    return create(value => value === valueBase
        ? { success: true, value }
        : {
            success: false,
            message: `Expected literal '${literal(valueBase)}', but was '${literal(value)}'`,
        }, { tag: 'literal', value: valueBase });
}
/**
 * An alias for Literal(undefined).
 */
export const Undefined = Literal(undefined);
/**
 * An alias for Literal(null).
 */
export const Null = Literal(null);
//# sourceMappingURL=literal.js.map