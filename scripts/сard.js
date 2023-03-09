export default class Card {
  constructor(initialCards, templateSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
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
    this._element = this._getTemplate();

    this._setEventListeners();

    // Добавим данные
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    // слушатель лайка
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    // слушатель открытия попапа с картинкой
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });

    //слушатель удаления карточки
    this._element
      .querySelector(".element__del")
      .addEventListener("click", () => {
        this._element.remove();
      });

    // слушатель закрытия попаа с картинкой по клику кнопеи закрытия
    document
      .querySelector(".popup__close_edit-image")
      .addEventListener("click", () => {
        this._handleClosePopup();
      });
  }

  _handleLikeClick() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _handleOpenPopup() {
    document.querySelector(".popup_edit-image").classList.add("popup_opened");
    document.querySelector(".popup__images").src = this._link;
    document.querySelector(".popup__images").alt = this._name;
    document.querySelector(".popup__images-title").textContent = this._name;
    //слушатель закрытия попапа по кнопке ESC
    document.addEventListener("keydown", (evt) => {
      // закройте попап
      this._closeByEscape(evt);
    });
  }

  _handleClosePopup() {
    document.querySelector(".popup_edit-image").src = "";
    document
      .querySelector(".popup_edit-image")
      .classList.remove("popup_opened");
    //слушатель закрытия попапа по кнопке ESC
    document.removeEventListener("keydown", (evt) => {
      // закройте попап
      this._closeByEscape(evt);
    });
  }

  _closeByEscape(evt) {
    if (evt.key === "Escape") {
      this._handleClosePopup();
    }
  }
}
