import { Runtype, Static } from '../runtype.js';
declare const RuntypeName: unique symbol;
export interface Brand<B extends string, A extends Runtype> extends Runtype<Static<A> & {
    [RuntypeName]: {
        [K in B]: never;
    };
}> {
    tag: 'brand';
    brand: B;
    entity: A;
}
export declare function Brand<B extends string, A extends Runtype>(brand: B, entity: A): Brand<B, A>;
export {};
