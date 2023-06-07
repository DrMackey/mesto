import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const cardTemplateSelector = '#card-template';
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
const popupsList = Array.from(container.querySelectorAll('.popup__input-form'));
const popupEdit = container.querySelector('.popup_type_edit');
const popupNewCard = container.querySelector('.popup_type_new-card');
const popupImage = container.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupButtonCloseList = container.querySelectorAll('.popup__button-close');
const formElementEdit = popupEdit.querySelector('#form');
const formElementNewCard = popupNewCard.querySelector('#form-card');
const popups = Array.from(container.querySelectorAll('.popup'));
const formValidatorItemList = {};

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
  const subButton = evt.target.querySelector('.popup__button');
  evt.preventDefault();
  const inputNamnigValue = inputNaming.value;
  const inputLinkValue = inputLink.value;
  const callBackCard = createCard(inputLinkValue, inputNamnigValue);
  cardsContainer.prepend(callBackCard);
  closePopup(popupNewCard);
  formElementNewCard.reset();
  formValidatorItemList['popup_type_new-card'].toggleButtonState(subButton);
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

//открытие/закрытие модального окна
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleCloseByEsc);
}

//вывод всех карточек
for (let i = 0; i < initialCards.length; i++) {
  const element = initialCards[i];
  const elementName = element.name;
  const elementLink = element.link;
  const callBackCard = createCard(elementLink, elementName);
  cardsContainer.prepend(callBackCard);
}

// вешаем экзепляр класса на каждую форму
popupsList.forEach(formElement => {
  const formValidator = new FormValidator(configFormSelectors, formElement);
  formValidator.enableValidation();
  formValidatorItemList[formElement.parentElement.parentElement.id] = formValidator;
});

// нажатие на картинку
function setCardImageListener(cardPhoto) {
  const imageSrc = cardPhoto.src;
  const imageAlt = cardPhoto.alt;
  popupImageSrc.src = imageSrc;
  popupImageSrc.alt = imageAlt;
  popupImageCaption.textContent = imageAlt;
  openModal(popupImage);
}

function createCard(elementLink, elementName) {
  const card = new Card(elementLink, elementName, cardTemplateSelector, setCardImageListener)
  const cardElement = card.generateCard();
  return cardElement;
}

//устанавливаем слушатель клика на все модальные окна
popups.forEach((popup) => {
  popup.addEventListener('click', handleCloseByOverlay)
})

//клики по кнопкам
profileEditButton.addEventListener('click', function () {
  const inputList = Array.from(popupEdit.querySelectorAll(configFormSelectors.inputSelector));

  inputName.value = name.textContent;
  inputSubtitle.value = subtitle.textContent;
  inputList.forEach((inputElement) => {
    formValidatorItemList['popup_type_edit'].isValid(inputElement);
  });
  openModal(popupEdit);
})

profileAddButton.addEventListener('click', function () {
  openModal(popupNewCard);
})

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementNewCard.addEventListener('submit', handleFormSubmitNewCard);
