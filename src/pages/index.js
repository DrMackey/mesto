import "./index.css";

import * as constants from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
// import { initialCards } from "../utils/cards.js";
import { configFormSelectors } from "../utils/validate.js";
import { Api } from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-70",
  headers: {
    authorization: "ce17d6b4-1913-45c3-a0e7-cd331bad7135",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((data) => {
  standartCardList.renderItems(data);
});

const popupWithConfirmation = new PopupWithForm(
  {
    handleFormSubmit: (idCard) => {
      api.deleteCard(idCard);
      popupWithConfirmation.close();
    },
  },
  constants.popupConfirm
);

const userInfo = new UserInfo(constants.name, constants.subtitle);
const popupImageClass = new PopupWithImage(constants.popupImage);

const standartCardList = new Section(
  {
    renderer: (cardData) => {
      standartCardList.addItem(createCard(cardData));
    },
  },
  constants.containerSelector
);

function createCard(cardData) {
  const card = new Card(
    cardData,
    constants.cardTemplateSelector,
    handleCardClick,
    {
      openPopupListener: () => {
        popupWithConfirmation.open();
      },
    }
  );
  const cardElement = card.generateCard();

  return cardElement;
}

const popupWithProfile = new PopupWithForm(
  {
    handleFormSubmit: (items) => {
      userInfo.setUserInfo(items);
      api.patchUserInfo(items);
      popupWithProfile.close();
    },
  },
  constants.popupEdit
);

const popupWithCard = new PopupWithForm(
  {
    handleFormSubmit: (cardData) => {
      standartCardList.addItem(createCard(cardData));
      api.postCreateCard(cardData);
      popupWithCard.close();
    },
  },
  constants.popupNewCard
);

constants.popupsList.forEach((formElement) => {
  const formValidator = new FormValidator(configFormSelectors, formElement);

  formValidator.enableValidation();
  constants.formValidatorItemList[formElement.closest(".popup").id] =
    formValidator;
});

function handleCardClick(cardPhoto) {
  popupImageClass.open(cardPhoto);
}

constants.profileEditButton.addEventListener("click", function () {
  const userInfoInputs = userInfo.getUserInfo();

  constants.inputName.value = userInfoInputs.name;
  constants.inputSubtitle.value = userInfoInputs.caption;

  constants.formValidatorItemList["popup_type_edit"].resetValidation();
  popupWithProfile.open();
});

constants.profileAddButton.addEventListener("click", function () {
  constants.formValidatorItemList["popup_type_new-card"].resetValidation();
  popupWithCard.open();
});

popupWithCard.setEventListeners();
popupWithProfile.setEventListeners();
popupImageClass.setEventListeners();
popupWithConfirmation.setEventListeners();

api.getProfileData().then((result) => {
  document.querySelector(".profile__avatar").src = result.avatar;
  document.querySelector(constants.name).textContent = result.name;
  document.querySelector(constants.subtitle).textContent = result.about;
});
