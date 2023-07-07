export const cardTemplateSelector = "#card-template";
const container = document.querySelector(".body");
export const profileEditButton = container.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = container.querySelector(".profile__add-button");
export const name = ".profile__name";
export const subtitle = ".profile__subtitle";
export const inputName = container.querySelector("#name");
export const inputSubtitle = container.querySelector("#subtitle");
export const containerSelector = ".list";
export const popupsList = Array.from(
  container.querySelectorAll(".popup__input-form")
);
export const popupEdit = ".popup_type_edit";
export const popupNewCard = ".popup_type_new-card";
export const popupImage = ".popup_type_image";
export const popupConfirm = ".popup_type_delete";
export const formValidatorItemList = {};
