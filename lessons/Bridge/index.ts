/**
 * BRIDGE
 * connecting components together through abstractions
 * DEFINITION: A mechanism that docouples an interface (hirarchy) from an implementation (hierarchy).
 * 
 * - Bridge prevents a 'Cartesian product' complexity explosion
 * - Bridge prevents avoids the entity exposion
 */

abstract class Renderer {
    constructor(protected shape: string) {}

    get whatToRenderAs(): string {
        return this.shape;
    }

    abstract toString(): string;
}

class Shape {
    constructor(public name: string, public renderer: Renderer) { }
}

class Triangle extends Shape {
    constructor(name: string, renderer: Renderer) {
        super(name, renderer);
    }
}

class Square3 extends Shape {
    constructor(name: string, renderer: Renderer) {
        super(name, renderer);
    }
}

class VectorRenderer extends Renderer {
    constructor(shape: string) {
        super(shape);
    }

    toString() {
        return `Drawing ${this.whatToRenderAs} as lines`;
    }
}

class RasterRenderer extends Renderer {
    constructor(shape: string) {
        super(shape);
    }

    toString() {
        return `Drawing ${this.whatToRenderAs} as pixels`;
    }
}

// imagine VectorTriangle and RasterTriangle are here too