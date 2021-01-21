import { create, innerValidate } from '../runtype.js';
import { Array as Arr } from './array.js';
import { Unknown } from './unknown.js';
export function Tuple(...components) {
    return create((x, visited) => {
        const validated = innerValidate(Arr(Unknown), x, visited);
        if (!validated.success) {
            return {
                success: false,
                message: `Expected tuple to be an array: ${validated.message}`,
                key: validated.key,
            };
        }
        if (validated.value.length !== components.length) {
            return {
                success: false,
                message: `Expected an array of length ${components.length}, but was ${validated.value.length}`,
            };
        }
        for (let i = 0; i < components.length; i++) {
            let validatedComponent = innerValidate(components[i], validated.value[i], visited);
            if (!validatedComponent.success) {
                return {
                    success: false,
                    message: validatedComponent.message,
                    key: validatedComponent.key ? `[${i}].${validatedComponent.key}` : `[${i}]`,
                };
            }
        }
        return { success: true, value: x };
    }, { tag: 'tuple', components });
}
//# sourceMappingURL=tuple.js.map