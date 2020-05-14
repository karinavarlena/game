import { createElement } from '../helpers/domHelper';
import { selectFighter } from './fightersView';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  
  if(!fighter) return fighterElement;

  // todo: show fighter info (image, name, health, etc.)
  const fighterCard = createElement({ tagName: 'div', className: 'fighters___fighter' });
  const imageElement = createFighterImage(fighter);
  const onClick = (event) => {
    selectFighter.selectedIndex = position === 'right';
  }
  const iconsElements = createFighterIcons(fighter);
  
  fighterCard.append(imageElement);
  fighterCard.append(iconsElements);
  fighterElement.append(fighterCard);
  fighterElement.addEventListener('click', onClick, false);

  return fighterElement;
}

function createFighterIcons(fighter) {

  const { attack, defense, health, source, name } = fighter;
  
  const iconsSrc = {
    attack: './resources/hand.svg', 
    defense: './resources/security.svg',
    health: './resources/love.svg'
  };

  const list = createElement({
    tagName: 'ul',
    className: 'fighter-categories'
  });

  const icons = Object.keys(iconsSrc).map(elem => {
    const attributes = { 
      src: iconsSrc[elem], 
      title: elem,
      alt: elem 
    };
    
    const img = createElement({
      tagName: 'img',
      className: 'fighter-categories__img',
      attributes,
    });

    const item = createElement({
      tagName: 'li',
      className: 'fighter-categories__property'
    });
    
    item.innerText = fighter[elem];
    item.append(img);
    return item;
  });

  list.append(...icons);
  return list;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
