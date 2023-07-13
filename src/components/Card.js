export class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateSelector,
    handleClickImage,
    { openPopupListener, handleLikeClick },
    profileId
  ) {
    this._photoLinkCard = link;
    this._textCard = name;
    this._likes = likes;
    this._idCard = _id;
    this._ownerId = owner._id;
    this._templateSelector = document.querySelector(templateSelector).content;
    this._handleClickImage = handleClickImage;
    this._openPopupListener = openPopupListener;
    this._handleLikeClick = handleLikeClick;
    this._profileId = profileId;
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
      .addEventListener("click", () =>
        this._openPopupListener(this._idCard, this._element)
      );
    this._buttonLike.addEventListener("click", () => this._handleButtonLike());
    this._image.addEventListener("click", (evt) => {
      this._handleClickImage(evt.target);
    });
  }

  _handleButtonLike() {
    this._buttonLike.classList.toggle("list__like-button_active");
    this._handleLikeClick(this._buttonLike, this._idCard);
  }

  editLikesValue(likes) {
    this._likesContainer.textContent = likes.length;
  }

  _checkYourLike() {
    this._likes.forEach((user) => {
      if (user._id === this._profileId) {
        this._buttonLike.classList.add("list__like-button_active");
      }
    });
  }

  getId() {
    return this._idCard;
  }

  cardRemove() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".list__image");
    this._likesContainer = this._element.querySelector(".list__likes");
    this._buttonLike = this._element.querySelector(".list__like-button");
    this._deleteButton = this._element.querySelector(".list__delete-button");
    this._setEventListeners();
    if (this._profileId === this._ownerId) {
      this._deleteButton.classList.add("list__delete-button_visible");
    }

    this._image.src = this._photoLinkCard;
    this._image.alt = this._textCard;
    this._checkYourLike();
    this._likesContainer.textContent = this._likes.length;
    this._element.querySelector(".list__title").textContent = this._textCard;

    return this._element;
  }
}
