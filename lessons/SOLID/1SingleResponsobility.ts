
class PersisnceManager {

}

class Jornal {
    entries: { [count: number]: string };
    count: number;

    constructor() {
        this.entries = {};
        this.count = 0;
    }

    addEntry(text: string): number {
        let c = ++this.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index: number): void {
        delete this.entries[index];
    }

    toString(): string {
        return Object.values(this.entries).join('\n')
    }

    // saveFile(filename: string) {

    // }

    // load(filename: string) {

    // }
}

class FileHandler {
    prepare(object: {}): void {
        //...
    }

    load(filename: string): void {
        //...
    }

    saveFile(data: {}, filename: string): void {
        //...
    }
}

class Singleton {
    static instance: Singleton;

    private constructor() {}

    static create() {
        if (!this.instance) {
            this.instance = new Singleton();
        }

        return this.instance;
    }
}


const j = new Jornal();
j.addEntry('I cried today');
j.addEntry('I ate meat');
console.log(`${j}`);

//separation of concerns