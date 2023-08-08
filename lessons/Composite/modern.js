class GraphicObject {
    static count = 0

    constructor(name=`Group ${GraphicObject.count++}`) {
        this._name = name
        this.color = undefined
        this.children = []
    }

    get name() {
        return this._name
    }

    print(buff, depth) {
        buff.push("*".repeat(depth))
        if (depth > 0) {
            buff.push(" ")
        }
        if (this.color) {
            buff.push(`${this.color} `)
        }
        buff.push(this.name)
        buff.push("\n")

        for (let child of this.children) {
            child.print(buff, depth + 1)
        }
    }

    toString() {
        let buffer = []
        this.print(buffer, 0)
        return buffer.join('')
    }
}

class Circle extends GraphicObject {
    constructor(color) {
        super('Circle')
        this.color = color
    }
}

class Rect extends GraphicObject {
    constructor(color) {
        super('Rectangle')
        this.color = color
    }
}

const drawing = new GraphicObject()
drawing.children.push(new Circle("yellow"))
drawing.children.push(new Rect("red"))

const group = new GraphicObject()
group.children.push(new Rect("black"))
group.children.push(new Circle("purple"))

drawing.children.push(group)

console.log(drawing.toString())

const selfIterable = {
    name: "SelfIterableObject",
    [Symbol.iterator]() {
        let isDone = false
        function next() {
            return {
                value: this,
                done: isDone++
            }
        } 
        return {
            next: next.bind(this)
        }
    }
}

for (const item of selfIterable) {
    console.log("the item is: ", item.name)
}