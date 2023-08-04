/**
 * - for some components it only makes sense to have one in the system (database)
 * - e.g., the constructor call is expensive
 * - want to prevent anyone creating additional copies
 * 
 * SINGLETON
 * a component which is instantiated only once
 * 
 */

class SingleTonTS {
    private static instance: SingleTonTS | null = null;

    private constructor() {}

    static create(): SingleTonTS {
        if (this.instance === null ) {
            this.instance = new SingleTonTS(); 
        }

        return this.instance;
    }
}


class SingletonJS {
    constructor() {
        // @ts-ignore
        const instance = this.constructor.instance;
        if (instance) {
            return instance;
        }

        // @ts-ignore
        this.constructor.instance = this;
    }
}

// Problems may occure when singleton is a straight dependency
/**
 * A constructor can choose what to return; we can keep returning same instance
 * Monostate: many instances, shared data
 * Directly depending on the Singleton is a bad idea; introduce a dependency instead
 */