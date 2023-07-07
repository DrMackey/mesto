export class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateSelector,
    handleClickImage,
    { openPopupListener }
  ) {
    this._photoLinkCard = link;
    this._textCard = name;
    this._likes = likes;
    this._idCard = _id;
    this._ownerId = owner._id;
    this._templateSelector = document.querySelector(templateSelector).content;
    this._handleClickImage = handleClickImage;
    this._openPopupListener = openPopupListener;
  }

  _getTemplate() {
    const cardElement = this._templateSelector
      .querySelector(".list__item")
      .cloneNode(true);

    return cardElement;
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".list__delete-button")
      .addEventListener("click", () => this._openPopupListener());
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
    this._likesContainer = this._element.querySelector(".list__likes");
    this._buttonLike = this._element.querySelector(".list__like-button");
    this._setEventListeners();

    this._image.src = this._photoLinkCard;
    this._image.alt = this._textCard;
    this._likesContainer.textContent = this._likes.length;
    this._element.querySelector(".list__title").textContent = this._textCard;
    console.log(this._ownerId);

    return this._element;
  }
}
