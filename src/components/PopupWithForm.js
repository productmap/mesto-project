import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._form = selector.querySelector(".form");
    this._setEventListeners();
    this.callback = callback;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', event => {
      event.preventDefault();
      this.callback(event, this._getInputValues());
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}
