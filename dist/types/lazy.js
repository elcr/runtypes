import { create } from '../runtype.js';
/**
 * Construct a possibly-recursive Runtype.
 */
export function Lazy(delayed) {
    const data = {
        get tag() {
            return getWrapped()['tag'];
        },
    };
    let cached;
    function getWrapped() {
        if (!cached) {
            cached = delayed();
            for (const k in cached)
                if (k !== 'tag')
                    data[k] = cached[k];
        }
        return cached;
    }
    return create(x => {
        return getWrapped().validate(x);
    }, data);
}
//# sourceMappingURL=lazy.js.map