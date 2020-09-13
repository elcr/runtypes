"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require(".");
describe('Decorators', function () {
    describe('@checked', function () {
        describe('parameter length', function () {
            it('works', function () {
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        tslib_1.__decorate([
                            _1.checked(_1.String),
                            tslib_1.__metadata("design:type", Function),
                            tslib_1.__metadata("design:paramtypes", [String]),
                            tslib_1.__metadata("design:returntype", void 0)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        tslib_1.__decorate([
                            _1.checked(_1.String, _1.String),
                            tslib_1.__metadata("design:type", Function),
                            tslib_1.__metadata("design:paramtypes", [String]),
                            tslib_1.__metadata("design:returntype", void 0)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        tslib_1.__decorate([
                            _1.checked(),
                            tslib_1.__metadata("design:type", Function),
                            tslib_1.__metadata("design:paramtypes", [String]),
                            tslib_1.__metadata("design:returntype", void 0)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s, t) {
                            if (s === void 0) { s = 'initial'; }
                            if (t === void 0) { t = 'initial'; }
                            return { s: s, t: t };
                        };
                        tslib_1.__decorate([
                            _1.checked(_1.String, _1.String),
                            tslib_1.__metadata("design:type", Function),
                            tslib_1.__metadata("design:paramtypes", [String, String]),
                            tslib_1.__metadata("design:returntype", void 0)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
            });
        });
        describe('parameter check', function () {
            it('works', function () {
                var Class = /** @class */ (function () {
                    function Class() {
                    }
                    Class.method1 = function (s) {
                        return s;
                    };
                    Class.method2 = function (s) {
                        return s;
                    };
                    tslib_1.__decorate([
                        _1.checked(_1.String),
                        tslib_1.__metadata("design:type", Function),
                        tslib_1.__metadata("design:paramtypes", [String]),
                        tslib_1.__metadata("design:returntype", void 0)
                    ], Class, "method1", null);
                    tslib_1.__decorate([
                        _1.checked(_1.String.withConstraint(function (s) { return /^world$/.test(s); })),
                        tslib_1.__metadata("design:type", Function),
                        tslib_1.__metadata("design:paramtypes", [String]),
                        tslib_1.__metadata("design:returntype", void 0)
                    ], Class, "method2", null);
                    return Class;
                }());
                expect(function () {
                    Class.method1('hello');
                }).not.toThrow();
                expect(function () {
                    Class.method2('hello');
                }).toThrow(/Failed constraint check/);
                expect(function () {
                    Class.method2('world');
                }).not.toThrow();
            });
        });
    });
    describe('@check', function () {
        describe('parameter length', function () {
            it('works', function () {
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s) {
                            return s;
                        };
                        tslib_1.__decorate([
                            _1.checked(_1.String),
                            tslib_1.__param(0, _1.check),
                            tslib_1.__metadata("design:type", Function),
                            tslib_1.__metadata("design:paramtypes", [String]),
                            tslib_1.__metadata("design:returntype", void 0)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s, t) {
                            return { s: s, t: t };
                        };
                        tslib_1.__decorate([
                            _1.checked(_1.String, _1.String),
                            tslib_1.__param(0, _1.check),
                            tslib_1.__metadata("design:type", Function),
                            tslib_1.__metadata("design:paramtypes", [String, String]),
                            tslib_1.__metadata("design:returntype", void 0)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).toThrow();
                expect(function () {
                    var Class = /** @class */ (function () {
                        function Class() {
                        }
                        Class.method = function (s, t) {
                            return { s: s, t: t };
                        };
                        tslib_1.__decorate([
                            _1.checked(_1.String),
                            tslib_1.__param(0, _1.check),
                            tslib_1.__metadata("design:type", Function),
                            tslib_1.__metadata("design:paramtypes", [String, String]),
                            tslib_1.__metadata("design:returntype", void 0)
                        ], Class, "method", null);
                        return Class;
                    }());
                    return Class;
                }).not.toThrow();
            });
        });
        describe('parameter check', function () {
            it('works', function () {
                var Class = /** @class */ (function () {
                    function Class() {
                    }
                    Class.method1 = function (s) {
                        return s;
                    };
                    Class.method2 = function (s, t) {
                        return { s: s, t: t };
                    };
                    tslib_1.__decorate([
                        _1.checked(_1.String),
                        tslib_1.__param(0, _1.check),
                        tslib_1.__metadata("design:type", Function),
                        tslib_1.__metadata("design:paramtypes", [String]),
                        tslib_1.__metadata("design:returntype", void 0)
                    ], Class, "method1", null);
                    tslib_1.__decorate([
                        _1.checked(_1.String.withConstraint(function (s) { return /^world$/.test(s); })),
                        tslib_1.__param(1, _1.check),
                        tslib_1.__metadata("design:type", Function),
                        tslib_1.__metadata("design:paramtypes", [String, String]),
                        tslib_1.__metadata("design:returntype", void 0)
                    ], Class, "method2", null);
                    return Class;
                }());
                expect(function () {
                    Class.method1('hello');
                }).not.toThrow();
                expect(function () {
                    Class.method2('world', 'hello');
                }).toThrow(/Failed constraint check/);
                expect(function () {
                    Class.method2('hello', 'world');
                }).not.toThrow();
            });
        });
    });
    describe('return value', function () {
        it('works', function () {
            var Class = /** @class */ (function () {
                function Class() {
                }
                Class.method1 = function (s) {
                    return s;
                };
                Class.method2 = function (s, t) {
                    return { s: s, t: t };
                };
                tslib_1.__decorate([
                    _1.checked(_1.String),
                    tslib_1.__metadata("design:type", Function),
                    tslib_1.__metadata("design:paramtypes", [String]),
                    tslib_1.__metadata("design:returntype", void 0)
                ], Class, "method1", null);
                tslib_1.__decorate([
                    _1.checked(_1.String.withConstraint(function (s) { return /^world$/.test(s); })),
                    tslib_1.__param(1, _1.check),
                    tslib_1.__metadata("design:type", Function),
                    tslib_1.__metadata("design:paramtypes", [String, String]),
                    tslib_1.__metadata("design:returntype", void 0)
                ], Class, "method2", null);
                return Class;
            }());
            expect(Class.method1('hello')).toBe('hello');
            expect(Class.method2('hello', 'world')).toEqual({ s: 'hello', t: 'world' });
        });
    });
});
//# sourceMappingURL=decorator.spec.js.map