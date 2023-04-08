import FormValidator from "../components/FormValidator.js";
import Card from "../components/Сard.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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
  profileImg,
  profileAvatar,
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
    //data: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      section.addItem(card);
    },
  },
  cardsContainer
);

//section.renderer();

let userId = null;

function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      id: data._id,
      likes: data.likes,
      ownerId: data.owner._id,
    },

    ".card-template",

    userId,

    (link, name) => {
      cardImagePopup.open(link, name);
    },

    () => {
      const apiLike = api.likeCard(data._id);
      apiLike
        .then((data) => {
          card._handleLikeClick();
          card.getLikesTotal(data);
        })
        .catch((err) => console.log(err));
    },

    () => {
      const apiDisiLike = api.dislikeCard(data._id);
      apiDisiLike
        .then((data) => {
          card._handleLikeClick();
          card.getLikesTotal(data);
        })
        .catch((err) => console.log(err));
    },

    (card) => {
      openCardConfirm.open();
      openCardConfirm.setSubmitAction(() => {
        api
          .removeCard(card._id)
          .then(() => {
            card.removeCard();
            openCardConfirm.close();
          })
          .catch((err) => console.log(err));
      });
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//создаем объект попапа редактирования Профиля экземпляр  класса PopupWithForm

const openEditProfilePopup = new PopupWithForm(
  ".popup_edit-profile",
  (inputValues) => {
    openEditProfilePopup.sabmitBtnSave();
    api
      .setUserInfo({ name: inputValues.name, job: inputValues.job })
      .then((date) => {
        userInformation.setUserInfo(date.name, date.about);
        openEditProfilePopup.sabmitBtnSaveComplite();
      })
      .catch((err) => console.log(err));
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
    openEditCardPopup.sabmitBtnSave();
    const apiAddNewCard = api
      .addNewCard({
        name: inputValues.place,
        link: inputValues.link,
      })
      .then((date) => {
        const card = createCard(date);
        section.addItem(card);
        openEditCardPopup.sabmitBtnSaveComplite();
      })
      .catch((err) => console.log(err));
  }
);

//слушатель открытие попапа кард
popupBtnOpenCard.addEventListener("click", () => {
  openEditCardPopup.open();

  formValidators["edit-card"].disableButton();
});

openEditCardPopup.setEventListeners();

//создаем экзнмпляр класса Апи

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",

  headers: {
    authorization: "7d974a4e-6a95-4199-8636-ff5f16b56f31",
    "content-type": "application/json",
  },
});


//рендерим карточки из апи

const cardsApi = api.getInitialCards();

cardsApi
  .then((data) => {
    const section = new Section(
      {
        data: data,
        renderer: (data) => {
          const card = createCard(data);
          section.addItem(card);
        },
      },
      cardsContainer
    );
    section.renderer();
  })
  .catch((err) => console.log(err));

  //обновляем данные пользователя из апи

const userInfoApi = api.getUserInfo();
userInfoApi
  .then((user) => {
    userId = user._id;
    profileInput.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;
  })
  .catch((err) => console.log(err));

//обновляем аватар из апи

const avatarPopup = new PopupWithForm(".popup_edit-avatar", (inputValues) => {
  avatarPopup.sabmitBtnSave();
  api
    .updateAvatar({ avatar: inputValues.avatar })
    .then((date) => {
      profileAvatar.src = date.avatar;
      avatarPopup.sabmitBtnSaveComplite();
    })
    .catch((err) => console.log(err));
});
avatarPopup.setEventListeners();

//слушатель открытия попапа обновления аватара

profileImg.addEventListener("click", () => {
  avatarPopup.open();
  formValidators["edit-avatar"].disableButton();
});

//создаем экземпляр класса попапа подтверждения удаления

const openCardConfirm = new PopupWithConfirm(".popup_confirm");
openCardConfirm.setEventListeners();
