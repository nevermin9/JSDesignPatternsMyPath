/**
 * - object creation logic becomes too convoluted
 * - initializer is not descriptive
 *   name is always "constructore"
 *   cannot overload with same sets of arguments with different names
 *   can turn into optional parameter hell
 * - wholesale object creation (non-piecewise, unlike Builder) can be outsourced to
 *   a separate method (Factory Method)
 *   that may exist in a separate class (Factory)
 *   can create hierarchy of factories with Abstract Factory
 * 
 * FACTORY
 * a component responsible solely for the wholesale (not piecewise) creation of objects 
 */

// Factory Method
enum CoordinateSystem {
    cartesian,
    polar,
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static newCartisianPoint(x: number, y: number) {
        return new Point(x, y);
    }

    static newPolarPoint(rho: number, theta: number) {
        return new Point(
            rho * Math.cos(theta),
            rho * Math.sin(theta)
        );
    }

    // static get factory() {
    //     return PointFactory;
    // }
}


// FACTORY
class PointFactory {
    static newCartisianPoint(x: number, y: number) {
        return new Point(x, y);
    }

    static newPolarPoint(rho: number, theta: number) {
        return new Point(
            rho * Math.cos(theta),
            rho * Math.sin(theta)
        );
    }
}

// ABSTRACT FACTORY
enum HotDrinks {
    tea,
    coffee,
}

abstract class HotDrink {
    abstract consume(): void;
}

class Tea extends HotDrink {
    consume() {
        console.log('This tea is nice with lemon!');
    }
}

class Coffee extends HotDrink {
    consume() {
        console.log('This coffee is delicious');
    }
}

abstract class HotDrinkFactory {
    abstract prepare(amount: number): HotDrink;
}

class TeaFactory extends HotDrinkFactory {
    prepare(amount: number): HotDrink {
        console.log('Put bag of tea...', amount)
        return new Tea();
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepare(amount: number): HotDrink {
        console.log('Coffee preparing...', amount)
        return new Coffee();
    }
}

class HotDrinkMachine {
    makeDrink(type: HotDrinks): HotDrink {
        switch (type) {
            case HotDrinks.tea:
                return new TeaFactory().prepare(500);
            case HotDrinks.coffee:
                return new CoffeeFactory().prepare(300);
        }
    }
}


// --- exercise ---

class Man {
    constructor(
        public id: number,
        public name: string,
    ) {}
}

class ManFactory {
    static _id: number = -1;

    static get idCounter(): number {
        return ++this._id;
    }

    createPerson(name: string): Man {
        return new Man(ManFactory.idCounter, name);
    }
}

const manFac = new ManFactory();
const man1 = manFac.createPerson('Jack')
const man2 = manFac.createPerson('Lindi')
const man3 = manFac.createPerson('Dayle')
console.log(man1, man2, man3);


/**
 * SUMMARY
 * - A FactoryMethod is a static method that creates objects
 * - A Factory is any entity that can take care of obj creation
 * - A factory can be external or reside inside the object as an inner class
 * - Hierarchies of factories can be used to create related objects
 */