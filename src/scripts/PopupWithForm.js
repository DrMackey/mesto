import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._popupElement = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._inputsList = Array.from(popupSelector.querySelectorAll('.popup__input'));
    this._lisenerHandleEventSubmit = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    }
  }

  _getInputValues() {
    this._inputListValue = {
      link: this._inputsList[1].value,
      name: this._inputsList[0].value
    };
    return this._inputListValue;
  }

  setEventListeners() {
    this._formElement = this._popupElement.querySelector('.popup__input-form');
    this._formElement.addEventListener('submit', this._lisenerHandleEventSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
    this._formElement.removeEventListener('submit', this._lisenerHandleEventSubmit);
  }
}