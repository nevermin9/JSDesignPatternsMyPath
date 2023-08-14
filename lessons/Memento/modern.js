/**
 * Memento Coding Exercise
A TokenMachine  is in charge of keeping tokens.
 Each Token  is a reference type with a single numeric value.
 The machine supports adding tokens and, when it does, it returns a memento representing the state of that system at that given time.

You are asked to fill in the gaps and implement the Memento design pattern for this scenario.
 Pay close attention to the situation where a token is fed in as a reference and
 its value is subsequently changed on that reference -
 you still need to return the correct system snapshot!
 */

class Token {
    constructor(value=0) {
        this.value = value;
    }
}

class Memento {
    constructor(tokens=[]) {
        this.tokens = tokens.map(t => new Token(t.value))
    }
}

class TokenMachine {
    constructor() {
        this.tokens = [];
    }

    addTokenValue(value) {
        return this.addToken(new Token(value))
    }

    addToken(token) {
        this.tokens.push(token);
        const memento = new Memento([...this.tokens]);
        return memento;
    }

    revert(m) {
        this.tokens = m.tokens.map(token => new Token(token.value))
    }
}

const tm = new TokenMachine()
const m = tm.addTokenValue(123)
console.log("memento 1", m.tokens.map(t => t.value))
const m2 = tm.addTokenValue(456)
console.log("memento 2", m2.tokens.map(t => t.value))
const t1 = new Token(111)
const m3 = tm.addToken(t1)
console.log("memento 3", m3.tokens.map(t => t.value))
t1.value = 222; // oops, changed the token value
console.log("memento 3", m3.tokens.map(t => t.value))
