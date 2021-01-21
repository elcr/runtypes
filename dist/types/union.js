import { create, innerValidate } from '../runtype';
import show from '../show';
import { hasKey } from '../util';
export function Union(...alternatives) {
    const match = (...cases) => (x) => {
        for (let i = 0; i < alternatives.length; i++) {
            if (alternatives[i].guard(x)) {
                return cases[i](x);
            }
        }
    };
    return create((value, visited) => {
        const commonLiteralFields = {};
        for (const alternative of alternatives) {
            if (alternative.reflect.tag === 'record') {
                for (const fieldName in alternative.reflect.fields) {
                    const field = alternative.reflect.fields[fieldName];
                    if (field.tag === 'literal') {
                        if (commonLiteralFields[fieldName]) {
                            if (commonLiteralFields[fieldName].every(value => value !== field.value)) {
                                commonLiteralFields[fieldName].push(field.value);
                            }
                        }
                        else {
                            commonLiteralFields[fieldName] = [field.value];
                        }
                    }
                }
            }
        }
        for (const fieldName in commonLiteralFields) {
            if (commonLiteralFields[fieldName].length === alternatives.length) {
                for (const alternative of alternatives) {
                    if (alternative.reflect.tag === 'record') {
                        const field = alternative.reflect.fields[fieldName];
                        if (field.tag === 'literal' &&
                            hasKey(fieldName, value) &&
                            value[fieldName] === field.value) {
                            return innerValidate(alternative, value, visited);
                        }
                    }
                }
            }
        }
        for (const targetType of alternatives) {
            if (innerValidate(targetType, value, visited).success) {
                return { success: true, value };
            }
        }
        const a = create(value, { tag: 'union', alternatives });
        return {
            success: false,
            message: `Expected ${show(a)}, but was ${value === null ? value : typeof value}`,
        };
    }, { tag: 'union', alternatives, match });
}
//# sourceMappingURL=union.js.map