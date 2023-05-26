export default class Popup {
  constructor(selector) {
    this.popup = selector;
    this._closeEscPopup = this._closeEscPopup.bind(this);
  }

// Открытие поп-апа
  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeEscPopup);
  }

// Закрытие поп-апа
  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeEscPopup);
  };

  _closeEscPopup(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this.popup.addEventListener('click', event => {
      if (event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}
