export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

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

  //переключатель лайка

  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like_active");
  }

  //открытие попапа с картинкой по клику карточки

  _handleOpenPopup() {
    this._handleCardClick(this._link, this._name);
  }
}
