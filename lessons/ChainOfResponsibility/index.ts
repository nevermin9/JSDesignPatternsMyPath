/**
 * Chain of Responsobility
 * sequence of handlers processing an event one after another
 * 
 * A chain of components who all get a chance to process
 * a command or a query, optionally having default processing
 * implementation and an ability to terminate the processing chain.
 */

class Creature {
    constructor(
        public name: string,
        public attack: number,
        public deffense: number
    ) {}

    toString() {
        return `${this.name} (${this.attack}/${this.deffense})`;
    }
}

class CreatureModifier {
    creature: Creature;
    next: CreatureModifier | null;
    name: string;

    constructor(creature: Creature) {
        this.creature = creature;
        this.next = null;
        this.name = 'creature modifier'
    }

    add(modifier: CreatureModifier) {
        if (this.next) this.next.add(modifier);
        else this.next = modifier;
    }

    handle() {
        console.log(this.next);
        if (this.next) this.next.handle();
    }
}

class DoubleAttackModifier extends CreatureModifier {
    constructor(creature: Creature) {
        super(creature);
        this.name = 'double-attack-modifier'
    }

    handle() {
        this.creature.attack *= 2;
        super.handle();
    }
}

class DoubleDeffenseModifier extends CreatureModifier {
    constructor(creature: Creature) {
        super(creature);
        this.name = 'double-deffense-modifier'
    }

    handle() {
        this.creature.deffense *= 2;
        super.handle();
    }
}

const goblin = new Creature('Goblin', 1, 1);

const root = new CreatureModifier(goblin);

root.add(new DoubleAttackModifier(goblin));
root.add(new DoubleDeffenseModifier(goblin));
root.handle();

console.log(goblin.toString())