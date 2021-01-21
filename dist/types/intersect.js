import { create, innerValidate } from '../runtype.js';
export function Intersect(...intersectees) {
    return create((value, visited) => {
        for (const targetType of intersectees) {
            let validated = innerValidate(targetType, value, visited);
            if (!validated.success) {
                return validated;
            }
        }
        return { success: true, value };
    }, { tag: 'intersect', intersectees });
}
//# sourceMappingURL=intersect.js.map