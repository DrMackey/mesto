export class Card {
    constructor(link, text, template, setCardImageListener) {
      this._photoLinkCard = link;
      this._textCard = text;
      this._templateSelector = template;
      this._setCardImageListener = setCardImageListener;
    }
  
    _getTemplate() {
      const cardElement = this._templateSelector.querySelector('.list__item').cloneNode(true);
  
      return cardElement;
    }
  
    _setEventListeners() {
      this._element.querySelector('.list__delete-button').addEventListener('click', () => this._element.remove());
      this._element.querySelector('.list__like-button').addEventListener('click', evt => this._handleButtonLike(evt));
      this._element.querySelector('.list__image').addEventListener('click', evt => {this._setCardImageListener(evt.target)});
    }
  
    _handleButtonLike(likeButton) {
      likeButton.target.classList.toggle('list__like-button_active')
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      this._element.querySelector('.list__image').src = this._photoLinkCard;
      this._element.querySelector('.list__image').alt = this._textCard;
      this._element.querySelector('.list__title').textContent = this._textCard;
  
      return this._element;
    }
  }