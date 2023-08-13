class Event {
  constructor() {
    this.handlers = new Map
    this.count = 0
  }

  sub(handler) {
    this.handlers.set(++this.count, handler)
    return this.count
  }

  unsub(idx) {
    this.handlers.delete(idx)
  }

  emit(sender, args) {
    for (const [key, handler] of this.handlers) {
      handler(sender, args)
    }
  }
}

class Game {
  constructor() {
    this.queries = new Event()
  }

  performQuery(sender, query) {
    this.queries.emit(sender, query)
  }
}

class Query {
  constructor(creatureName, whatToQuery, value) {
    this.creatureName = creatureName
    this.whatToQuery = whatToQuery
    this.value = value
  }
}

const WhatToQuery = Object.freeze({
  attack: 1,
  defense: 2,
})

class Creature {
  constructor(game, name, attack, defense) {
    this.game = game
    this.name = name
    this.initAttack = attack
    this.initDefense = defense
  }

  get attack() {
    const q = new Query(this.name, WhatToQuery.attack, this.initAttack)
    this.game.performQuery(this, q)
    return q.value
  }

  get defense() {
    const q = new Query(this.name, WhatToQuery.defense, this.initDefense)
    this.game.performQuery(this, q)
    return q.value
  }

  toString() {
    return `${this.name} (${this.attack}/${this.defense})`
  }
}

class CreatureModifier {
  constructor(game, creature) {
    this.creature = creature
    this.game = game
    this.token = game.queries.sub(
      this.handle.bind(this)
    )
  }

  handle(sender, query) {}

  dispose() {
    this.game.queries.unsub(this.token)
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(game, creature) {
    super (game, creature)
  }

  handle(sender, query) {
    if (query.creatureName === this.creature.name
    && query.whatToQuery === WhatToQuery.attack) {
      query.value *= 2
    }
  }
}

class Inc2DefenseModifier extends CreatureModifier {
  constructor(game, creature) {
    super (game, creature)
  }

  handle(sender, query) {
    if (query.creatureName === this.creature.name
      && query.whatToQuery === WhatToQuery.defense) {
      query.value += 2
    }
  }
}

const game = new Game()
const goblin = new Creature(game, "Strong Goblin", 2, 2)
console.log (goblin.toString())

let dam = new DoubleAttackModifier(game, goblin)
console.log(goblin.toString())

let incDefMod = new Inc2DefenseModifier(game, goblin)
console.log (goblin.toString())

dam.dispose()

console.log(goblin.toString())
