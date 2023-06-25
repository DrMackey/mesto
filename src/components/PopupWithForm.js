import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(
      this._popupElement.querySelectorAll(".popup__input")
    );
  }

  _lisenerHandleEventSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.test = (evt) => this._lisenerHandleEventSubmit(evt);
    this._formElement = this._popupElement.querySelector(".popup__input-form");
    this._formElement.addEventListener("submit", this.test);
  }

  close() {
    super.close();
    this._formElement.reset();
    this._formElement.removeEventListener("submit", this.test);
  }
}
