import { showModal } from './modal';
import { createFighterImage } from '../fighterPreview';

export function showWinnerModal(fighter) {
  // call showModal function 
  const modal = {
    title: `${fighter.name} is win!`,
    bodyElement: createFighterImage(fighter),
    onClose: () => location.reload()
  };

  showModal(modal);
}
