/**
 * ADAPTER
 * a construct which adapts an existing interface X 
 * to conform to the * required interface Y
 */

interface String {
    hashCode: () => string | number;
}

String.prototype.hashCode = function () {
    return this.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0)
}

let drawPoint = function () {
    process.stdout.write('.');
}

let drawPoints = function (vectorObjs: VectorObject[]) {
    for (let vo of vectorObjects) {
        for (let line of vo) {
            let adapter = new LineToPointAdapter(line);
            adapter.items.forEach(drawPoint);
        }
    }
}

class Point2 {
    constructor(
        public x: number,
        public y: number
    ) { }

    toString(): string {
        return `${this.x}, ${this.y}`;
    }

    valueOf() {
        return 2;
    }
}

class Line2 {
    constructor(
        public start: Point2,
        public end: Point2
    ) { }

    toString(): string {
        return `${this.start.toString()} ===> ${this.end.toString()}`;
    }

}

class VectorObject extends Array { }

class VectorRectangle extends VectorObject {
    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.push(new Line2(new Point2(x, y), new Point2(x + width, y)));
        this.push(new Line2(new Point2(x + width, y), new Point2(x + width, y + height)));
        this.push(new Line2(new Point2(x, y), new Point2(x, y + height)));
        this.push(new Line2(new Point2(x, y + height), new Point2(x + width, y + height)));
    }
}

let vectorObjects: VectorObject[] = [
    new VectorRectangle(1, 1, 10, 10),
    new VectorRectangle(3, 3, 6, 6),
];

class LineToPointAdapter {
    hash: string | number;
    points: Point2[] = [];
    static count: number = 0;
    static cache: { [key: string]: Point2[] } = {};

    constructor(line: Line2) {
        this.hash = JSON.stringify(line).hashCode();

        if (LineToPointAdapter.cache[this.hash]) {
            return;
        }

        console.log(`${LineToPointAdapter.count++}: Generating point for line ${line.toString()} (no caching)`);

        let left = Math.min(line.start.x, line.end.x);
        let right = Math.max(line.start.x, line.end.x);
        let top = Math.min(line.start.y, line.end.y);
        let bottom = Math.max(line.start.y, line.end.y);

        if (right - left === 0) {
            for (let y = top; y <= bottom; ++y) {
                this.points.push(new Point2(left, y));
            }
        } else if (line.end.y - line.start.y === 0) {
            for (let x = left; x <= right; ++x) {
                this.points.push(new Point2(x, top));
            }
        }

        LineToPointAdapter.cache[this.hash] = this.points;
    }

    get items() {
        return LineToPointAdapter.cache[this.hash];
    }
}

drawPoints(vectorObjects);
drawPoints(vectorObjects);


/**
 * - implementing an Adapter is easy
 * - determine the API you have and the API you need
 * - create a component which aggregates (has a reference to, ...) the adaptee
 * - intermediate representations can pile up: use caching and other optimizations
 */