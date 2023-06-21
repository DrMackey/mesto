export class Popup {
    constructor(popupSelector) {  
    this._popupSelector = popupSelector;
    this._lisenerHandleEscClose = (evt) => this._handleEscClose(evt);
    this._lisenerhandleEventClose = (evt) => this._handleEventClose(evt);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleEventClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', this._lisenerhandleEventClose);
    document.addEventListener('keydown', this._lisenerHandleEscClose);
  }

  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.removeEventListener('click', this._lisenerhandleEventClose);
    document.removeEventListener('keydown', this._lisenerHandleEscClose);
  }
}