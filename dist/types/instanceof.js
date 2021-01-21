import { create } from '../runtype.js';
export function InstanceOf(ctor) {
    return create(value => value instanceof ctor
        ? { success: true, value }
        : {
            success: false,
            message: `Expected ${ctor.name}, but was ${value === null ? value : typeof value}`,
        }, { tag: 'instanceof', ctor: ctor });
}
//# sourceMappingURL=instanceof.js.map