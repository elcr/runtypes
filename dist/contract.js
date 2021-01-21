import { ValidationError } from './errors';
export function Contract(...runtypes) {
    const lastIndex = runtypes.length - 1;
    const argTypes = runtypes.slice(0, lastIndex);
    const returnType = runtypes[lastIndex];
    return {
        enforce: (f) => (...args) => {
            if (args.length < argTypes.length)
                throw new ValidationError(`Expected ${argTypes.length} arguments but only received ${args.length}`);
            for (let i = 0; i < argTypes.length; i++)
                argTypes[i].check(args[i]);
            return returnType.check(f(...args));
        },
    };
}
//# sourceMappingURL=contract.js.map