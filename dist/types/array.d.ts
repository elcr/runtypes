import { Runtype, Static } from '../runtype.js';
declare type ArrayStaticType<E extends Runtype, RO extends boolean> = RO extends true ? ReadonlyArray<Static<E>> : Static<E>[];
interface Arr<E extends Runtype, RO extends boolean> extends Runtype<ArrayStaticType<E, RO>> {
    tag: 'array';
    element: E;
    isReadonly: RO;
    asReadonly(): Arr<E, true>;
}
declare function Arr<E extends Runtype, RO extends boolean>(element: E): Arr<E, false>;
export { Arr as Array };
