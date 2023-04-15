let container = document.querySelector('.body');
let popup = container.querySelector('.popup');
let profileEditButton = container.querySelector('.profile__edit-button');
let popupButtonClose = container.querySelector('.popup__button-close');
let popupButton = container.querySelector('.popup__button');
let name = container.querySelector('.profile__name');
let subtitle = container.querySelector('.profile__subtitle');
let inputName = container.querySelector('#name');
let inputSubtitle = container.querySelector('#subtitle');
let likeButton = container.querySelectorAll('.list__like-button');
let formElement = container.querySelector('.popup__input-wrapper');

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  inputName.setAttribute('value', name.textContent);
  inputSubtitle.setAttribute('value', subtitle.textContent);
})

popupButton.addEventListener('click', function () {
  let valueInputName = inputName.value;
  let valueInputSubtitle = inputSubtitle.value;
  name.textContent = valueInputName;
  subtitle.textContent = valueInputSubtitle;
  popup.classList.remove('popup_opened');
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    let valueInputName = inputName.value;
    let valueInputSubtitle = inputSubtitle.value;
    name.textContent = valueInputName;
    subtitle.textContent = valueInputSubtitle;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);

popupButtonClose.addEventListener('click', function () {
  inputName.value = name.textContent;
  inputSubtitle.value = subtitle.textContent;
  popup.classList.remove('popup_opened');
})

for (let i = 0; i < likeButton.length; i++) {
  const element = likeButton[i];
  element.addEventListener('click', function () {
    element.classList.toggle('list__like-button_active');
  })

}

