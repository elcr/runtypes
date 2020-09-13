// Type guard to determine if an object has a given key
// If this feature gets implemented, we can use `in` instead: https://github.com/Microsoft/TypeScript/issues/10485
export function hasKey(k, o) {
    return typeof o === 'object' && k in o;
}
//# sourceMappingURL=util.js.map