export class Card {
  constructor({ name, link }, templateSelector, setCardImageListener) {
    this._photoLinkCard = link;
    this._textCard = name;
    this._templateSelector = document.querySelector(
      `${templateSelector}`
    ).content;
    this._setCardImageListener = setCardImageListener;
  }

  _getTemplate() {
    const cardElement = this._templateSelector
      .querySelector(".list__item")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".list__delete-button")
      .addEventListener("click", () => this._element.remove());
    this._element
      .querySelector(".list__like-button")
      .addEventListener("click", (evt) => this._handleButtonLike(evt));
    this._image.addEventListener("click", (evt) => {
      this._setCardImageListener(evt.target);
    });
  }

  _handleButtonLike(likeButton) {
    likeButton.target.classList.toggle("list__like-button_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".list__image");
    this._setEventListeners();

    this._image.src = this._photoLinkCard;
    this._image.alt = this._textCard;
    this._element.querySelector(".list__title").textContent = this._textCard;

    return this._element;
  }
}
