import { create } from '../runtype';
const RuntypeName = Symbol('RuntypeName');
export function Brand(brand, entity) {
    return create(value => {
        const validated = entity.validate(value);
        return validated.success
            ? { success: true, value: validated.value }
            : validated;
    }, {
        tag: 'brand',
        brand,
        entity,
    });
}
//# sourceMappingURL=brand.js.map