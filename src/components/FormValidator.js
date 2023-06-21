export class FormValidator {
  constructor(configFormSelectors, formElement) {
    this._config = configFormSelectors;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _disabledButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = "disabled";
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton();
    } else {
      this._enableButton();
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      this.toggleButtonState(this._buttonElement);
    } else {
      this._hideInputError(inputElement);
      this.toggleButtonState(this._buttonElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.isValid(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
