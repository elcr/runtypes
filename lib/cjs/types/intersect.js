"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var runtype_1 = require("../runtype");
function Intersect() {
    var intersectees = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        intersectees[_i] = arguments[_i];
    }
    return runtype_1.create(function (value, visited) {
        var e_1, _a;
        try {
            for (var intersectees_1 = tslib_1.__values(intersectees), intersectees_1_1 = intersectees_1.next(); !intersectees_1_1.done; intersectees_1_1 = intersectees_1.next()) {
                var targetType = intersectees_1_1.value;
                var validated = runtype_1.innerValidate(targetType, value, visited);
                if (!validated.success) {
                    return validated;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (intersectees_1_1 && !intersectees_1_1.done && (_a = intersectees_1.return)) _a.call(intersectees_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { success: true, value: value };
    }, { tag: 'intersect', intersectees: intersectees });
}
exports.Intersect = Intersect;
//# sourceMappingURL=intersect.js.map