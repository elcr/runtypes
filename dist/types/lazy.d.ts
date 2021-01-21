import { Runtype } from '../runtype.js';
/**
 * Construct a possibly-recursive Runtype.
 */
export declare function Lazy<A extends Runtype>(delayed: () => A): A;
