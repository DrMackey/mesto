const cardTemplateSelector = "#card-template";
const container = document.querySelector(".body");
const profileEditButton = container.querySelector(".profile__edit-button");
const profileAddButton = container.querySelector(".profile__add-button");
const name = container.querySelector(".profile__name");
const subtitle = container.querySelector(".profile__subtitle");
const inputName = container.querySelector("#name");
const inputSubtitle = container.querySelector("#subtitle");
const containerSelector = ".list";
const popupsList = Array.from(container.querySelectorAll(".popup__input-form"));
const popupEdit = container.querySelector(".popup_type_edit");
const popupNewCard = container.querySelector(".popup_type_new-card");
const popupImage = container.querySelector(".popup_type_image");
const formValidatorItemList = {};