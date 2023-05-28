import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._form = selector.querySelector(".form");
    super._setEventListeners();
    this._setEventListeners();
    this.callback = callback;
  }

  _setEventListeners() {
    this._form.addEventListener('submit', event => {
      event.preventDefault();
      this.callback(event);
      this._form.reset();
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}