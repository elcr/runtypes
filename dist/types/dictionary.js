import { create, innerValidate } from '../runtype.js';
import show from '../show.js';
export function Dictionary(value, key = 'string') {
    return create((x, visited) => {
        if (x === null || x === undefined) {
            const a = create(x, { tag: 'dictionary', key, value });
            return { success: false, message: `Expected ${show(a)}, but was ${x}` };
        }
        if (typeof x !== 'object') {
            const a = create(x, { tag: 'dictionary', key, value });
            return { success: false, message: `Expected ${show(a.reflect)}, but was ${typeof x}` };
        }
        if (Object.getPrototypeOf(x) !== Object.prototype) {
            if (!Array.isArray(x)) {
                const a = create(x, { tag: 'dictionary', key, value });
                return {
                    success: false,
                    message: `Expected ${show(a.reflect)}, but was ${Object.getPrototypeOf(x)}`,
                };
            }
            else if (key === 'string')
                return { success: false, message: 'Expected dictionary, but was array' };
        }
        for (const k in x) {
            // Object keys are unknown strings
            if (key === 'number') {
                if (isNaN(+k))
                    return {
                        success: false,
                        message: 'Expected dictionary key to be a number, but was string',
                    };
            }
            let validated = innerValidate(value, x[k], visited);
            if (!validated.success) {
                return {
                    success: false,
                    message: validated.message,
                    key: validated.key ? `${k}.${validated.key}` : k,
                };
            }
        }
        return { success: true, value: x };
    }, { tag: 'dictionary', key, value });
}
//# sourceMappingURL=dictionary.js.map