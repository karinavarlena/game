import { controls } from '../../constants/controls';
import { getKeyByValue } from '../helpers/domHelper';

export async function fight(firstFighter, secondFighter) {
  const pressedKeys = new Set();

  const attackElement = {
    'right': document.getElementsByClassName('arena___rightattack')[0],
    'left': document.getElementsByClassName('arena___leftattack')[0],
    'criticright': document.getElementsByClassName('arena___criticrightattack')[0],
    'criticleft': document.getElementsByClassName('arena___criticleftattack')[0]
  }

  const [defenceLeft, defenceRight] = document.getElementsByClassName('arena___defense-img');
  
  const criticAttackTimer = {
    'leftCritic': false,
    left() {
        this.leftCritic = false;
        setTimeout(() => this.leftCritic = true, 10000)
    },
    'rightCritic': false,
    right() {
        this.rightCritic = false;
        setTimeout(() => this.rightCritic = true, 10000)
    },
  }

  const healthPercent = {
    'left': firstFighter.health/100,
    'right': secondFighter.health/100
  }
  const healthIndicator = {
    'left': document.getElementById('left-fighter-indicator'),
    'right': document.getElementById('right-fighter-indicator')
  }

  function fire(firstFighter, secondFighter, cls) {
    const coff = cls.indexOf('critic') === -1? 1: 2;
    setHealth(secondFighter, firstFighter, coff);
    attackElement[cls].classList.add(`arena___${cls}attack--attack`); 
    const anotherCls = cls.indexOf('left') === -1? 'left': 'right';
    healthIndicator[anotherCls].style.width = `${Math.round(secondFighter.health / healthPercent[anotherCls])}%`;
  }
  
  function setHealth(firstFighter, secondFighter, coff=1) {
    firstFighter.health -= coff*getDamage(secondFighter, firstFighter);
    firstFighter.health = firstFighter.health > 0? firstFighter.health : 0;
  }
  
  const config = {
    PlayerOneAttack: () => !pressedKeys.has(controls.PlayerTwoBlock) && fire(firstFighter, secondFighter, 'left'),
    PlayerOneBlock: () => defenceLeft.classList.add('arena___defense-img--defense'),
    PlayerTwoAttack: () =>  !pressedKeys.has(controls.PlayerOneBlock) && fire(secondFighter, firstFighter, 'right'),
    PlayerTwoBlock: () => defenceRight.classList.add('arena___defense-img--defense'),
    PlayerOneCriticalHitCombination: () => {
      if(criticAttackTimer.leftCritic) {
        fire(firstFighter, secondFighter, 'criticleft');
        criticAttackTimer.left();
      }
    },
    PlayerTwoCriticalHitCombination: () => {
      if(criticAttackTimer.rightCritic) {
        fire(secondFighter, firstFighter, 'criticright')
        criticAttackTimer.right();
      }
    }
  }

  return new Promise((resolve) => {
    criticAttackTimer.right();
    criticAttackTimer.left();
    // resolve the promise with the winner when fight is over
    document.addEventListener('keydown', (e) => {
      if(pressedKeys.has(e.code)) return;
      pressedKeys.add(e.code);

      controls.PlayerOneCriticalHitCombination.every(elem => pressedKeys.has(elem)) && config.PlayerOneCriticalHitCombination();

      controls.PlayerTwoCriticalHitCombination.every(elem => pressedKeys.has(elem)) && config.PlayerTwoCriticalHitCombination();

      const func = config[getKeyByValue(controls, e.code)];
      func && func();

      !firstFighter.health && resolve(secondFighter);
      !secondFighter.health && resolve(firstFighter);

    });

    [defenceLeft, defenceRight].forEach(element => {
      element.addEventListener("animationend", () => element.classList.remove('arena___defense-img--defense'));
    });

    ['left', 'right', 'criticleft', 'criticright'].forEach(cls => {
      attackElement[cls].addEventListener("animationend", () => attackElement[cls].classList.remove(`arena___${cls}attack--attack`));
    });

    document.addEventListener('keyup', (e) => pressedKeys.delete(e.code));
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
