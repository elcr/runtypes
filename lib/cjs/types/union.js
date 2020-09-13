"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var runtype_1 = require("../runtype");
var show_1 = tslib_1.__importDefault(require("../show"));
var util_1 = require("../util");
function Union() {
    var alternatives = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        alternatives[_i] = arguments[_i];
    }
    var match = function () {
        var cases = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cases[_i] = arguments[_i];
        }
        return function (x) {
            for (var i = 0; i < alternatives.length; i++) {
                if (alternatives[i].guard(x)) {
                    return cases[i](x);
                }
            }
        };
    };
    return runtype_1.create(function (value, visited) {
        var e_1, _a, e_2, _b, e_3, _c;
        var commonLiteralFields = {};
        try {
            for (var alternatives_1 = tslib_1.__values(alternatives), alternatives_1_1 = alternatives_1.next(); !alternatives_1_1.done; alternatives_1_1 = alternatives_1.next()) {
                var alternative = alternatives_1_1.value;
                if (alternative.reflect.tag === 'record') {
                    var _loop_1 = function (fieldName) {
                        var field = alternative.reflect.fields[fieldName];
                        if (field.tag === 'literal') {
                            if (commonLiteralFields[fieldName]) {
                                if (commonLiteralFields[fieldName].every(function (value) { return value !== field.value; })) {
                                    commonLiteralFields[fieldName].push(field.value);
                                }
                            }
                            else {
                                commonLiteralFields[fieldName] = [field.value];
                            }
                        }
                    };
                    for (var fieldName in alternative.reflect.fields) {
                        _loop_1(fieldName);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (alternatives_1_1 && !alternatives_1_1.done && (_a = alternatives_1.return)) _a.call(alternatives_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        for (var fieldName in commonLiteralFields) {
            if (commonLiteralFields[fieldName].length === alternatives.length) {
                try {
                    for (var alternatives_2 = (e_2 = void 0, tslib_1.__values(alternatives)), alternatives_2_1 = alternatives_2.next(); !alternatives_2_1.done; alternatives_2_1 = alternatives_2.next()) {
                        var alternative = alternatives_2_1.value;
                        if (alternative.reflect.tag === 'record') {
                            var field = alternative.reflect.fields[fieldName];
                            if (field.tag === 'literal' &&
                                util_1.hasKey(fieldName, value) &&
                                value[fieldName] === field.value) {
                                return runtype_1.innerValidate(alternative, value, visited);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (alternatives_2_1 && !alternatives_2_1.done && (_b = alternatives_2.return)) _b.call(alternatives_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        try {
            for (var alternatives_3 = tslib_1.__values(alternatives), alternatives_3_1 = alternatives_3.next(); !alternatives_3_1.done; alternatives_3_1 = alternatives_3.next()) {
                var targetType = alternatives_3_1.value;
                if (runtype_1.innerValidate(targetType, value, visited).success) {
                    return { success: true, value: value };
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (alternatives_3_1 && !alternatives_3_1.done && (_c = alternatives_3.return)) _c.call(alternatives_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var a = runtype_1.create(value, { tag: 'union', alternatives: alternatives });
        return {
            success: false,
            message: "Expected " + show_1.default(a) + ", but was " + (value === null ? value : typeof value),
        };
    }, { tag: 'union', alternatives: alternatives, match: match });
}
exports.Union = Union;
//# sourceMappingURL=union.js.map