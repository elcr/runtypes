"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var ThreeOrString = __1.Union(__1.Literal(3), __1.String);
describe('union', function () {
    describe('match', function () {
        it('works with exhaustive cases', function () {
            var match = ThreeOrString.match(function (three) { return three + 5; }, function (str) { return str.length * 4; });
            expect(match(3)).toBe(8);
            expect(match('hello')).toBe(20);
        });
    });
    describe('discriminated union', function () {
        it('should pick correct alternative with typescript docs example', function () {
            var Square = __1.Record({ kind: __1.Literal('square'), size: __1.Number });
            var Rectangle = __1.Record({ kind: __1.Literal('rectangle'), width: __1.Number, height: __1.Number });
            var Circle = __1.Record({ kind: __1.Literal('circle'), radius: __1.Number });
            var Shape = __1.Union(Square, Rectangle, Circle);
            expect(Shape.validate({ kind: 'square', size: new Date() })).toMatchObject({
                success: false,
                key: 'size',
            });
            expect(Shape.validate({ kind: 'rectangle', size: new Date() })).toMatchObject({
                success: false,
                key: 'width',
            });
            expect(Shape.validate({ kind: 'circle', size: new Date() })).toMatchObject({
                success: false,
                key: 'radius',
            });
            expect(Shape.validate({ kind: 'other', size: new Date() })).not.toHaveProperty('key');
        });
        it('hould not pick alternative if the discriminant is not unique', function () {
            var Square = __1.Record({ kind: __1.Literal('square'), size: __1.Number });
            var Rectangle = __1.Record({ kind: __1.Literal('rectangle'), width: __1.Number, height: __1.Number });
            var CircularSquare = __1.Record({ kind: __1.Literal('square'), radius: __1.Number });
            var Shape = __1.Union(Square, Rectangle, CircularSquare);
            expect(Shape.validate({ kind: 'square', size: new Date() })).not.toHaveProperty('key');
        });
        it('should not pick alternative if not all types are records', function () {
            var Square = __1.Record({ kind: __1.Literal('square'), size: __1.Number });
            var Rectangle = __1.Record({ kind: __1.Literal('rectangle'), width: __1.Number, height: __1.Number });
            var Shape = __1.Union(Square, Rectangle, __1.InstanceOf(Date));
            expect(Shape.validate({ kind: 'square', size: new Date() })).not.toHaveProperty('key');
        });
    });
});
