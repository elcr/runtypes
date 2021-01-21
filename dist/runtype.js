import { Union, Intersect, Constraint, Brand, } from './index.js';
import show from './show.js';
import { ValidationError } from './errors.js';
export function create(validate, A) {
    A.check = check;
    A.assert = check;
    A._innerValidate = (value, visited) => {
        if (visited.has(value, A))
            return { success: true, value };
        return validate(value, visited);
    };
    A.validate = (value) => A._innerValidate(value, VisitedState());
    A.guard = guard;
    A.Or = Or;
    A.And = And;
    A.withConstraint = withConstraint;
    A.withGuard = withGuard;
    A.withBrand = withBrand;
    A.reflect = A;
    A.toString = () => `Runtype<${show(A)}>`;
    return A;
    function check(x) {
        const validated = A.validate(x);
        if (validated.success) {
            return validated.value;
        }
        throw new ValidationError(validated.message, validated.key);
    }
    function guard(x) {
        return A.validate(x).success;
    }
    function Or(B) {
        return Union(A, B);
    }
    function And(B) {
        return Intersect(A, B);
    }
    function withConstraint(constraint, options) {
        return Constraint(A, constraint, options);
    }
    function withGuard(guard, options) {
        return Constraint(A, guard, options);
    }
    function withBrand(B) {
        return Brand(B, A);
    }
}
export function innerValidate(targetType, value, visited) {
    return targetType._innerValidate(value, visited);
}
function VisitedState() {
    const members = new WeakMap();
    const add = (candidate, type) => {
        if (candidate === null || !(typeof candidate === 'object'))
            return;
        const typeSet = members.get(candidate);
        members.set(candidate, typeSet ? typeSet.set(type, true) : new WeakMap().set(type, true));
    };
    const has = (candidate, type) => {
        const typeSet = members.get(candidate);
        const value = (typeSet && typeSet.get(type)) || false;
        add(candidate, type);
        return value;
    };
    return { has };
}
//# sourceMappingURL=runtype.js.map