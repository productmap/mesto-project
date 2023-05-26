export default class FormValidator {
  constructor(config, selector) {
    this._config = config;
    this._form = selector.querySelector(this._config.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorMessage = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._errorMessage);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._errorMessage);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.validationMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  disableSubmit() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmit();
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._toggleButtonState(this._inactiveButtonClass);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inactiveButtonClass);
      });
    });
  };

  errorReset() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
      this._toggleButtonState(this._inactiveButtonClass);
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
