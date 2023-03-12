import FormValidator from "./FormValidator.js";
import Card from "./Сard.js";

// объявление переменных
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
export { popupImg };

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

const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".element");
const cardsContainer = document.querySelector(".elements");

//функция добавления данных из профиля в форму профиля
function fillProfileForm() {
  nameInput.value = profileInput.textContent;
  jobInput.value = profileJob.textContent;
}

// функция обнуления попапа карточки
function clearCardForm() {
  nameInputCard.value = "";
  jobInputCard.value = "";
}

//функция открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

//функция закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// функция сохранние профиля из попапа
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInput.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function getCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();
  return cardElement;
}

// ФУНКЦИЯ создания карточки, удаления, лайка, открытие попапа картинки

function creatCard(item) {
  const card = getCard(item);
  cardsContainer.prepend(card);
}

// ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ
function handleProfileFormSubmitCard(evt) {
  evt.preventDefault();
  const title = nameInputCard.value;
  const link = jobInputCard.value;
  creatCard({ name: title, link: link });
  closePopup(popupCard);
}

//слушатель открытие попапа профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  fillProfileForm();
  openPopup(popupProfile);
  formValidators["edit-profile"].disableButton();
});

//слушатель закрытие попапа профиля
buttonCloseEditProfilePopup.addEventListener("click", () => {
  closePopup(popupProfile);
});

//слушатель кнопка сохранить в попапе профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

// слуштель открытие попапа добавления карточки
popupBtnOpenCard.addEventListener("click", () => {
  clearCardForm();
  openPopup(popupCard);
  formValidators["edit-card"].disableButton();
});

// слушатель закрытие попапа добавления карточки
popupBtnCloseCard.addEventListener("click", () => {
  closePopup(popupCard);
});

// слушатель кнопка сохранить формы добавления карточки
formElementCard.addEventListener("submit", handleProfileFormSubmitCard);

// слушатель закрытие попапа с картинкой
popupImgClose.addEventListener("click", () => {
  closePopup(popupImg);
});

// слушатель закрытия попапа по темной области
// каждому попапу навешиваем слушатль

popupContainers.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closePopup(item);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

initialCards.forEach(creatCard);
