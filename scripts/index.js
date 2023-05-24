const cardTemplate = document.querySelector('#card-template').content;
const container = document.querySelector('.body');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');
const name = container.querySelector('.profile__name');
const subtitle = container.querySelector('.profile__subtitle');
const inputName = container.querySelector('#name');
const inputSubtitle = container.querySelector('#subtitle');
const inputNaming = container.querySelector('#naming');
const inputLink = container.querySelector('#link');
const cardsContainer = container.querySelector('.list');
const popupEdit = container.querySelector('.popup_type_edit');
const popupNewCard = container.querySelector('.popup_type_new-card');
const popupImage = container.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupButtonCloseList = container.querySelectorAll('.popup__button-close');
const formElementEdit = popupEdit.querySelector('#form');
const formElementNewCard = popupNewCard.querySelector('#form-card');
const inputPopupEditList = [inputName, inputSubtitle];
const spanPopupEditList = Array.from(popupEdit.querySelectorAll('.popup__input-error'));
const inputPopupNewCardList = [inputNaming, inputLink];
const spanPopupNewCardList = Array.from(popupNewCard.querySelectorAll('.popup__input-error'));
const popupButtonEdit = formElementEdit.querySelector('.popup__button');
const popupButtonNewCard = formElementNewCard.querySelector('.popup__button');
const popups = Array.from(container.querySelectorAll('.popup'));
const configFormSelectorsMini = {
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//клики по крестикам
popupButtonCloseList.forEach((button) => { button.addEventListener('click', function() {
    const popupOpened = button.closest('.popup_opened');
    closePopup(popupOpened);
  });
});

//отправка форм
function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  subtitle.textContent = inputSubtitle.value;
  closePopup(popupEdit);
}

function handleFormSubmitNewCard (evt) {
  evt.preventDefault();
  const inputNamnigValue = inputNaming.value;
  const inputLinkValue = inputLink.value;
  renderCard(inputNamnigValue, inputLinkValue);
  closePopup(popupNewCard);
  formElementNewCard.reset();
}

//проверяем нажатие esc
function handleCloseByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

//проверяем клик на оверлее
function handleCloseByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//открытие модального окна
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc);
}

//закрыте модального окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleCloseByEsc);
}

//формирование карточки
function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.list__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.list__like-button');
  const removeButton = cardElement.querySelector('.list__delete-button');
  const cardImage = cardElement.querySelector('.list__image');

  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector('.list__title').textContent = nameValue;
  setLikeButtonListener(likeButton);
  setButtonRemoveListener(removeButton, cardElement);
  setCardImageListener(cardImage);

  return cardElement;
}

//добавление карточки
function renderCard(elementName, elementLink) {
  const cardTemplate = createCard(elementName, elementLink);
  cardsContainer.prepend(cardTemplate);
}

//вывод всех карточек
for (let i = 0; i < initialCards.length; i++) {
  const element = initialCards[i];
  const elementName = element.name;
  const elementLink = element.link;

  renderCard(elementName, elementLink);

}

//удаление карточки
function setButtonRemoveListener(buttonRemove, cards) {
  buttonRemove.addEventListener('click', function() {
    cards.remove();
  })
}

//переключение лайка
function setLikeButtonListener(element) {
  element.addEventListener('click', evt => {
    evt.currentTarget.classList.toggle('list__like-button_active');
  })
}

//нажатие на картинку
function setCardImageListener(element) {
  element.addEventListener('click', evt => {
    const imageSrc = evt.currentTarget.src;
    const imageAlt = evt.currentTarget.alt;
    popupImageSrc.src = imageSrc;
    popupImageSrc.alt = imageAlt;
    popupImageCaption.textContent = imageAlt;
    openModal(popupImage);
  })
}

//устанавливаем слушатель клика на все модальные окна
popups.forEach((popup) => {
  popup.addEventListener('click', handleCloseByOverlay)
})

//клики по кнопкам
profileEditButton.addEventListener('click', function () {
  inputName.value = name.textContent;
  inputSubtitle.value = subtitle.textContent;
  toggleButtonState(inputPopupEditList, popupButtonEdit, configFormSelectorsMini);
  hideInputError(formElementEdit, inputName, configFormSelectorsMini);
  hideInputError(formElementEdit, inputSubtitle, configFormSelectorsMini);
  openModal(popupEdit);
})

profileAddButton.addEventListener('click', function () {
  toggleButtonState(inputPopupNewCardList, popupButtonNewCard, configFormSelectorsMini);
  hideInputError(formElementNewCard, inputNaming, configFormSelectorsMini);
  hideInputError(formElementNewCard, inputLink, configFormSelectorsMini);
  openModal(popupNewCard);
})

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementNewCard.addEventListener('submit', handleFormSubmitNewCard);
