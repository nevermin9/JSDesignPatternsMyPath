/**
 * COMPOSITE
 * treating individual and aggregate objects uniformly
 * DEFENITION: A mechanism for treating individual (scalar)
 * objects and compsitions of objects in a uniform manner
 * 
 * - Objects use other objects' fields/methods through inheritance and composition
 * - Composition lets us make compound objects
 * - Composite design pattern is udes to treat both single (scalar) and composite objects uniformly
 */

// class Connectable {
//     connectTo(other) {
//         for (let from of this) {
//             for (let to of other) {
//                 from.out.push(to);
//                 to.in.push(from);
//             }
//         }
//     }
// }

class Neuron {
    in: Neuron[] | NeuronLayer[];
    out: Neuron[] | NeuronLayer[];

    constructor() {
        this.in = [];
        this.out = [];
    }

    // connectTo(other: Neuron | NeuronLayer) {
    //     this.out.push(other)
    //     other.in.push(this);
    // }

    toString(): string {
        return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
    }
}

class NeuronLayer extends Array {
    constructor(count: number) {
        super();

        while (count-- > 0) {
            this.push(new Neuron);
        }
    }

    toString() {
        return ` A layer with ${this.length} neurons`
    }
}

let neuron1 = new Neuron();
let neuron2 = new Neuron();
let layer1 = new NeuronLayer(3);
let layer2 = new NeuronLayer(5);

// neuron1.connectTo(neuron2);
// neuron1.connectTo(layer2);

// layer2.connectTo(neuron1)
// layer1.connectTo(neuron2)

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());

class ValueStore {
    _value: number | number[];

    constructor(value: number | number[]) {
        this._value = value;
    }

    get value(): number {
        if (Array.isArray(this._value)) {
            return this._value.reduce((a, b) => a + b);
        }

        return this._value;
    }
}

class SingleValue extends ValueStore {}

class ManyValues extends ValueStore {
    constructor(value: number[] = []) {
        super(value)
    }

    push(val: number) {
        if (Array.isArray(this._value)) {
            this._value.push(val);
            return this;
        }
    }
}

let sum = function (containers: ValueStore[]): number {
    //@ts-ignore
    return containers.reduce((c1, c2) => c1.value + c2.value);
};

const v1 = new SingleValue(11);
const v2 = new ManyValues();
v2.push(22)?.push(33)

console.log(sum([v1, v2]))