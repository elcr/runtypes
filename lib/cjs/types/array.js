"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var runtype_1 = require("../runtype");
/**
 * Construct an array runtype from a runtype for its elements.
 */
function InternalArr(element, isReadonly) {
    return withExtraModifierFuncs(runtype_1.create(function (xs, visited) {
        var e_1, _a;
        if (!Array.isArray(xs)) {
            return {
                success: false,
                message: "Expected array, but was " + (xs === null ? xs : typeof xs),
            };
        }
        try {
            for (var xs_1 = tslib_1.__values(xs), xs_1_1 = xs_1.next(); !xs_1_1.done; xs_1_1 = xs_1.next()) {
                var x = xs_1_1.value;
                var validated = runtype_1.innerValidate(element, x, visited);
                if (!validated.success) {
                    return {
                        success: false,
                        message: validated.message,
                        key: validated.key ? "[" + xs.indexOf(x) + "]." + validated.key : "[" + xs.indexOf(x) + "]",
                    };
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (xs_1_1 && !xs_1_1.done && (_a = xs_1.return)) _a.call(xs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { success: true, value: xs };
    }, { tag: 'array', isReadonly: isReadonly, element: element }));
}
function Arr(element) {
    return InternalArr(element, false);
}
exports.Array = Arr;
function withExtraModifierFuncs(A) {
    A.asReadonly = asReadonly;
    return A;
    function asReadonly() {
        return InternalArr(A.element, true);
    }
}
//# sourceMappingURL=array.js.map