/**
Observer Coding Exercise
Imagine a game where one or more rats can attack a player. Each individual rat has an initial attack value of 1. However, rats attack as a swarm, so each rat's attack value is actually equal to the total number of rats in play.

Given that a rat enters play through the initializer and leaves play (dies) via its die() method, please implement the Game and Rat classes so that, at any point in the game, the attack value of a rat is always consistent.

Here's a sample unit test your code should pass:

let game = new Game();
let rat = new Rat(game);
let rat2 = new Rat(game);
expect(rat.attack).toEqual(2);
expect(rat2.attack).toEqual(2);
 */
class Game {
  constructor() {
    this.rats = new Set;
  }

  addRat(rat) {
    this.rats.add(rat)
    this.updateRatAttack();
  }

  removeRat(rat) {
    this.rats.delete(rat)
    this.updateRatAttack()
  }

  updateRatAttack() {
    const totalRats = this.rats.size
    for (const rat of this.rats) {
      rat.attackValue = totalRats;
    }
  }
}

class Rat {
  constructor(game) {
    this.game = game;
    this.attackValue = 1;
    this.game.addRat(this);
  }

  get attack() {
    return this.attackValue;
  }

  die() {
    this.game.removeRat(this);
  }
}

// Sample unit test
let game = new Game();
let rat = new Rat(game);
let rat2 = new Rat(game);

console.log(rat.attack); // Output: 2
console.log(rat2.attack);
rat2.die()
console.log(rat.attack); // Output: 1
