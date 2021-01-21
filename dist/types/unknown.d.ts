import { Runtype } from '../runtype.js';
export interface Unknown extends Runtype {
    tag: 'unknown';
}
/**
 * Validates anything, but provides no new type information about it.
 */
export declare const Unknown: Unknown;
