import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._popupButton = this._popupElement.querySelector(".popup__button");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(
      this._popupElement.querySelectorAll(".popup__input")
    );
    this._cardId = "";
  }

  _handleEventSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  _getInputValues() {
    if (this._inputList.length > 0) {
      const formValues = {};

      this._inputList.forEach((input) => {
        formValues[input.name] = input.value;
      });

      return formValues;
    }

    return { cardId: this._cardId, element: this._element };
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement = this._popupElement.querySelector(".popup__input-form");
    this._formElement.addEventListener("submit", (evt) => {
      this._handleEventSubmit(evt);
    });
  }

  handleStateButtonLoading() {
    this._popupButton.textContent = "Сохранение...";
  }
  handleStateButtonDone() {
    this._popupButton.textContent = "Сохранить";
  }

  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
