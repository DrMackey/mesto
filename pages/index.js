let container = document.querySelector('.body');
let popup = container.querySelector('.popup');
let profileEditButton = container.querySelector('.profile__edit-button');
let popupButtonClose = container.querySelector('.popup__button-close');
let popupButton = container.querySelector('.popup__button');
let name = container.querySelector('.profile__name');
let subtitle = container.querySelector('.profile__subtitle');
let inputName = container.querySelector('#name');
let inputSubtitle = container.querySelector('#subtitle');

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  inputName.setAttribute('placeholder', name.textContent);
  inputSubtitle.setAttribute('placeholder', subtitle.textContent);
})

popupButton.addEventListener('click', function () {
  let valueInputName = inputName.value;
  let valueInputSubtitle = inputSubtitle.value;
  name.textContent = valueInputName;
  subtitle.textContent = valueInputSubtitle;
  console.log(valueInputName);
  popup.classList.remove('popup_opened');
})

popupButtonClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})
