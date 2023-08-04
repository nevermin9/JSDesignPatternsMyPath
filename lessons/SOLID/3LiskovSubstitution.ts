class Rectangle {
    get area(): number {
        return this._width * this._heigth;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._heigth;
    }

    set width(value: number) {
        this._width = value;
    }

    set height(value: number) {
        this._heigth = value;
    }

    // resolve problem
    get isSquare(): boolean {
        return this._heigth === this._width;
    }

    constructor(
        protected _width: number,
        protected _heigth: number,
    ) {}

    toString(): string {
        return `${this._width}x${this._heigth}`;
    }
}

class Square extends Rectangle {
    constructor(public size: number) {
        super(size, size);
    }

    set width(value: number) {
        this._width = this._heigth = value;
    }

    set height(value: number) {
        this._width = this._heigth = value;
    }
}

function useIt(rc: Rectangle) {
    let width = rc.width;
    rc.height = 10;
    console.log(`Expected are of ${10 * width}, result is ${rc.area}`);
}


let rc = new Rectangle(2, 3);
useIt(rc);

let sq = new Square(3);
console.log("🚀 ~ file: 3LiskovSubstitution.ts ~ line 58 ~ sq WIDTH", sq.width)
useIt(sq);