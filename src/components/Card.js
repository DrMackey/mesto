export class Card {
  constructor({ name, link }, templateSelector, handleClickImage) {
    this._photoLinkCard = link;
    this._textCard = name;
    this._templateSelector = document.querySelector(
      `${templateSelector}`
    ).content;
    this._handleClickImage = handleClickImage;
  }

  _getTemplate() {
    const cardElement = this._templateSelector
      .querySelector(".list__item")
      .cloneNode(true);

    return cardElement;
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".list__delete-button")
      .addEventListener("click", () => this._removeCard());
    this._buttonLike.addEventListener("click", () => this._handleButtonLike());
    this._image.addEventListener("click", (evt) => {
      this._handleClickImage(evt.target);
    });
  }

  _handleButtonLike() {
    this._buttonLike.classList.toggle("list__like-button_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".list__image");
    this._buttonLike = this._element.querySelector(".list__like-button");
    this._setEventListeners();

    this._image.src = this._photoLinkCard;
    this._image.alt = this._textCard;
    this._element.querySelector(".list__title").textContent = this._textCard;

    return this._element;
  }
}
