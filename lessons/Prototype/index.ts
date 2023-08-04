/**
 * - Complicated objects aren't disned from scratch.
 *   they reiterate existing designs
 * - An existing (partially or fully constructed) design is a Prototype
 * - We make a copy (clone) the prototype and customize it
 *   requires "deep copu" support
 * - We make the cloning convenient (e.g. via Factory)
 * 
 * PROTOTYPE
 * A partially or fully initialized obj that you copy/clone and make use of
 */

class Address {
    constructor(
        public streetAddress: string,
        public city: string,
        public country: string,
    ) { }

    // deepCopy(): Address {
    //     return new Address(this.streetAddress, this.city, this.country);
    // }

    toString(): string {
        return `Address is ${this.streetAddress}, ${this.city}, ${this.country}`;
    }
}

class Person1 {
    constructor(
        public name: string,
        public address: Address,
    ) { }

    // deepCopy(): Person1 {
    //     return new Person1(this.name, this.address.deepCopy());
    // }

    greet(): void {
        console.log(`
            Hi, my name is ${this.name},
            I live at ${this.address}
        `)
    }

    toString(): string {
        return `${this.name} lives at ${this.address}`;
    }
}


class Serializer {
    constructor(public types: any[]) { }

    markRecursive(object: Record<string, any>) {
        let idx = this.types.findIndex(t => {
            return t.name === object.constructor.name;
        });

        if (idx !== -1) {
            object['typeIndex'] = idx;

            for (let key in object) {
                if (object.hasOwnProperty(key) && object[key] != null) {
                    this.markRecursive(object[key]);
                }
            }
        }
    }

    reconstructRecursive(object: Record<string, any>) {
        if (object.hasOwnProperty('typeIndex')) {
            let type = this.types[object.typeIndex];
            let obj = new type();
            for (let key in object) {
                if (object.hasOwnProperty(key) && object[key] != null) {
                    obj[key] = this.reconstructRecursive(object[key]);
                }
            }
            delete obj.typeIndex;
            return obj;
        }
        return object;
    }

    clone(object: Record<string, any>) {
        this.markRecursive(object);
        let copy = JSON.parse(JSON.stringify(object));
        return this.reconstructRecursive(copy);
    }
}

let john = new Person1('John', new Address('123 London Road', 'London', 'UK'));
// john.greet();
const ser = new Serializer([Address, Person1]);
let jane = ser.clone(john)

// let jane = JSON.parse(JSON.stringify(john));
jane.name = 'Jane';
jane.address.streetAddress = '564 Fields';
// jane.greet();

// --My approach--
// let jane = Object.assign({}, john, {name: 'Jane'});
// Object.setPrototypeOf(jane, Person1.prototype);

// console.log(john.toString())
// console.log(jane.toString())

// --PROTOTYPE FACTORY--
class Address2 {
    constructor(
        public suite: string | null,
        public streetAddress: string | null,
        public city: string | null,
    ) { }

    toString(): string {
        return `Address is ${this.streetAddress}, ${this.city}, ${this.suite}`;
    }
}

class Employee2 {
    constructor(
        public name: string | null,
        public address: Address2,
    ) { }

    greet(): void {
        console.log(`
            Hi, my name is ${this.name},
            I live at ${this.address}
        `)
    }

    toString(): string {
        return `${this.name} lives at ${this.address}`;
    }
}

class EmployeeFactory {
    static main: Employee2;
    static aux: Employee2;
    static serializer: Serializer;

    private static newEmployee(proto: Employee2, name: string, suite: string) {
        let copy = EmployeeFactory.serializer.clone(proto);
        copy.name = name;
        copy.address.suite = suite;
        return copy;
    }

    static newMainOfficeEmployee(name: string, suite: string) {
        return this.newEmployee(this.main, name, suite);
    }

    static newAuxOfficeEmployee(name: string, suite: string) {
        return this.newEmployee(this.aux, name, suite);
    }
}

EmployeeFactory.serializer = new Serializer([Employee2, Address2]);
EmployeeFactory.main = new Employee2(null, new Address2(null, '123 East Dr', 'London'));
EmployeeFactory.aux = new Employee2(null, new Address2(null, '56 Hmelnickogo', 'Kyiv'));

let anton = EmployeeFactory.newMainOfficeEmployee('Anton', '12');
let platon = EmployeeFactory.newMainOfficeEmployee('Platon', '13');
console.log(anton.toString());
console.log(platon.toString());


class Point1 {
    constructor(public x: number, public y: number) { }

    setNewX(x: number) {
        this.x = x;
        return this;
    }
}

class Line {
    constructor(public start: Point1, public end: Point1) { }

    deepCopy() {
        const copyStart = this._makeCopyOfPoint(this.start);
        const copyEnd = this._makeCopyOfPoint(this.end);
        return new Line(copyStart, copyEnd);
    }

    _makeCopyOfPoint(obj: Point1) {
        const copy = JSON.parse(JSON.stringify(obj));
        Object.setPrototypeOf(copy, Point1.prototype)
        return copy;
    }
}


/**
 * SUMMARY
 * - To implement a prototype, partially construct an obj and store it somewhere
 * - Deep copy the prototype
 * - Customize the resulting instance
 * - A factory provides a convenient API for using prototypes
 */

// better version