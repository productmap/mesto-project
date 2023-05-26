import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = selector.querySelector('.popup__image');
    this._caption = selector.querySelector('.popup__caption');
    this._overlay = selector.querySelector('.popup__overlay');
    this._setEventListeners();
  }

  open(link, name) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    this._overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  }

  _setEventListeners() {
    super._setEventListeners();
    this.popup.addEventListener('click', event => {
      if (event.target.classList.contains('popup__image')) {
        this.close();
      }
    });
  }
}
