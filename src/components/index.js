import "../pages/index.css";

import * as constants from "../utils/constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { initialCards } from "../utils/cards.js";
import { configFormSelectors } from "../utils/validate.js";

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
    handleCardClick
  );
  const cardElement = card.generateCard();

  return cardElement;
}

const popupWithProfile = new PopupWithForm(
  {
    handleFormSubmit: (items) => {
      userInfo.setUserInfo(items);
      popupWithProfile.close();
    },
  },
  constants.popupEdit
);

const popupWithCard = new PopupWithForm(
  {
    handleFormSubmit: (cardData) => {
      standartCardList.addItem(createCard(cardData));
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
  popupWithProfile.setEventListeners();

  constants.inputName.value = userInfoInputs.name;
  constants.inputSubtitle.value = userInfoInputs.caption;

  constants.formValidatorItemList["popup_type_edit"].resetValidation();
  popupWithProfile.open();
});

constants.profileAddButton.addEventListener("click", function () {
  popupWithCard.setEventListeners();
  constants.formValidatorItemList["popup_type_new-card"].resetValidation();
  popupWithCard.open();
});

standartCardList.renderItems(initialCards);
