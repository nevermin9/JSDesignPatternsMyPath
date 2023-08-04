/**
 * PROXY
 * an interface for accessing a particular resource
 *
 * Definition:
 * A class that function as an interface to a particular resource.
 * That resource can be remote, expensive to construct, or may require logging 
 * or some other added functionality. 
 * 
 * - a proxy has the same an interface as the undelying obj
 * - to create a proxy, simply replicate the existing interface of an obj
 * - add relevant functionality to the redefined memeber functions
 * - different proxies have complitely different behaviors
 */


// Value Proxy
class Precentage {
    percent: number;

    constructor(percent: number) {
        this.percent = percent;
    }

    toString() {
        return `${this.percent}%`
    }

    valueOf() {
        return this.percent / 100;
    }
}

let fivePercent = new Precentage(5);

// property proxy
class Property {
    _value: any;
    name: string;

    constructor(value: any, name: string) {
        this._value = value;
        this.name = name;
    }

    get value() { return this._value }
    set value(newValue: any) {
        if (this._value === newValue) {
            return;
        }

        console.log(`The new value of ${this.name} is ${newValue}`);
        this._value = newValue;
    }
}

class $Creature {
    _agility: Property;
    constructor(val: number) {
        this._agility = new Property(val, 'agility');
    }

    get agility() { return this._agility.value; }

    set agility(newValue: number) {
        this._agility.value = newValue;
    }
}

const c = new $Creature(35);
c.agility = 42;
c.agility = 420;

// protection proxy
class Car {
    drive() {
        console.log('Car is being driven!')
    }
}

class CarProxy {
    _car: Car;

    constructor(public driver: Driver) {
        this._car = new Car();
    }

    drive() {
        if (this.driver.age < 16) {
            console.log('Driver too young');
            return;
        }

        this._car.drive();
    }
}

class Driver {
    constructor(public age: number) { }
}

// virtual proxy
class $Image {
    url: string;

    constructor(url: string) {
        this.url = url;
        // expensive operation
        console.log('Fetch image from ', url);
    }

    draw() {
        console.log('Drawing image from ', this.url);
    }
}

class LazyImage {
    constructor(public url: string, private img: $Image) { }

    draw() {
        if (!this.img) {
            this.img = new $Image(this.url);
        }
        this.img.draw();
    }
}

// e
class $Person {
    age: number;

    constructor(age = 0) {
        this.age = age;
    }

    drink() { return 'drinking'; }
    drive() { return 'driving'; }
    drinkAndDrive() { return 'driving while drunk'; }
}

class ResponsiblePerson {
    constructor(private person: $Person) { }

    drink() {
        if (this.person.age < 18) {
            return 'too young';
        }

        return this.person.drink();
    }

    drive() {
        if (this.person.age < 18) {
            return 'too young';
        }

        return this.person.drive();
    }

    drinkAndDrive() { return 'dead'; }
}

const p1 = new ResponsiblePerson(new $Person(15));
const p2 = new ResponsiblePerson(new $Person(18));
// console.log("🚀 ~ file: index.ts ~ line 161 ~ p2.drink();", p2.drink())
console.log("🚀 ~ file: index.ts ~ line 161 ~ p1.drive()", p1.drive())
console.log("🚀 ~ file: index.ts ~ line 161 ~ p1.drive()", p1.drink())