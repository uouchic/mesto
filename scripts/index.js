let popupBtnOpen = document.querySelector(".profile__adit-button");
let profileInput = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");

let popupContainer = document.querySelector(".popup_edit-profile");
let popupBtnClose = document.querySelector(".popup__close_edit-profile");
let formElement = document.querySelector(".popup__form_edit-profile");
let nameInput = document.querySelector(".popup__item_edit-profile_name");
let jobInput = document.querySelector(".popup__item_edit-profile_job");

popupBtnOpen.addEventListener("click", openPopup);

function openPopup() {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profileInput.textContent;
  jobInput.value = profileJob.textContent;
}

popupBtnClose.addEventListener("click", closePopup);

function closePopup() {
  popupContainer.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileInput.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);

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

const template = document
  .querySelector(".card-template")
  .content.querySelector(".element");
const elements = document.querySelector(".elements");

renderCards();

function renderCards() {
  initialCards.forEach(function (item) {
    const card = template.cloneNode(true);
    card.querySelector(".element__title").textContent = item.name;
    card.querySelector(".element__image").src = item.link;
    card.querySelector(".element__image").alt = item.name;

    card.querySelector(".element__del").addEventListener("click", () => {
      card.remove();
    });

    card.querySelector(".element__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like_active");
    });

    card.querySelector(".element__image").addEventListener("click", () => {
      popupContainerImg.classList.add("popup_opened");
      popupContainerImgAdd.src = item.link;
      popupContainerImgAdd.alt = item.name;
      popupContainerImgTitle.textContent = item.name;
    });

    elements.append(card);
  });
}

let popupBtnOpenCard = document.querySelector(".profile__add-button");

let popupContainerCard = document.querySelector(".popup_edit-card");
let popupBtnCloseCard = document.querySelector(".popup__close_edit-card");
let formElementCard = document.querySelector(".popup__form_edit-card");
let nameInputCard = document.querySelector(".popup__item_edit-card_name");
let jobInputCard = document.querySelector(".popup__item_edit-card_job");

let popupContainerImg = document.querySelector(".popup_edit-image");
let popupContainerImgAdd = document.querySelector(".popup__images");
let popupContainerImgTitle = document.querySelector(".popup__images-title");
let popupContainerImgClose = document.querySelector(".popup__close_edit-image");

popupBtnOpenCard.addEventListener("click", openPopupCard);

function openPopupCard() {
  popupContainerCard.classList.add("popup_opened");
}

popupBtnCloseCard.addEventListener("click", closePopupCard);

function closePopupCard() {
  popupContainerCard.classList.remove("popup_opened");
}

formElementCard.addEventListener("submit", handleFormSubmitCard);

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const title = nameInputCard.value;
  const link = jobInputCard.value;

  const card = template.cloneNode(true);
  card.querySelector(".element__title").textContent = title;
  card.querySelector(".element__image").src = link;
  card.querySelector(".element__image").alt = title;

  elements.prepend(card);

  closePopupCard();

  card.querySelector(".element__del").addEventListener("click", () => {
    card.remove();
  });

  card.querySelector(".element__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like_active");
  });

  card.querySelector(".element__image").addEventListener("click", () => {
    popupContainerImg.classList.add("popup_opened");
    popupContainerImgAdd.src = link;
    popupContainerImgTitle.textContent = title;
  });
}

popupContainerImgClose.addEventListener("click", closePopupImg);

function closePopupImg() {
  popupContainerImg.classList.remove("popup_opened");
}
