import { create, innerValidate } from '../runtype';
/**
 * Construct an array runtype from a runtype for its elements.
 */
function InternalArr(element, isReadonly) {
    return withExtraModifierFuncs(create((xs, visited) => {
        if (!Array.isArray(xs)) {
            return {
                success: false,
                message: `Expected array, but was ${xs === null ? xs : typeof xs}`,
            };
        }
        for (const x of xs) {
            let validated = innerValidate(element, x, visited);
            if (!validated.success) {
                return {
                    success: false,
                    message: validated.message,
                    key: validated.key ? `[${xs.indexOf(x)}].${validated.key}` : `[${xs.indexOf(x)}]`,
                };
            }
        }
        return { success: true, value: xs };
    }, { tag: 'array', isReadonly, element }));
}
function Arr(element) {
    return InternalArr(element, false);
}
function withExtraModifierFuncs(A) {
    A.asReadonly = asReadonly;
    return A;
    function asReadonly() {
        return InternalArr(A.element, true);
    }
}
export { Arr as Array };
//# sourceMappingURL=array.js.map