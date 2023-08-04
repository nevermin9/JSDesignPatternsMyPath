class ModernSingleton {
    static #instance = null

    constructor() {
        if (ModernSingleton.#instance) {
            return ModernSingleton.#instance
        }

        ModernSingleton.#instance = this
    }
}


const _instance = null
class AnotherModernSingleton {
    constructor(name) {
        this.name = name
    }
}

export const createSingleton = () => {
    if (_instance) {
        return _instance
    }
    _instance = new AnotherModernSingleton("singleton")
    return _instance
}

class MonostateSingleton {
    get name() { return MonostateSingleton._name }
    set name(v) {
        MonostateSingleton._name = v
    }

    get age() { return MonostateSingleton._age }
    set age(v) {
        MonostateSingleton._age = v
    }
}
MonostateSingleton._age = null
MonostateSingleton._name = null