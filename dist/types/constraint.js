import { create } from '../runtype';
import { String } from './string';
import { Unknown } from './unknown';
export function Constraint(underlying, constraint, options) {
    return create(value => {
        const name = options && options.name;
        const validated = underlying.validate(value);
        if (!validated.success) {
            return validated;
        }
        const result = constraint(validated.value);
        if (String.guard(result))
            return { success: false, message: result };
        else if (!result)
            return { success: false, message: `Failed ${name || 'constraint'} check` };
        return { success: true, value: validated.value };
    }, {
        tag: 'constraint',
        underlying,
        constraint,
        name: options && options.name,
        args: options && options.args,
    });
}
export const Guard = (guard, options) => Unknown.withGuard(guard, options);
//# sourceMappingURL=constraint.js.map