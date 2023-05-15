// Открытие поп-апа
export const openPopup = modalWindow => {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
}

// Закрытие поп-апа
export const closePopup = modalWindow => {
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
};

function closeEscPopup(event) {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal)
  }
}
