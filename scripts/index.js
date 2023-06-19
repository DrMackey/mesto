import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup, PopupWithImage} from './Popup.js';
// import {PopupWithImage} from './PopupWithImage.js';

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
const containerSelector = '.list';
const popupsList = Array.from(container.querySelectorAll('.popup__input-form'));
const popupEdit = container.querySelector('.popup_type_edit');
const popupNewCard = container.querySelector('.popup_type_new-card');
const popupImage = container.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupButtonCloseSelector = '.popup__button-close';
const formElementEdit = popupEdit.querySelector('#form');
const formElementNewCard = popupNewCard.querySelector('#form-card');
const popups = Array.from(container.querySelectorAll('.popup'));
const formValidatorItemList = {};

//клики по крестикам


//отправка форм
function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  subtitle.textContent = inputSubtitle.value;
  closePopup(popupEdit);
}

function handleFormSubmitNewCard (evt) {
  evt.preventDefault();
  const itemsObj = {
    link: inputLink.value,
    name: inputNaming.value
  }
  standartCardList.addItem(itemsObj);
  closePopup(popupNewCard);
  formElementNewCard.reset();
  formValidatorItemList['popup_type_new-card'].toggleButtonState();
}

//проверяем нажатие esc
// function handleCloseByEsc(evt) {
  
// }

//проверяем клик на оверлее
function handleCloseByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//открытие/закрытие модального окна
// function openModal(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleCloseByEsc);
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', handleCloseByEsc);
// }

//вывод всех карточек
// for (let i = 0; i < initialCards.length; i++) {
//   const element = initialCards[i];
//   const elementName = element.name;
//   const elementLink = element.link;
//   const callBackCard = createCard(elementLink, elementName);
//   cardsContainer.prepend(callBackCard);
// }

// вешаем экзепляр класса на каждую форму
popupsList.forEach(formElement => {
  const formValidator = new FormValidator(configFormSelectors, formElement);
  formValidator.enableValidation();
  formValidatorItemList[formElement.parentElement.parentElement.id] = formValidator;
});

// нажатие на картинку
function setCardImageListener(cardPhoto) {
  
  // console.log(cardPhoto);
  const popupImage = new PopupWithImage(cardPhoto);
  popupImage.open();
  popupImageSrc.src = imageSrc;
  popupImageSrc.alt = imageAlt;
  popupImageCaption.textContent = imageAlt;
  // openModal(popupImage);
}

const standartCardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card(item, cardTemplateSelector, setCardImageListener)
      const cardElement = card.generateCard();

      return cardElement;
  }
}, containerSelector);

standartCardList.render();



//устанавливаем слушатель клика на все модальные окна
// popups.forEach((popup) => {
//   popup.addEventListener('click', handleCloseByOverlay)
// })

//клики по кнопкам
profileEditButton.addEventListener('click', function () {
  const popupClass = new Popup(popupEdit);
  const inputList = Array.from(popupEdit.querySelectorAll(configFormSelectors.inputSelector));

  inputName.value = name.textContent;
  inputSubtitle.value = subtitle.textContent;
  inputList.forEach((inputElement) => {
    formValidatorItemList['popup_type_edit'].isValid(inputElement);
  });

  popupClass.open();
  // popupClass.setEventListeners()
})

profileAddButton.addEventListener('click', function () {
  const popupClass = new Popup(popupEdit);

  popupClass.open();
})

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementNewCard.addEventListener('submit', handleFormSubmitNewCard);

