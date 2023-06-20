import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';

const cardTemplateSelector = '#card-template';
const container = document.querySelector('.body');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');
const name = container.querySelector('.profile__name');
const subtitle = container.querySelector('.profile__subtitle');
const inputName = container.querySelector('#name');
const inputSubtitle = container.querySelector('#subtitle');
const containerSelector = '.list';
const popupsList = Array.from(container.querySelectorAll('.popup__input-form'));
const popupEdit = container.querySelector('.popup_type_edit');
const popupNewCard = container.querySelector('.popup_type_new-card');
const popupImage = container.querySelector('.popup_type_image');
const formValidatorItemList = {};
const popupClass = new Popup(popupEdit);
const userInfo = new UserInfo(name, subtitle);

const standartCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, handleCardClick)
    const cardElement = card.generateCard();

    return cardElement;
  }
}, containerSelector);

const popupWithProfile = new PopupWithForm({
  handleFormSubmit: (items) => {
    userInfo.setUserInfo(items);
}}, popupEdit);

const popupWithCard = new PopupWithForm({
  handleFormSubmit: (items) => {
    standartCardList.addItem(items);
}}, popupNewCard);

popupsList.forEach(formElement => {
  const formValidator = new FormValidator(configFormSelectors, formElement);

  formValidator.enableValidation();
  formValidatorItemList[formElement.parentElement.parentElement.id] = formValidator;
});

function handleCardClick(cardPhoto) {
  const popupImageClass = new PopupWithImage(cardPhoto, popupImage);

  popupImageClass.open();
}

profileEditButton.addEventListener('click', function () {
  const inputList = Array.from(popupEdit.querySelectorAll(configFormSelectors.inputSelector));
  
  popupWithProfile.setEventListeners();
  inputName.value = userInfo.getUserInfo().name;
  inputSubtitle.value = userInfo.getUserInfo().caption;
  inputList.forEach((inputElement) => {
    formValidatorItemList['popup_type_edit'].isValid(inputElement);
  });
  popupClass.open();
})

profileAddButton.addEventListener('click', function () {
  const popupClass = new Popup(popupNewCard);

  popupWithCard.setEventListeners();
  formValidatorItemList['popup_type_new-card'].toggleButtonState();
  popupClass.open();
})

standartCardList.render();