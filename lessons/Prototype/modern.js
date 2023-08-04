class ModernAddress {
    constructor(city, street, number) {
        this.city = city
        this.street = street
        this.number = number
    }

    toString() {
        return `${this.street}, ${this.number}, ${this.city}`
    }
}

class ModernPerson {
    constructor(name, address, job) {
        this.name = name
        this.address = address
        this.job = job
    }

    toString() {
        return `Hello, my name is ${this.name}, I live at ${this.address},
            and I work as ${this.job.position} for ${this.job.company}, my salary is ${this.job.salary}`
    }

    copyThis() {
        return structuredClone(this)
    }
}

function copyThis(instance) {
    const bareClone = structuredClone(instance)
    Object.setPrototypeOf(bareClone, instance.constructor.prototype)

    for (const [key, value] of Object.entries(instance)) {
        if (typeof value !== "object" || value === null) {
            continue
        }

        const constructorName = value.constructor.name

        if (typeof globalThis[constructorName] !== "undefined") {
            copyThis(value)
            continue
        }

        Object.setPrototypeOf(bareClone[key], value.constructor.prototype)
    }

    return bareClone
}

async function main() {
    const john = new ModernPerson(
        "John",
        new ModernAddress("Kyiv", "Bratislavska", 30),
        {
            position: "Developer",
            company: "Coca-Cola",
            salary: 30_000,
        }
    )
    const jane = copyThis(john)
    jane.name = "Jane"

    console.log(john.toString())
    console.log(jane.toString())
}

main()
