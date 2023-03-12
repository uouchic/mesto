//const popupImg = document.querySelector(".popup_edit-image");
const popupImgAdd = document.querySelector(".popup__images");
const popupImgTitle = document.querySelector(".popup__images-title");

import { openPopup } from "./index.js";
import { popupImg } from "./index.js";
export default class Card {
  constructor(initialCards, templateSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardTemplate;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.

    this._setEventListeners();

    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    // слушатель лайка
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    // слушатель открытия попапа с картинкой
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup();
    });

    //слушатель удаления карточки
    this._element
      .querySelector(".element__del")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like_active");
  }

  _handleOpenPopup() {
    openPopup(popupImg);

    popupImgAdd.src = this._link;
    popupImgAdd.alt = this._name;
    popupImgTitle.textContent = this._name;
  }
}
