import { __awaiter } from "tslib";
import { AsyncContract, Number } from '.';
import { ValidationError } from './errors';
describe('AsyncContract', () => {
    describe('when function does not return a promise', () => {
        it('throws a validation error', () => {
            const contractedFunction = AsyncContract(Number).enforce(() => 7);
            expect(contractedFunction).toThrow(ValidationError);
        });
    });
    describe('when a function does return a promise, but for the wrong type', () => {
        it('throws a validation error asynchronously', () => __awaiter(void 0, void 0, void 0, function* () {
            const contractedFunction = AsyncContract(Number).enforce(() => Promise.resolve('hi'));
            try {
                yield contractedFunction();
                fail();
            }
            catch (e) {
                expect(e).toBeInstanceOf(ValidationError);
            }
        }));
    });
    describe('when a function does return a promise', () => {
        it('should validate successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const contractedFunction = AsyncContract(Number).enforce(() => Promise.resolve(7));
            yield expect(contractedFunction()).resolves.toBe(7);
        }));
    });
    describe('when not enough arguments are provided', () => {
        it('throws a validation error', () => {
            const contractedFunction = AsyncContract(Number, Number).enforce(n => Promise.resolve(n + 1));
            expect(contractedFunction).toThrow(ValidationError);
        });
    });
});
//# sourceMappingURL=asynccontract.spec.js.map