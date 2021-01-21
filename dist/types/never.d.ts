import { Runtype } from '../runtype.js';
export interface Never extends Runtype<never> {
    tag: 'never';
}
/**
 * Validates nothing (unknown fails).
 */
export declare const Never: Never;
