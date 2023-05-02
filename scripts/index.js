const container = document.querySelector('.body');
const popup = container.querySelector('.popup');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');
const popupButton = container.querySelector('.popup__button');
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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//клики по кнопкам
profileEditButton.addEventListener('click', function () {
  inputName.value = name.textContent;
  inputSubtitle.value = subtitle.textContent;
  openModal(popupEdit);
})

profileAddButton.addEventListener('click', function () {
  openModal(popupNewCard);
})

const formElementEdit = popupEdit.querySelector('#form');
formElementEdit.addEventListener('submit', handleFormSubmit);

const formElementNewCard = popupNewCard.querySelector('#form-card');
formElementNewCard.addEventListener('submit', handleFormSubmit);

//отправка формы
function handleFormSubmit (evt) {
    evt.preventDefault();
    if (evt.currentTarget.id === "form") {
      name.textContent = inputName.value;
      subtitle.textContent = inputSubtitle.value;
      closePopup(popupEdit);
    } else {
      const inputNamnigValue = inputNaming.value;
      const inputLinkValue = inputLink.value;
      renderCards(inputNamnigValue, inputLinkValue);
      closePopup(popupNewCard);
      inputNaming.value = '';
      inputLink.value = '';
    }

}

//открытие модального окна
function openModal(popupCard) {
  const popupButtonClose = popupCard.querySelector('.popup__button-close');
  popupCard.classList.add('popup_opened');
  popupButtonClose.addEventListener('click', function () {
    closePopup(popupCard);
  });
}

//закрыте модального окна
function closePopup(popupCard) {
    popupCard.classList.remove('popup_opened');
}

//добавление карточки
function renderCards(nameValue, linkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.list__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.list__like-button');
  const removeButton = cardElement.querySelector('.list__delete-button');
  const cardImage = cardElement.querySelector('.list__image');

  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector('.list__title').textContent = nameValue;
  like(likeButton);
  removeCard(removeButton, cardElement);
  openImage(cardImage);

  cardsContainer.prepend(cardElement);
}

//вывод всех карточек
for (let i = 0; i < initialCards.length; i++) {
  const element = initialCards[i];
  const elementName = element.name;
  const elementLink = element.link;

  renderCards(elementName, elementLink);
}

//удаление карточки
function removeCard(buttonRemove, cards) {
  buttonRemove.addEventListener('click', function() {
    cards.remove();
  })
}

//переключение лайка
function like(element) {
  element.addEventListener('click', evt => {
    evt.currentTarget.classList.toggle('list__like-button_active');
  })
}

//нажатие на картинку
function openImage(element) {
  element.addEventListener('click', evt => {
    const imageSrc = evt.currentTarget.src;
    const imageAlt = evt.currentTarget.alt;
    popupImageSrc.src = imageSrc;
    popupImageSrc.alt = imageAlt;
    popupImageCaption.textContent = imageAlt;
    openModal(popupImage);
  })
}