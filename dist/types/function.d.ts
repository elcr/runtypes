import { Runtype } from '../runtype.js';
export interface Function extends Runtype<(...args: any[]) => any> {
    tag: 'function';
}
/**
 * Construct a runtype for functions.
 */
export declare const Function: Function;
