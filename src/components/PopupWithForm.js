import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._form = selector.querySelector(".form");
    this._setEventListeners();
    this.callback = callback;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', event => {
      event.preventDefault();
      this.callback(event);
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}
