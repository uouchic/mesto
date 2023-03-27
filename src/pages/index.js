import FormValidator from "../components/FormValidator.js";
import Card from "../components/Сard.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
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
} from "../utils/constants.js";

import "./index.css";

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

const userInformation = new UserInfo(".profile__title", ".profile__subtitle");

const cardImagePopup = new PopupWithImage(
  ".popup_edit-image",
  popupImgAdd,
  popupImgTitle
);
cardImagePopup.setEventListeners();

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
    ".card-template",
    (link, name) => {
      cardImagePopup.open(link, name);
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//создаем объект попапа редактирования Профиля экземпляр  класса PopupWithForm

const openEditProfilePopup = new PopupWithForm(
  ".popup_edit-profile",
  (inputValues) => {
    userInformation.setUserInfo(inputValues["name"], inputValues["job"]);
  }
);

//слушатель открытие попапа профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  openEditProfilePopup.open();
  const userData = userInformation.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
  formValidators["edit-profile"].disableButton();
});

openEditProfilePopup.setEventListeners();

//создаем объект попапаформы добавления карточки экземпляр  класса PopupWithForm

const openEditCardPopup = new PopupWithForm(
  ".popup_edit-card",
  (inputValues) => {
    const card = createCard(inputValues["place"], inputValues["link"]);
    section.addItem(card);
  }
);

//слушатель открытие попапа кард
popupBtnOpenCard.addEventListener("click", () => {
  openEditCardPopup.open();

  formValidators["edit-card"].disableButton();
});

openEditCardPopup.setEventListeners();
