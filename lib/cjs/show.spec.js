"use strict";
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require(".");
var show_1 = tslib_1.__importDefault(require("./show"));
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    return TestClass;
}());
var cases = [
    [_1.Unknown, 'unknown'],
    [_1.Never, 'never'],
    [_1.Undefined, 'undefined'],
    [_1.Null, 'null'],
    [_1.Void, 'unknown'],
    [_1.Boolean, 'boolean'],
    [_1.Number, 'number'],
    [_1.String, 'string'],
    [_1.Symbol, 'symbol'],
    [_1.Literal(true), 'true'],
    [_1.Literal(3), '3'],
    [_1.Literal('foo'), '"foo"'],
    [_1.Array(_1.String), 'string[]'],
    [_1.Array(_1.String).asReadonly(), 'readonly string[]'],
    [_1.Dictionary(_1.Array(_1.Boolean)), '{ [_: string]: boolean[] }'],
    [_1.Dictionary(_1.Array(_1.Boolean), 'string'), '{ [_: string]: boolean[] }'],
    [_1.Dictionary(_1.Array(_1.Boolean), 'number'), '{ [_: number]: boolean[] }'],
    [_1.Record({}), '{}'],
    [_1.Record({}).asReadonly(), '{}'],
    [_1.Partial({}), '{}'],
    [_1.InstanceOf(TestClass), 'InstanceOf<TestClass>'],
    [_1.Array(_1.InstanceOf(TestClass)), 'InstanceOf<TestClass>[]'],
    [_1.Record({ x: _1.String, y: _1.Array(_1.Boolean) }), '{ x: string; y: boolean[]; }'],
    [_1.Record({ x: _1.String, y: _1.Array(_1.Boolean) }), '{ x: string; y: boolean[]; }'],
    [_1.Record({ x: _1.Number }).And(_1.Partial({ y: _1.Number })), '{ x: number; } & { y?: number; }'],
    [
        _1.Record({ x: _1.String, y: _1.Array(_1.Boolean) }).asReadonly(),
        '{ readonly x: string; readonly y: boolean[]; }',
    ],
    [_1.Record({ x: _1.String, y: _1.Array(_1.Boolean).asReadonly() }), '{ x: string; y: readonly boolean[]; }'],
    [
        _1.Record({ x: _1.String, y: _1.Array(_1.Boolean).asReadonly() }).asReadonly(),
        '{ readonly x: string; readonly y: readonly boolean[]; }',
    ],
    [_1.Partial({ x: _1.String, y: _1.Array(_1.Boolean) }), '{ x?: string; y?: boolean[]; }'],
    [_1.Record({ x: _1.String, y: _1.Array(_1.Boolean) }).asPartial(), '{ x?: string; y?: boolean[]; }'],
    [_1.Tuple(_1.Boolean, _1.Number), '[boolean, number]'],
    [_1.Union(_1.Boolean, _1.Number), 'boolean | number'],
    [_1.Intersect(_1.Boolean, _1.Number), 'boolean & number'],
    [_1.Function, 'function'],
    [_1.Lazy(function () { return _1.Boolean; }), 'boolean'],
    [_1.Number.withConstraint(function (x) { return x > 3; }), 'number'],
    [_1.Number.withBrand('someNumber'), 'number'],
    [_1.Number.withBrand('someNumber').withConstraint(function (x) { return x > 3; }), 'number'],
    // Parenthesization
    [_1.Boolean.And(_1.Number.Or(_1.String)), 'boolean & (number | string)'],
    [_1.Boolean.Or(_1.Number.And(_1.String)), 'boolean | (number & string)'],
    [_1.Boolean.Or(_1.Record({ x: _1.String, y: _1.Number })), 'boolean | { x: string; y: number; }'],
];
var _loop_1 = function (T, expected) {
    var s = show_1.default(T);
    it(s, function () {
        expect(s).toBe(expected);
        expect(T.toString()).toBe("Runtype<" + s + ">");
    });
};
try {
    for (var cases_1 = tslib_1.__values(cases), cases_1_1 = cases_1.next(); !cases_1_1.done; cases_1_1 = cases_1.next()) {
        var _b = tslib_1.__read(cases_1_1.value, 2), T = _b[0], expected = _b[1];
        _loop_1(T, expected);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (cases_1_1 && !cases_1_1.done && (_a = cases_1.return)) _a.call(cases_1);
    }
    finally { if (e_1) throw e_1.error; }
}
//# sourceMappingURL=show.spec.js.map