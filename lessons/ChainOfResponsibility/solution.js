//
// Chain of Responsibility Coding Exercise
// You are given a game scenario with classes Goblin and GoblinKing. Please implement the following rules:
//
// A goblin has base 1 attack/1 defense (1/1), a goblin king is 3/3.
//
// When the Goblin King is in play, every other goblin gets +1 Attack.
//
// Goblins get +1 to Defense for every other Goblin in play (a GoblinKing is a Goblin!).
//
// Example:
//
// Suppose you have 3 ordinary goblins in play. Each one is a 1/3 (1/1 + 0/2 defense bonus).
//
// A goblin king comes into play. Now every goblin is a 2/4 (1/1 + 0/3 defense bonus from each other + 1/0 from goblin king)
//
// The state of all the goblins has to be consistent as goblins are added and removed from the game.
//
// Here is an example of the kind of test that will be run on the system:
//
// let game = new Game();
// let goblin = new Goblin(game);
// expect(goblin.attack).toEqual(1);
// expect(goblin.defense).toEqual(1);
// Note: creature removal (unsubscription) does not need to be implemented.


class Goblin {
  constructor(game, baseAttack=1, baseDefense=1) {
    this.game = game
    this.baseAttack = baseAttack
    this.baseDefense = baseDefense
    this.game.addCreature(Goblin.name)
  }

  get attack() {
    const numberOfGoblinKings = this.game.creatures[GoblinKing.name] || 0

    return this.baseAttack + numberOfGoblinKings
  }

  get defense() {
    const numberOfGoblins = (this.game.creatures[Goblin.name] || 1) - 1

    return this.baseDefense + numberOfGoblins
  }
}
Goblin.name = "Goblin"

class GoblinKing extends Goblin {
  constructor(game) {
    super(game, 3, 3)
    this.game.addCreature(GoblinKing.name)
  }
}
GoblinKing.name = "Goblin King"

class Game {
  constructor() {
    this.creatures = {}
  }

  addCreature(name) {
    this.creatures[name] ? ++this.creatures[name] : this.creatures[name] = 1
  }

  removeCreature(name) {
    this.creatures[name] > 1 ? --this.creatures[name] : delete this.creatures[name]
  }
}

const game = new Game()
const goblin1 = new Goblin(game)
const goblin2 = new Goblin(game)
const goblin3 = new Goblin(game)
const goblinKing = new GoblinKing(game)
