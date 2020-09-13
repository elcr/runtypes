"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function match() {
    var cases = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        cases[_i] = arguments[_i];
    }
    return function (x) {
        var e_1, _a;
        try {
            for (var cases_1 = tslib_1.__values(cases), cases_1_1 = cases_1.next(); !cases_1_1.done; cases_1_1 = cases_1.next()) {
                var _b = tslib_1.__read(cases_1_1.value, 2), T = _b[0], f = _b[1];
                if (T.guard(x))
                    return f(x);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cases_1_1 && !cases_1_1.done && (_a = cases_1.return)) _a.call(cases_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new Error('No alternatives were matched');
    };
}
exports.match = match;
//# sourceMappingURL=match.js.map