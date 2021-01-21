var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { check, checked, String } from '.';
describe('Decorators', () => {
    describe('@checked', () => {
        describe('parameter length', () => {
            it('works', () => {
                expect(() => {
                    class Class {
                        static method(s) {
                            return s;
                        }
                    }
                    __decorate([
                        checked(String),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String]),
                        __metadata("design:returntype", void 0)
                    ], Class, "method", null);
                    return Class;
                }).not.toThrow();
                expect(() => {
                    class Class {
                        static method(s) {
                            return s;
                        }
                    }
                    __decorate([
                        checked(String, String),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String]),
                        __metadata("design:returntype", void 0)
                    ], Class, "method", null);
                    return Class;
                }).toThrow();
                expect(() => {
                    class Class {
                        static method(s) {
                            return s;
                        }
                    }
                    __decorate([
                        checked(),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String]),
                        __metadata("design:returntype", void 0)
                    ], Class, "method", null);
                    return Class;
                }).toThrow();
                expect(() => {
                    class Class {
                        static method(s = 'initial', t = 'initial') {
                            return { s, t };
                        }
                    }
                    __decorate([
                        checked(String, String),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, String]),
                        __metadata("design:returntype", void 0)
                    ], Class, "method", null);
                    return Class;
                }).not.toThrow();
            });
        });
        describe('parameter check', () => {
            it('works', () => {
                class Class {
                    static method1(s) {
                        return s;
                    }
                    static method2(s) {
                        return s;
                    }
                }
                __decorate([
                    checked(String),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String]),
                    __metadata("design:returntype", void 0)
                ], Class, "method1", null);
                __decorate([
                    checked(String.withConstraint(s => /^world$/.test(s))),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String]),
                    __metadata("design:returntype", void 0)
                ], Class, "method2", null);
                expect(() => {
                    Class.method1('hello');
                }).not.toThrow();
                expect(() => {
                    Class.method2('hello');
                }).toThrow(/Failed constraint check/);
                expect(() => {
                    Class.method2('world');
                }).not.toThrow();
            });
        });
    });
    describe('@check', () => {
        describe('parameter length', () => {
            it('works', () => {
                expect(() => {
                    class Class {
                        static method(s) {
                            return s;
                        }
                    }
                    __decorate([
                        checked(String),
                        __param(0, check),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String]),
                        __metadata("design:returntype", void 0)
                    ], Class, "method", null);
                    return Class;
                }).not.toThrow();
                expect(() => {
                    class Class {
                        static method(s, t) {
                            return { s, t };
                        }
                    }
                    __decorate([
                        checked(String, String),
                        __param(0, check),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, String]),
                        __metadata("design:returntype", void 0)
                    ], Class, "method", null);
                    return Class;
                }).toThrow();
                expect(() => {
                    class Class {
                        static method(s, t) {
                            return { s, t };
                        }
                    }
                    __decorate([
                        checked(String),
                        __param(0, check),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [String, String]),
                        __metadata("design:returntype", void 0)
                    ], Class, "method", null);
                    return Class;
                }).not.toThrow();
            });
        });
        describe('parameter check', () => {
            it('works', () => {
                class Class {
                    static method1(s) {
                        return s;
                    }
                    static method2(s, t) {
                        return { s, t };
                    }
                }
                __decorate([
                    checked(String),
                    __param(0, check),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String]),
                    __metadata("design:returntype", void 0)
                ], Class, "method1", null);
                __decorate([
                    checked(String.withConstraint(s => /^world$/.test(s))),
                    __param(1, check),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String, String]),
                    __metadata("design:returntype", void 0)
                ], Class, "method2", null);
                expect(() => {
                    Class.method1('hello');
                }).not.toThrow();
                expect(() => {
                    Class.method2('world', 'hello');
                }).toThrow(/Failed constraint check/);
                expect(() => {
                    Class.method2('hello', 'world');
                }).not.toThrow();
            });
        });
    });
    describe('return value', () => {
        it('works', () => {
            class Class {
                static method1(s) {
                    return s;
                }
                static method2(s, t) {
                    return { s, t };
                }
            }
            __decorate([
                checked(String),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], Class, "method1", null);
            __decorate([
                checked(String.withConstraint(s => /^world$/.test(s))),
                __param(1, check),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, String]),
                __metadata("design:returntype", void 0)
            ], Class, "method2", null);
            expect(Class.method1('hello')).toBe('hello');
            expect(Class.method2('hello', 'world')).toEqual({ s: 'hello', t: 'world' });
        });
    });
});
//# sourceMappingURL=decorator.spec.js.map