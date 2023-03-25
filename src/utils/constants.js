const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__adit-button"
);
const profileInput = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const popupContainers = document.querySelectorAll(".popup");

const popupProfile = document.querySelector(".popup_edit-profile");
const buttonCloseEditProfilePopup = document.querySelector(
  ".popup__close_edit-profile"
);
const profileForm = document.querySelector(".popup__form_edit-profile");

const nameInput = document.querySelector(".popup__item_edit-profile_name");
const jobInput = document.querySelector(".popup__item_edit-profile_job");

const popupBtnOpenCard = document.querySelector(".profile__add-button");

const popupCard = document.querySelector(".popup_edit-card");
const popupBtnCloseCard = document.querySelector(".popup__close_edit-card");
const formElementCard = document.querySelector(".popup__form_edit-card");
const nameInputCard = document.querySelector(".popup__item_edit-card_name");
const jobInputCard = document.querySelector(".popup__item_edit-card_job");

const saveProfiledBtn = document.querySelector(".popup__save_edit-profile");
const saveCardBtn = document.querySelector(".popup__save_edit-card");

const popupImg = document.querySelector(".popup_edit-image");
const popupImgAdd = document.querySelector(".popup__images");
const popupImgTitle = document.querySelector(".popup__images-title");
const popupImgClose = document.querySelector(".popup__close_edit-image");

const cardsContainer = document.querySelector(".elements");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__error_active",
};

export {
  profileInput,
  buttonOpenEditProfilePopup,
  profileJob,
  popupContainers,
  popupProfile,
  buttonCloseEditProfilePopup,
  profileForm,
  nameInput,
  jobInput,
  popupBtnOpenCard,
  popupCard,
  popupBtnCloseCard,
  formElementCard,
  nameInputCard,
  jobInputCard,
  saveProfiledBtn,
  saveCardBtn,
  popupImg,
  popupImgAdd,
  popupImgTitle,
  popupImgClose,
  initialCards,
  settings,
  cardsContainer,
};
