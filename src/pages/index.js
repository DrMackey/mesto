import "./index.css";

import * as constants from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { configFormSelectors } from "../utils/validate.js";
import { Api } from "../components/Api.js";
let ownerId;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-70",
  headers: {
    authorization: "ce17d6b4-1913-45c3-a0e7-cd331bad7135",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(constants.name, constants.subtitle);
const popupImageClass = new PopupWithImage(constants.popupImage);

Promise.all([api.getProfileData(), api.getInitialCards()])
  .then((values) => {
    const valuesUserData = values[0];
    const valuesCardList = values[1];

    userInfo.setUserInfo(valuesUserData);
    ownerId = valuesUserData._id;

    standartCardList.renderItems(valuesCardList);
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithConfirmation = new PopupWithForm(
  {
    handleFormSubmit: (cardId) => {
      api
        .deleteCard(cardId)
        .then(() => {
          constants.cardItemList[cardId].cardRemove();
          popupWithConfirmation.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  constants.popupConfirm
);

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
      openPopupListener: (cardId, element) => {
        popupWithConfirmation.open(cardId, element);
      },
      handleLikeClick: (buttonLikeElement, cardId) => {
        if (buttonLikeElement.classList.contains("list__like-button_active")) {
          api
            .putLike(cardId)
            .then((data) => {
              card.editLikesValue(data.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .deleteLike(cardId)
            .then((data) => {
              card.editLikesValue(data.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    ownerId
  );
  constants.cardItemList[card.getId()] = card;
  const cardElement = card.generateCard();

  return cardElement;
}

const popupWithProfile = new PopupWithForm(
  {
    handleFormSubmit: (items) => {
      popupWithProfile.handleStateButtonLoading();
      api
        .patchUserInfo(items)
        .then((data) => {
          userInfo.setUserInfo(data);
          popupWithProfile.close();
          popupWithProfile.handleStateButtonDone();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  constants.popupEdit
);

const popupWithUpdateAvatar = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupWithUpdateAvatar.handleStateButtonLoading();
      api
        .updateAvatar(data.link)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupWithUpdateAvatar.close();
          popupWithUpdateAvatar.handleStateButtonDone();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  constants.popupUpdateAvatar
);

const popupWithCard = new PopupWithForm(
  {
    handleFormSubmit: (cardData) => {
      popupWithCard.handleStateButtonLoading();
      api
        .postCreateCard(cardData)
        .then((data) => {
          standartCardList.addItem(createCard(data));
          popupWithCard.close();
          popupWithCard.handleStateButtonDone();
        })
        .catch((err) => {
          console.log(err);
        });
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

constants.profileAvatar.addEventListener("click", function () {
  constants.formValidatorItemList["popup_type_update-avatar"].resetValidation();
  popupWithUpdateAvatar.open();
});

popupWithCard.setEventListeners();
popupWithProfile.setEventListeners();
popupImageClass.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithUpdateAvatar.setEventListeners();
