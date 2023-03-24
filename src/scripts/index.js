import FormValidator from "./FormValidator.js";
import Card from "./Сard.js";
import UserInfo from "./UserInfo.js";
import Section from "./section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

import '../pages/index.css';

// объявление переменных
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__adit-button"
);
const profileInput = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

// export { profileInput, profileJob };

const popupContainers = document.querySelectorAll(".popup");

const popupProfile = document.querySelector(".popup_edit-profile");
const buttonCloseEditProfilePopup = document.querySelector(
  ".popup__close_edit-profile"
);
const profileForm = document.querySelector(".popup__form_edit-profile");
const nameInput = document.querySelector(".popup__item_edit-profile_name");
const jobInput = document.querySelector(".popup__item_edit-profile_job");

export { nameInput, jobInput };

const popupBtnOpenCard = document.querySelector(".profile__add-button");

const popupCard = document.querySelector(".popup_edit-card");
const popupBtnCloseCard = document.querySelector(".popup__close_edit-card");
const formElementCard = document.querySelector(".popup__form_edit-card");
const nameInputCard = document.querySelector(".popup__item_edit-card_name");
const jobInputCard = document.querySelector(".popup__item_edit-card_job");

const saveProfiledBtn = document.querySelector(".popup__save_edit-profile");
const saveCardBtn = document.querySelector(".popup__save_edit-card");

// пернменные попапа карточки
const popupImg = document.querySelector(".popup_edit-image");
export const popupImgAdd = document.querySelector(".popup__images");
export const popupImgTitle = document.querySelector(".popup__images-title");
const popupImgClose = document.querySelector(".popup__close_edit-image");

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

const formValidators = {};

// Включение валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

const cardsContainer = document.querySelector(".elements");

const userInformation = new UserInfo(profileInput, profileJob);

function fillProfileForm() {
  userInformation.getUserInfo();
}

const cardImagePopup = new PopupWithImage(popupImg, popupImgAdd, popupImgTitle);
cardImagePopup.setEventListeners();

const handleCardClick = (link, name) => {
  cardImagePopup.open(link, name);
};

// функция обнуления попапа карточки
function clearCardForm() {
  nameInputCard.value = "";
  jobInputCard.value = "";
}

const section = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createCard(item.name, item.link);
      section.addItem(card);
    },
  },
  cardsContainer
);
section.renderer();

function createCard(name, link) {
  const card = new Card(
    { name: name, link: link },
    cardsContainer,
    handleCardClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//создаем объект попапа редактирования Профиля экземпляр  класса PopupWithForm

const openEditProfilePopup = new PopupWithForm(
  popupProfile,
  profileForm,
  SubmitFormProfile
);

//слушатель открытие попапа профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  openEditProfilePopup.open();

  userInformation.getUserInfo();

  formValidators["edit-profile"].disableButton();
});

openEditProfilePopup.setEventListeners();

function SubmitFormProfile() {
  userInformation.setUserInfo();
}

//создаем объект попапаформы добавления карточки экземпляр  класса PopupWithForm

const openEditCardPopup = new PopupWithForm(
  popupCard,
  formElementCard,
  SubmitFormCard
);

//слушатель открытие попапа кард
popupBtnOpenCard.addEventListener("click", () => {
  openEditCardPopup.open();

  formValidators["edit-card"].disableButton();
});

openEditCardPopup.setEventListeners();

function SubmitFormCard(inputValues) {
  const card = createCard(inputValues["place"], inputValues["link"]);
  section.addItem(card);
}
