import { Unknown, Never, Undefined, Null, Void, Boolean, Number, String, Symbol as Sym, Literal, Array, Dictionary, Record, Partial as RTPartial, Tuple, Union, Intersect, Function, Lazy, Contract, InstanceOf, Guard, } from './index';
import { ValidationError } from './errors';
const boolTuple = Tuple(Boolean, Boolean, Boolean);
const record1 = Record({ Boolean, Number });
const union1 = Union(Literal(3), String, boolTuple, record1);
const Person = Lazy(() => Record({ name: String, likes: Array(Person) }));
const narcissist = { name: 'Narcissus', likes: [] };
narcissist.likes = [narcissist];
const GraphNode = Lazy(() => Array(GraphNode));
const Graph = Array(GraphNode);
const nodeA = [];
const nodeB = [nodeA];
nodeA.push(nodeB);
const barbell = [nodeA, nodeB];
const BarbellBall = Lazy(() => Tuple(BarbellBall));
const SRDict = Lazy(() => Dictionary(SRDict));
const srDict = {};
srDict['self'] = srDict;
const Hand = Lazy(() => Union(Record({ left: Hand }), Record({ right: Hand })));
const leftHand = { left: null };
const rightHand = { right: leftHand };
leftHand.left = rightHand;
const Ambi = Lazy(() => Intersect(Record({ left: Ambi }), Record({ right: Ambi })));
const ambi = { left: null, right: null };
ambi.left = ambi;
ambi.right = ambi;
const PartialPerson = Lazy(() => RTPartial({ firstName: String, likes: PartialPerson }).And(Guard((p) => p.firstName && typeof p.firstName === 'string')));
const partialNarcissus = { firstName: 'Narcissish' };
partialNarcissus.likes = partialNarcissus;
class SomeClass {
    constructor(n) {
        this.n = n;
    }
}
class SomeOtherClass {
    constructor(n) {
        this.n = n;
    }
}
const SOMECLASS_TAG = 'I am a SomeClass instance (any version)';
class SomeClassV1 {
    constructor(n) {
        this.n = n;
        this._someClassTag = SOMECLASS_TAG;
    }
}
SomeClassV1.isSomeClass = (o) => o !== null && typeof o === 'object' && o._someClassTag === SOMECLASS_TAG;
class SomeClassV2 {
    constructor(n) {
        this.n = n;
        this._someClassTag = SOMECLASS_TAG;
    }
}
SomeClassV2.isSomeClass = (o) => o !== null && typeof o === 'object' && o._someClassTag === SOMECLASS_TAG;
const runtypes = {
    Unknown,
    Never,
    Undefined,
    Null,
    Empty: Record({}),
    Void,
    Boolean,
    true: Literal(true),
    false: Literal(false),
    Number,
    3: Literal(3),
    42: Literal(42),
    brandedNumber: Number.withBrand('number'),
    String,
    'hello world': Literal('hello world'),
    Sym,
    symbolArray: Array(Sym),
    boolArray: Array(Boolean),
    boolTuple,
    record1,
    union1,
    Partial: RTPartial({ foo: String }).And(Record({ Boolean })),
    Function,
    Person,
    MoreThanThree: Number.withConstraint(n => n > 3),
    MoreThanThreeWithMessage: Number.withConstraint(n => n > 3 || `${n} is not greater than 3`),
    ArrayString: Array(String),
    ArrayNumber: Array(Number),
    ArrayPerson: Array(Person),
    CustomArray: Array(Number).withConstraint(x => x.length > 3, { args: { tag: 'length', min: 3 } }),
    CustomArrayWithMessage: Array(Number).withConstraint(x => x.length > 3 || `Length array is not greater 3`, { args: { tag: 'length', min: 3 } }),
    Dictionary: Dictionary(String),
    NumberDictionary: Dictionary(String, 'number'),
    DictionaryOfArrays: Dictionary(Array(Boolean)),
    InstanceOfSomeClass: InstanceOf(SomeClass),
    InstanceOfSomeOtherClass: InstanceOf(SomeOtherClass),
    CustomGuardConstraint: Unknown.withGuard(SomeClassV2.isSomeClass),
    CustomGuardType: Guard(SomeClassV2.isSomeClass),
    ChangeType: Unknown.withConstraint(SomeClassV2.isSomeClass),
    ChangeTypeAndName: Unknown.withConstraint((o) => o !== null && typeof o === 'object' && o._someClassTag === SOMECLASS_TAG, {
        name: 'SomeClass',
    }),
    GuardChangeTypeAndName: Guard((o) => o !== null && typeof o === 'object' && o._someClassTag === SOMECLASS_TAG, {
        name: 'SomeClass',
    }),
    DictionaryOfArraysOfSomeClass: Dictionary(Array(InstanceOf(SomeClass))),
    OptionalKey: Record({ foo: String, bar: Union(Number, Undefined) }),
    ReadonlyNumberArray: Array(Number).asReadonly(),
    ReadonlyRecord: Record({ foo: Number, bar: String }).asReadonly(),
    Graph,
    SRDict,
    Hand,
    Ambi,
    BarbellBall,
    PartialPerson,
    ReadonlyPartial: Record({ foo: Number })
        .asReadonly()
        .And(RTPartial({ bar: String }).asReadonly()),
    EmptyTuple: Tuple(),
};
const runtypeNames = Object.keys(runtypes);
class Foo {
} // Should not be recognized as a Dictionary
const testValues = [
    { value: undefined, passes: ['Undefined', 'Void'] },
    { value: null, passes: ['Null', 'Void'] },
    { value: true, passes: ['Boolean', 'true'] },
    { value: false, passes: ['Boolean', 'false'] },
    { value: 3, passes: ['Number', 'brandedNumber', 3, 'union1'] },
    {
        value: 42,
        passes: ['Number', 'brandedNumber', 42, 'MoreThanThree', 'MoreThanThreeWithMessage'],
    },
    { value: 'hello world', passes: ['String', 'hello world', 'union1'] },
    { value: [Symbol('0'), Symbol(42), Symbol()], passes: ['symbolArray'] },
    { value: Symbol.for('runtypes'), passes: ['Sym'] },
    { value: [true, false, true], passes: ['boolArray', 'boolTuple', 'union1'] },
    { value: { Boolean: true, Number: 3 }, passes: ['record1', 'union1', 'Partial'] },
    { value: { Boolean: true }, passes: ['Partial'] },
    { value: { Boolean: true, foo: undefined }, passes: ['Partial'] },
    { value: { Boolean: true, foo: 'hello' }, passes: ['Partial', 'OptionalKey'] },
    { value: { Boolean: true, foo: 5 }, passes: ['ReadonlyPartial'] },
    { value: (x, y) => x + y.length, passes: ['Function'] },
    { value: { name: undefined, likes: [] }, passes: [] },
    { value: { name: 'Jimmy', likes: [{ name: undefined, likes: [] }] }, passes: [] },
    {
        value: { name: 'Jimmy', likes: [{ name: 'Peter', likes: [] }] },
        passes: ['Person'],
    },
    { value: { a: '1', b: '2' }, passes: ['Dictionary'] },
    { value: ['1', '2'], passes: ['ArrayString', 'NumberDictionary'] },
    { value: ['1', 2], passes: [] },
    { value: [{ name: 'Jimmy', likes: [{ name: 'Peter', likes: [] }] }], passes: ['ArrayPerson'] },
    { value: [{ name: null, likes: [] }], passes: [] },
    { value: { 1: '1', 2: '2' }, passes: ['Dictionary', 'NumberDictionary'] },
    { value: { a: [], b: [true, false] }, passes: ['DictionaryOfArrays'] },
    { value: new Foo(), passes: [] },
    { value: [1, 2, 4], passes: ['ArrayNumber', 'ReadonlyNumberArray'] },
    { value: { Boolean: true, Number: '5' }, passes: ['Partial'] },
    {
        value: [1, 2, 3, 4],
        passes: ['ArrayNumber', 'ReadonlyNumberArray', 'CustomArray', 'CustomArrayWithMessage'],
    },
    {
        value: new SomeClassV1(42),
        passes: [
            'CustomGuardType',
            'CustomGuardConstraint',
            'ChangeType',
            'ChangeTypeAndName',
            'GuardChangeTypeAndName',
        ],
    },
    {
        value: new SomeClassV2(42),
        passes: [
            'CustomGuardType',
            'CustomGuardConstraint',
            'ChangeType',
            'ChangeTypeAndName',
            'GuardChangeTypeAndName',
        ],
    },
    { value: { xxx: [new SomeClass(55)] }, passes: ['DictionaryOfArraysOfSomeClass'] },
    { value: { foo: 'hello' }, passes: ['OptionalKey', 'Dictionary'] },
    { value: { foo: 'hello', bar: undefined }, passes: ['OptionalKey'] },
    { value: { foo: 4, bar: 'baz' }, passes: ['ReadonlyRecord', 'ReadonlyPartial'] },
    { value: narcissist, passes: ['Person'] },
    { value: [narcissist, narcissist], passes: ['ArrayPerson'] },
    { value: barbell, passes: ['Graph'] },
    { value: nodeA, passes: ['Graph', 'BarbellBall'] },
    { value: srDict, passes: ['SRDict'] },
    { value: leftHand, passes: ['Hand', 'SRDict'] },
    { value: ambi, passes: ['Ambi', 'Hand', 'SRDict'] },
    { value: partialNarcissus, passes: ['PartialPerson'] },
];
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '<Circular Reference>';
            }
            seen.add(value);
        }
        else if (typeof value === 'symbol' || typeof value === 'function')
            return value.toString();
        return value;
    };
};
for (const { value, passes } of testValues) {
    const valueName = value === undefined ? 'undefined' : JSON.stringify(value, getCircularReplacer());
    describe(`${valueName}`, () => {
        const shouldPass = {};
        shouldPass.Unknown = true;
        shouldPass.Void = true;
        if (value !== undefined && value !== null)
            shouldPass.Empty = true;
        for (const name of passes)
            shouldPass[name] = true;
        for (const name of runtypeNames) {
            if (shouldPass[name]) {
                it(` : ${name}`, () => assertAccepts(value, runtypes[name]));
            }
            else {
                it(`~: ${name}`, () => assertRejects(value, runtypes[name]));
            }
        }
    });
}
describe('contracts', () => {
    it('0 args', () => {
        const f = () => 3;
        expect(Contract(Number).enforce(f)()).toBe(3);
        try {
            Contract(String).enforce(f)();
            fail('contract was violated but no exception was thrown');
        }
        catch (exception) {
            expect(exception).toBeInstanceOf(ValidationError);
            /* success */
        }
    });
    it('1 arg', () => {
        const f = (x) => x.length;
        expect(Contract(String, Number).enforce(f)('hel')).toBe(3);
        try {
            Contract(String, Number).enforce(f)(3);
            fail('contract was violated but no exception was thrown');
        }
        catch (exception) {
            expect(exception).toBeInstanceOf(ValidationError);
            /* success */
        }
    });
    it('2 args', () => {
        const f = (x, y) => (y ? x.length : 4);
        expect(Contract(String, Boolean, Number).enforce(f)('hello', false)).toBe(4);
        try {
            Contract(String, Boolean, Number).enforce(f)('hello');
            fail('contract was violated but no exception was thrown');
        }
        catch (exception) {
            expect(exception).toBeInstanceOf(ValidationError);
            /* success */
        }
    });
});
describe('check errors', () => {
    it('tuple type', () => {
        assertThrows([false, '0', true], Tuple(Number, String, Boolean), 'Expected number, but was boolean in [0]', '[0]');
    });
    it('tuple length', () => {
        assertThrows([0, '0'], Tuple(Number, String, Boolean), 'Expected an array of length 3, but was 2');
    });
    it('tuple nested', () => {
        assertThrows([0, { name: 0 }], Tuple(Number, Record({ name: String })), 'Expected string, but was number in [1].name', '[1].name');
    });
    it('tuple 0', () => {
        assertAccepts([], Tuple());
    });
    it('array', () => {
        assertThrows([0, 2, 'test'], Array(Number), 'Expected number, but was string in [2]', '[2]');
    });
    it('array nested', () => {
        assertThrows([{ name: 'Foo' }, { name: false }], Array(Record({ name: String })), 'Expected string, but was boolean in [1].name', '[1].name');
    });
    it('array null', () => {
        assertThrows([{ name: 'Foo' }, null], Array(Record({ name: String })), 'Expected { name: string; }, but was null in [1]', '[1]');
    });
    it('readonly array', () => {
        assertThrows([0, 2, 'test'], Array(Number).asReadonly(), 'Expected number, but was string in [2]', '[2]');
    });
    it('readonly array nested', () => {
        assertThrows([{ name: 'Foo' }, { name: false }], Array(Record({ name: String })).asReadonly(), 'Expected string, but was boolean in [1].name', '[1].name');
    });
    it('readonly array null', () => {
        assertThrows([{ name: 'Foo' }, null], Array(Record({ name: String })).asReadonly(), 'Expected { name: string; }, but was null in [1]', '[1]');
    });
    it('dictionary', () => {
        assertThrows(null, Dictionary(String), 'Expected { [_: string]: string }, but was null');
    });
    it('dictionary invalid type', () => {
        assertThrows(undefined, Dictionary(Record({ name: String })), 'Expected { [_: string]: { name: string; } }, but was undefined');
        assertThrows(1, Dictionary(Record({ name: String })), 'Expected { [_: string]: { name: string; } }, but was number');
    });
    it('dictionary complex', () => {
        assertThrows({ foo: { name: false } }, Dictionary(Record({ name: String })), 'Expected string, but was boolean in foo.name', 'foo.name');
    });
    it('string dictionary', () => {
        assertThrows({ foo: 'bar', test: true }, Dictionary(String), 'Expected string, but was boolean in test', 'test');
    });
    it('number dictionary', () => {
        assertThrows({ 1: 'bar', 2: 20 }, Dictionary(String, 'number'), 'Expected string, but was number in 2', '2');
    });
    it('record', () => {
        assertThrows({ name: 'Jack', age: '10' }, Record({
            name: String,
            age: Number,
        }), 'Expected number, but was string in age', 'age');
    });
    it('record missing keys', () => {
        assertThrows({ name: 'Jack' }, Record({
            name: String,
            age: Number,
        }), 'Expected number, but was undefined in age', 'age');
    });
    it('record complex', () => {
        assertThrows({ name: 'Jack', age: 10, likes: [{ title: false }] }, Record({
            name: String,
            age: Number,
            likes: Array(Record({ title: String })),
        }), 'Expected string, but was boolean in likes.[0].title', 'likes.[0].title');
    });
    it('readonly record', () => {
        assertThrows({ name: 'Jack', age: '10' }, Record({
            name: String,
            age: Number,
        }).asReadonly(), 'Expected number, but was string in age', 'age');
    });
    it('readonly record missing keys', () => {
        assertThrows({ name: 'Jack' }, Record({
            name: String,
            age: Number,
        }).asReadonly(), 'Expected number, but was undefined in age', 'age');
    });
    it('readonly record complex', () => {
        assertThrows({ name: 'Jack', age: 10, likes: [{ title: false }] }, Record({
            name: String,
            age: Number,
            likes: Array(Record({ title: String }).asReadonly()),
        }).asReadonly(), 'Expected string, but was boolean in likes.[0].title', 'likes.[0].title');
    });
    it('partial', () => {
        assertThrows({ name: 'Jack', age: null }, RTPartial({
            name: String,
            age: Number,
        }), 'Expected number, but was null in age', 'age');
    });
    it('partial complex', () => {
        assertThrows({ name: 'Jack', likes: [{ title: 2 }] }, RTPartial({
            name: String,
            age: Number,
            likes: Array(Record({ title: String })),
        }), 'Expected string, but was number in likes.[0].title', 'likes.[0].title');
    });
    it('constraint standard message', () => {
        assertThrows(new SomeClass(1), Unknown.withConstraint((o) => o.n > 3, {
            name: 'SomeClass',
        }), 'Failed SomeClass check');
    });
    it('constraint custom message', () => {
        assertThrows(new SomeClass(1), Unknown.withConstraint((o) => (o.n > 3 ? true : 'n must be 3+'), {
            name: 'SomeClass',
        }), 'n must be 3+');
    });
    it('union', () => {
        assertThrows(false, Union(Number, String), 'Expected number | string, but was boolean');
    });
});
describe('reflection', () => {
    const X = Literal('x');
    const Y = Literal('y');
    it('unknown', () => {
        expectLiteralField(Unknown, 'tag', 'unknown');
    });
    it('never', () => {
        expectLiteralField(Never, 'tag', 'never');
    });
    it('void', () => {
        expectLiteralField(Void, 'tag', 'unknown');
    });
    it('boolean', () => {
        expectLiteralField(Boolean, 'tag', 'boolean');
    });
    it('number', () => {
        expectLiteralField(Number, 'tag', 'number');
    });
    it('string', () => {
        expectLiteralField(String, 'tag', 'string');
    });
    it('symbol', () => {
        expectLiteralField(Sym, 'tag', 'symbol');
    });
    it('literal', () => {
        expectLiteralField(X, 'tag', 'literal');
        expectLiteralField(X, 'value', 'x');
    });
    it('array', () => {
        expectLiteralField(Array(X), 'tag', 'array');
        expectLiteralField(Array(X).element, 'tag', 'literal');
        expectLiteralField(Array(X).element, 'value', 'x');
        expectLiteralField(Array(X), 'isReadonly', false);
    });
    it('array (asReadonly)', () => {
        expectLiteralField(Array(X).asReadonly(), 'tag', 'array');
        expectLiteralField(Array(X).asReadonly().element, 'tag', 'literal');
        expectLiteralField(Array(X).asReadonly().element, 'value', 'x');
        expectLiteralField(Array(X).asReadonly(), 'isReadonly', true);
    });
    it('tuple', () => {
        expectLiteralField(Tuple(X, X), 'tag', 'tuple');
        expect(Tuple(X, X).components.map(C => C.tag)).toEqual(['literal', 'literal']);
        expect(Tuple(X, X).components.map(C => C.value)).toEqual(['x', 'x']);
    });
    it('string dictionary', () => {
        const Rec = Dictionary(Unknown);
        expectLiteralField(Rec, 'tag', 'dictionary');
        expectLiteralField(Rec, 'key', 'string');
    });
    it('number dictionary', () => {
        const Rec = Dictionary(Unknown, 'number');
        expectLiteralField(Rec, 'tag', 'dictionary');
        expectLiteralField(Rec, 'key', 'number');
    });
    it('record', () => {
        const Rec = Record({ x: Number, y: Literal(3) });
        expectLiteralField(Rec, 'tag', 'record');
        expectLiteralField(Rec.fields.x, 'tag', 'number');
        expectLiteralField(Rec.fields.y, 'tag', 'literal');
        expectLiteralField(Rec.fields.y, 'value', 3);
        expectLiteralField(Rec, 'isReadonly', false);
    });
    it('record (asReadonly)', () => {
        const Rec = Record({ x: Number, y: Literal(3) }).asReadonly();
        expectLiteralField(Rec, 'tag', 'record');
        expectLiteralField(Rec.fields.x, 'tag', 'number');
        expectLiteralField(Rec.fields.y, 'tag', 'literal');
        expectLiteralField(Rec.fields.y, 'value', 3);
        expectLiteralField(Rec, 'isReadonly', true);
    });
    it('partial', () => {
        const Opt = RTPartial({ x: Number, y: Literal(3) });
        expectLiteralField(Opt, 'tag', 'record');
        expectLiteralField(Opt.fields.x, 'tag', 'number');
        expectLiteralField(Opt.fields.y, 'tag', 'literal');
        expectLiteralField(Opt.fields.y, 'value', 3);
    });
    it('union', () => {
        expectLiteralField(Union(X, Y), 'tag', 'union');
        expectLiteralField(Union(X, Y), 'tag', 'union');
        expect(Union(X, Y).alternatives.map(A => A.tag)).toEqual(['literal', 'literal']);
        expect(Union(X, Y).alternatives.map(A => A.value)).toEqual(['x', 'y']);
    });
    it('intersect', () => {
        expectLiteralField(Intersect(X, Y), 'tag', 'intersect');
        expectLiteralField(Intersect(X, Y), 'tag', 'intersect');
        expect(Intersect(X, Y).intersectees.map(A => A.tag)).toEqual(['literal', 'literal']);
        expect(Intersect(X, Y).intersectees.map(A => A.value)).toEqual(['x', 'y']);
    });
    it('function', () => {
        expectLiteralField(Function, 'tag', 'function');
    });
    it('lazy', () => {
        const L = Lazy(() => X);
        expectLiteralField(L, 'tag', 'literal');
        expectLiteralField(L, 'value', 'x');
    });
    it('constraint', () => {
        const C = Number.withConstraint(n => n > 0, { name: 'PositiveNumber' });
        expectLiteralField(C, 'tag', 'constraint');
        expectLiteralField(C.underlying, 'tag', 'number');
        expectLiteralField(C, 'name', 'PositiveNumber');
    });
    it('instanceof', () => {
        class Test {
        }
        expectLiteralField(InstanceOf(Test), 'tag', 'instanceof');
        expectLiteralField(Dictionary(Array(InstanceOf(Test))), 'tag', 'dictionary');
    });
    it('brand', () => {
        const C = Number.withBrand('someNumber');
        expectLiteralField(C, 'tag', 'brand');
        expectLiteralField(C.entity, 'tag', 'number');
    });
});
describe('change static type with Constraint', () => {
    const test = (value) => {
        const C = Unknown.withConstraint(SomeClassV2.isSomeClass, {
            name: 'SomeClass',
        });
        if (C.guard(value)) {
            return value;
        }
        else {
            return new SomeClassV2(3);
        }
    };
    it('change static type', () => {
        const value = new SomeClassV1(42);
        const result = test(value);
        // confirm that it's really a SomeClassV1, even though it's type-cast to SomeClassV2
        expect(result instanceof SomeClassV1).toBe(true);
        expect(result.n).toBe(42);
    });
});
// Static tests of reflection
(X) => {
    const check = (X) => X.check({});
    switch (X.tag) {
        case 'unknown':
            check(X);
            break;
        case 'never':
            check(X);
            break;
        case 'boolean':
            check(X);
            break;
        case 'number':
            check(X);
            break;
        case 'string':
            check(X);
            break;
        case 'symbol':
            check(X);
            break;
        case 'literal':
            check(X);
            break;
        case 'array':
            check(X);
            break;
        case 'record':
            check(X);
            break;
        case 'tuple':
            check(X);
            break;
        case 'union':
            check(X);
            break;
        case 'intersect':
            check(X);
            break;
        case 'function':
            check(X);
            break;
        case 'constraint':
            check(X);
            break;
        case 'instanceof':
            check(X);
            break;
        case 'brand':
            check(X);
            break;
    }
    return X;
};
function expectLiteralField(o, k, v) {
    expect(o[k]).toBe(v);
}
function assertAccepts(value, runtype) {
    const result = runtype.validate(value);
    if (result.success === false)
        fail(result.message);
}
function assertRejects(value, runtype) {
    const result = runtype.validate(value);
    if (result.success === true)
        fail('value passed validation even though it was not expected to');
}
function assertThrows(value, runtype, error, key) {
    try {
        runtype.check(value);
        fail('value passed validation even though it was not expected to');
    }
    catch (exception) {
        const { message: errorMessage, key: errorKey } = exception;
        expect(exception).toBeInstanceOf(ValidationError);
        expect(errorMessage).toBe(error);
        expect(errorKey).toBe(key);
    }
}
//# sourceMappingURL=index.spec.js.map