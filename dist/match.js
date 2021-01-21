export function match(...cases) {
    return x => {
        for (const [T, f] of cases)
            if (T.guard(x))
                return f(x);
        throw new Error('No alternatives were matched');
    };
}
//# sourceMappingURL=match.js.map