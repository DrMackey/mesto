export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
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
    this._popupSelector.addEventListener("click", (evt) =>
      this._handleEventClose(evt)
    );
  }

  open() {
    this._handleEscClose = this._handleEscClose.bind(this);
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupSelector.classList.remove("popup_opened");
  }
}
