import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight';
import { showWinnerModal } from './modal/winner';

export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);

  root.innerHTML = '';
  root.append(arena);

  // todo:
  // - start the fight
  // - when fight is finished show winner
  try {
    fight(...selectedFighters)
    .then(winner => showWinnerModal(winner));
  } catch(error) {
    console.error(error);
  }
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  const attack = createAttack();
  const defense = createDefense();
  
  arena.append(healthIndicators, fighters, attack, defense);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');
  
  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${position}-fighter-indicator` }});

  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createAttack() {
  const container = createElement({ tagName: 'div', className: 'arena___attack-container' });
  const containerLeft = createElement({ tagName: 'div', className: 'arena___attack-left' });
  const containerRight = createElement({ tagName: 'div', className: 'arena___attack-right' });

  const attributes = { 
    src: './resources/hit.png', 
    title: 'attack',
    alt: 'attack' 
  };

  const imgElement = createElement({
    tagName: 'img',
    className: 'arena___attack-img',
    attributes,
  });

  containerRight.append(imgElement.cloneNode(true));
  containerLeft.append(imgElement);
  container.append(containerLeft, containerRight);

  return container;
}

function createDefense() {
  const container = createElement({ tagName: 'div', className: 'arena___defense-container' });

  const attributes = { 
    src: './resources/shield.png', 
    title: 'defense',
    alt: 'defense' 
  };

  const imgElement = createElement({
    tagName: 'img',
    className: 'arena___defense-img',
    attributes,
  });

  container.append(imgElement.cloneNode(true), imgElement);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });

  fighterElement.append(imgElement);
  return fighterElement;
}
