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
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popupSelector.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popupSelector.classList.remove("popup_opened");
  }
}
