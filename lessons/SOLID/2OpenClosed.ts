enum Color {
    red = 'red',
    green = 'green',
    blue = 'blue',
}

enum Size {
    s = 'small',
    m = 'medium',
    l = 'large'
}

class Product {
    constructor(
        public name: string,
        public color: Color,
        public size: Size,
    ) {}
}

/**
 *   Open for extension, closed for modification;
 *   adding new method to ProductFilter (filterBySize) is modification
 *   modification is attempt to solve problem via existing class
 * */ 

class ProductFilter {
    static filterByColor(products: Product[], color: Color): Product[] {
        return products.filter(p => p.color === color);
    }

    static filterBySize(products: Product[], size: Size): Product[] {
        return products.filter(p => p.size === size);
    }
}

let apple = new Product('Apple', Color['green'], Size['s']);
let tree = new Product('Tree', Color['green'], Size['l']);
let house = new Product('House', Color['blue'], Size['l']);

let products = [apple, tree, house];

console.log('Green products (--old--) \n');
for (let p of ProductFilter.filterByColor(products, Color['green'])) {
    console.log(`* ${p.name} \n`);
}

// GOOD: Specification
abstract class Specification {
    abstract isSatisfied(item: Product): boolean;
}

class ColorSpecification extends Specification {
    constructor(public color: Color) { 
        super();
    }

    isSatisfied(item: Product): boolean {
        return item.color === this.color;
    }
}

class SizeSpecification extends Specification {
    constructor(public size: Size) { 
        super();
    }

    isSatisfied(item: Product): boolean {
        return item.size === this.size;
    }
}


class AndSpecification extends Specification {
    constructor(public specs: Specification[]) {
        super();
    }

    isSatisfied(item: Product): boolean {
        return this.specs.every(s => s.isSatisfied(item));
    }
}

class BetterFilter {
    filter(items: Product[], spec: Specification): Product[] {
        return items.filter(item => spec.isSatisfied(item));
    }
}

let bf = new BetterFilter();
let greenSpec = new ColorSpecification(Color['green'])
console.log("🚀 ~ file: 2OpenClosed.ts ~ line 72 ~ greenSpec", greenSpec)

console.log('Green products (--new--)');
for (let k of bf.filter(products, greenSpec)) {
    console.log(`-- ${k.name} --`)
}

console.log('Large and green products: ');
let colorAndSizeSpec = new AndSpecification([new ColorSpecification(Color['green']), new SizeSpecification(Size['l'])]);
for (let k of bf.filter(products, colorAndSizeSpec)) {
    console.log(`-- ${k.name} --`)
}
