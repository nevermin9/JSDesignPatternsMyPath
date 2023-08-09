// implementation interface
class DrawingAPI {
    drawCircle(x, y, radius) {}
}

// concrete implementations
class DrawingAPI1 extends DrawingAPI {
    drawCircle(x, y, radius) {
        console.log(`Drawing circle at (${x}, ${y}) with radius ${radius} using DrawingAPI1`);
    }
}

class DrawingAPI2 extends DrawingAPI {
    drawCircle(x, y, radius) {
        console.log(`Drawing circle at (${x}, ${y}) with radius ${radius} using DrawingAPI2`);
    }
}

// Abstraction
class Shape {
    constructor(drawingAPI) {
        this.drawingAPI = drawingAPI
    }

    draw() {}
}

// Refined abstractions
class CircleShape extends Shape {
    constructor(x, y, radius, drawingAPI) {
        super(drawingAPI)
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw() {
        this.drawingAPI.drawCircle(this.x, this.y, this.radius)
    }
}

const shape = new CircleShape(1, 2, 3, new DrawingAPI1())
shape.draw()