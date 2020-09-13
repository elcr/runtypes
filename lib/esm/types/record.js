import { create, innerValidate } from '../runtype';
import { hasKey } from '../util';
import show from '../show';
/**
 * Construct a record runtype from runtypes for its values.
 */
export function InternalRecord(fields, isPartial, isReadonly) {
    return withExtraModifierFuncs(create((x, visited) => {
        if (x === null || x === undefined) {
            const a = create(_x => ({ success: true, value: _x }), { tag: 'record', fields });
            return { success: false, message: `Expected ${show(a)}, but was ${x}` };
        }
        for (const key in fields) {
            if (!isPartial || (hasKey(key, x) && x[key] !== undefined)) {
                const value = isPartial || hasKey(key, x) ? x[key] : undefined;
                let validated = innerValidate(fields[key], value, visited);
                if (!validated.success) {
                    return {
                        success: false,
                        message: validated.message,
                        key: validated.key ? `${key}.${validated.key}` : key,
                    };
                }
            }
        }
        return { success: true, value: x };
    }, { tag: 'record', isPartial, isReadonly, fields }));
}
export function Record(fields) {
    return InternalRecord(fields, false, false);
}
export function Partial(fields) {
    return InternalRecord(fields, true, false);
}
function withExtraModifierFuncs(A) {
    A.asPartial = asPartial;
    A.asReadonly = asReadonly;
    return A;
    function asPartial() {
        return InternalRecord(A.fields, true, A.isReadonly);
    }
    function asReadonly() {
        return InternalRecord(A.fields, A.isPartial, true);
    }
}
//# sourceMappingURL=record.js.map