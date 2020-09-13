import { ValidationError } from './errors';
export function AsyncContract(...runtypes) {
    const lastIndex = runtypes.length - 1;
    const argTypes = runtypes.slice(0, lastIndex);
    const returnType = runtypes[lastIndex];
    return {
        enforce: (f) => (...args) => {
            if (args.length < argTypes.length)
                throw new ValidationError(`Expected ${argTypes.length} arguments but only received ${args.length}`);
            for (let i = 0; i < argTypes.length; i++)
                argTypes[i].check(args[i]);
            const returnedPromise = f(...args);
            if (!(returnedPromise instanceof Promise))
                throw new ValidationError(`Expected function to return a promise, but instead got ${returnedPromise}`);
            return returnedPromise.then(returnType.check);
        },
    };
}
//# sourceMappingURL=asynccontract.js.map