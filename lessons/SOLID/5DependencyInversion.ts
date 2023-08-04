enum Relationship {
    parent,
    child,
    sibling
}

class Person {
    constructor(public name: string) {}
}

// LOW-LEVEL Module
interface Relation {
    from: Person;
    type: Relationship;
    to: Person;
}

// HIGH-LEVEL MODULE
// BAD:
// class Research {
//     constructor(rels: Relationships) {
//         let data: Relation[] = [...rels.data]; 
//         let correctRels = data.filter(rel => {
//             return rel.from.name === 'John' && rel.type === Relationship['parent'];
//         });
//         console.log(correctRels);
//     }
// }
// GOOD
class Research {
    constructor(rels: Researcher, name: string) {
        for (let p of rels.findAllChildrenOf(name)) {
            console.log(p);
        }
    }
}

// GOOD
interface Researcher {
    findAllChildrenOf(name: string): Relation[];
}

class Relationships implements Researcher {
    data: Relation[] = [];

    addParentAndChild(parent: Person, child: Person) {
        this.data.push({
            from: parent,
            type: Relationship['parent'],
            to: child
        });
    }

    findAllChildrenOf(name: string): Relation[] {
        // for example
        return this.data;
    }
}



let dad = new Person('John');
let child1 = new Person('Jack');
let child2 = new Person('Matt');

let rl = new Relationships();
rl.addParentAndChild(dad, child1);
rl.addParentAndChild(dad, child2);
new Research(rl, 'John')
