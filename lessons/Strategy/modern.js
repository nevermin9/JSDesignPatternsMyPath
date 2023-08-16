/**
 * Strategy (aka Policy) pattern
 * A creature is walking through the dungeon. It is expected to have the following attributes:

attack is its attack value

health is its health value

alive indicates whether the creature is alive or not

The creature is part of a game that involves traps. When a creature springs a trap, two things can happen:

In a ConstantDamageStrategy, the creature's health is reduced by exactly 1 (one) point. So if a creature had 5 health and it springs a trap, it now has 4 health.

In a GrowingDamageStrategy, each spring trap does 1 more damage to the creature than the previous one. So the creature takes 1 damage on the first trap, 2 on the second, 3 on the third, and so on.

Please help complete the implementation of both Creature and associated strategies using the provided implementation.
 */

class Creature
{
  constructor(attack, health)
  {
    this.attack = attack;
    this.health = health;
    // todo
  }

  get alive() { return this.health > 0; }
}

class Game
{
  constructor(damageStrategy)
  {
    this.damageStrategy = damageStrategy;
  }

  springTrapOn(creature)
  {
    this.damageStrategy.damage(creature);
    return creature.alive;
  }
}

class DamageStrategy
{
  damage(creature)
  {

  }
}

class ConstantDamageStrategy extends DamageStrategy
{
  damage(creature)
  {
    creature.health -= 1;
  }
}

class GrowingDamageStrategy extends DamageStrategy
{
  damage(creature)
  {
    if (!GrowingDamageStrategy.impact.has(creature)) {
      GrowingDamageStrategy.impact.set(creature, 1);
    } else {
      GrowingDamageStrategy.impact.set(creature, GrowingDamageStrategy.impact.get(creature) + 1);
    }
    creature.health -= GrowingDamageStrategy.impact.get(creature);
  }
}
GrowingDamageStrategy.impact = new Map
