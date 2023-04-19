let container = document.querySelector('.body');
let popup = container.querySelector('.popup');
let profileEditButton = container.querySelector('.profile__edit-button');
let popupButtonClose = container.querySelector('.popup__button-close');
let popupButton = container.querySelector('.popup__button');
let name = container.querySelector('.profile__name');
let subtitle = container.querySelector('.profile__subtitle');
let inputName = container.querySelector('#name');
let inputSubtitle = container.querySelector('#subtitle');
let formElement = container.querySelector('.popup__input-form');

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  inputName.value = name.textContent;
  inputSubtitle.value = subtitle.textContent;
})

function handleFormSubmit (evt) {
    evt.preventDefault();
    name.textContent = inputName.value;
    subtitle.textContent = inputSubtitle.value;
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);

popupButtonClose.addEventListener('click', function () {
  closePopup();
})

function closePopup() {
  popup.classList.remove('popup_opened');
}
