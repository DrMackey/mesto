export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._lisenerHandleEscClose = (evt) => this._handleEscClose(evt);
    this._lisenerhandleEventClose = (evt) => this._handleEventClose(evt);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleEventClose(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener(
      "click",
      this._lisenerhandleEventClose
    );
  }

  open() {
    // this.setEventListeners();
    document.addEventListener("keydown", this._lisenerHandleEscClose);
    this._popupSelector.classList.add("popup_opened");
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._lisenerHandleEscClose);
  }
}
