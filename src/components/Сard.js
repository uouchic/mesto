export default class Card {
  constructor(
    data,
    templateSelector,
    userId,
    handleCardClick,
    likeCard,
    dislikeCard,
    handleCardcConfirm
  ) {
    this._name = data.name;
    this._link = data.link;

    this._id = data.id;
    this._likes = data.likes;

    this._ownerId = data.ownerId;

    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");

    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;

    this._handleCardcConfirm = handleCardcConfirm;
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
    this._owner();
    this._liked();
    this._likeTotal = this._element.querySelector(".element__like-total");
    this._likeTotal.textContent = `${this._likes.length}`;
    return this._element;
  }

  _setEventListeners() {
    //проверяем лайк и отправлляем запрос на удаление или добавление лайка

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like_active")) {
        this._dislikeCard();
      } else {
        this._likeCard();
      }
    });

    // слушатель открытия попапа с картинкой
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup();
    });

    // слушатель открытия попапа подтверждения удаления
    this._element
      .querySelector(".element__del")
      .addEventListener("click", () => {
        // console.log("Нажал на удаление")
        this._handleCardcConfirm(this);
      });
  }

  //удаление карточки

  removeCard() {
    this._element.remove();
  }

  //Проверяем кому принадлежит карточка и отображаем или удаляем иконку корзинки
  _owner() {
    if (this._userId !== this._ownerId) {
      this._element.querySelector(".element__del").remove();
    }
  }

  //переключатель лайка

  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like_active");
  }

  //проверка лайка

  _liked() {
    if (this._likes.some((user) => user._id === this._userId))
      this._handleLikeClick();
  }

  // кол-во лайков

  getLikesTotal(data) {
    this._likeTotal.textContent = `${data.likes.length}`;
  }

  //открытие попапа с картинкой по клику карточки

  _handleOpenPopup() {
    this._handleCardClick(this._link, this._name);
  }
}
