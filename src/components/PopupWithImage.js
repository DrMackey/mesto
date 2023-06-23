import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(cardPhoto, popupSelector) {
    super(popupSelector);
    this._popupImageSrc = document.querySelector(".popup__image");
    this._popupImageCaption = document.querySelector(".popup__caption");
    this._popupImage = document.querySelector(popupSelector);
    this._imageSrc = cardPhoto.src;
    this._imageAlt = cardPhoto.alt;
  }

  open() {
    super.open();
    this._popupImageSrc.src = this._imageSrc;
    this._popupImageSrc.alt = this._imageAlt;
    this._popupImageCaption.textContent = this._imageAlt;
    super.setEventListeners();
  }
}
