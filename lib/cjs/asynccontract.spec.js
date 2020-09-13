"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require(".");
var errors_1 = require("./errors");
describe('AsyncContract', function () {
    describe('when function does not return a promise', function () {
        it('throws a validation error', function () {
            var contractedFunction = _1.AsyncContract(_1.Number).enforce(function () { return 7; });
            expect(contractedFunction).toThrow(errors_1.ValidationError);
        });
    });
    describe('when a function does return a promise, but for the wrong type', function () {
        it('throws a validation error asynchronously', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var contractedFunction, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractedFunction = _1.AsyncContract(_1.Number).enforce(function () { return Promise.resolve('hi'); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, contractedFunction()];
                    case 2:
                        _a.sent();
                        fail();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1).toBeInstanceOf(errors_1.ValidationError);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when a function does return a promise', function () {
        it('should validate successfully', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var contractedFunction;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractedFunction = _1.AsyncContract(_1.Number).enforce(function () { return Promise.resolve(7); });
                        return [4 /*yield*/, expect(contractedFunction()).resolves.toBe(7)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when not enough arguments are provided', function () {
        it('throws a validation error', function () {
            var contractedFunction = _1.AsyncContract(_1.Number, _1.Number).enforce(function (n) { return Promise.resolve(n + 1); });
            expect(contractedFunction).toThrow(errors_1.ValidationError);
        });
    });
});
//# sourceMappingURL=asynccontract.spec.js.map