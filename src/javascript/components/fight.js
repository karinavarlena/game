import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  const keysCodes = new Set(Object.values(controls)
                              .reduce((result, val) => {
                                return typeof val === 'object'?
                                  [...result, ...val]: 
                                  [...result, val]; 
                              }, []));

  const pressedKeys = new Set();
  const attackRight = document.getElementsByClassName('arena___attack-right')[0];
  const attackLeft = document.getElementsByClassName('arena___attack-left')[0];
  const [defenceLeft, defenceRight] = document.getElementsByClassName('arena___defense-img');
  const healthLeftPercent = firstFighter.health/100;
  const healthRightPercent = secondFighter.health/100;
  const healthLeftIndicator = document.getElementById('left-fighter-indicator');
  const healthRightIndicator = document.getElementById('right-fighter-indicator');
  
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    document.addEventListener('keydown', (e) => {
      //if(!keysCodes.has(e.code)) return;
      pressedKeys.add(e.code);
      console.log(e.code === 'KeyA');

      if(e.code === 'KeyA' && !pressedKeys.has('KeyL')) {
        
        console.log(secondFighter.health, firstFighter.health);
        secondFighter.health -= getDamage(firstFighter, secondFighter);
        secondFighter.health = secondFighter.health > 0? secondFighter.health : 0;
        attackLeft.classList.add('arena___attack-left--attack'); 
        healthRightIndicator.style.width = `${Math.round(secondFighter.health / healthRightPercent)}%`;
      
      } else if(e.code === 'KeyJ' && !pressedKeys.has('KeyD')) {
        
        console.log(secondFighter.health, firstFighter.health);
        firstFighter.health -= getDamage(secondFighter, firstFighter);
        firstFighter.health = firstFighter.health > 0? firstFighter.health : 0;
        console.log(secondFighter.health, firstFighter.health);
        attackRight.classList.add('arena___attack-right--attack');
        healthLeftIndicator.style.width = `${Math.round(firstFighter.health / healthLeftPercent)}%`;

      } else if (e.code === 'KeyD') {
        defenceLeft.classList.add('arena___defense-img--defense');
      } else if(e.code === 'KeyL') {
        defenceRight.classList.add('arena___defense-img--defense');
      }

    });

    [defenceLeft, defenceRight].forEach(element => {
      element.addEventListener("animationend", () => element.classList.remove('arena___defense-img--defense'));
    });
    attackLeft.addEventListener("animationend", () => attackLeft.classList.remove('arena___attack-left--attack'));
    attackRight.addEventListener("animationend", () => attackRight.classList.remove('arena___attack-right--attack'));

    document.addEventListener('keyup', (e) => {
      pressedKeys.delete(e.code);

      switch(e.code) { 
      }
     
    });
  });
}

function firstFighterAttack(code) {

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
