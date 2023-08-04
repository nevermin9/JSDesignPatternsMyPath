/**
 * DECORATOR
 * adding behavior without altering the class itself
 * 
 * - want to augment an object with additional functionality
 * - do not want to rewrite or alter existion code (OCP)
 * - want to keep new functionality separate (SRP)
 * - need to be able to interact with existing structures
 * - two options:
 *      inherit from required object (if possible)
 *      build decoratore, which simply references the decorated objects
 * 
 * Facilitates the addition of befaviors to individual objects without inheriting from them.
 */


class Bird {
    age: number;

    constructor(age: number = 0) {
        this.age = age;
    }

    fly() {
        return this.age < 10 ? 'flying' : 'too old';
    }
}

class Lizard {
    age: number;

    constructor(age: number = 0) {
        this.age = age;
    }

    crawl() {
        return this.age > 1 ? 'crawling' : 'too young';
    }
}

class Dragon {
    animal: Bird | Lizard;
    age: number;
    
    constructor(animal: Bird | Lizard, age: number = 0) {
        this.animal = animal;
        this.age = age;
    }

    fly() {
        // if (this.animal.fly) {
            // this.animal.fly();
        // }
    }
}