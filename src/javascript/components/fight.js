import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {

    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  // return damage
  let damage = getHitPower(attacker) - getBlockPower(defender);
  
  if(damage < 0) return 0;
  return damage;
}

export function getHitPower(fighter) {
  // return hit power
  const criticalHitChance = Math.round((1 + Math.random())*100)/100;;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = Math.round((1 + Math.random())*100)/100;
  return fighter.defense * dodgeChance;
}
