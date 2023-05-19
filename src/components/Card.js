import {api, popupDeleteCard, popupZoom} from "../pages";

export default class Card {
  constructor(data, userId, selector) {
    this._id = data._id;
    this.name = data.name;
    this.link = data.link;
    this._likes = data.likes;
    this._cardOwner = data.owner._id;
    this._userId = userId;
    this._cardElement = selector.querySelector('.card').cloneNode(true);
    this._image = this._cardElement.querySelector('.card__image');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._likeButton = this._cardElement.querySelector('.card__like');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');
  }

  // Ручка зума
  _handleZoomCardImage() {
    popupZoom.open(this.link, this.name);
  }

  // Ручка лайков
  _handlerLikes() {
    {
      if (this._likeButton.classList.contains("card__like_active")) {
        api.deleteLike(this._id)
          .then(res => {
            this._likeButton.classList.remove('card__like_active');
            this._likeCounter.textContent = res.likes.length;
          })
          .catch(err => console.log(err))
      } else {
        api.addLike(this._id)
          .then(res => {
            this._likeButton.classList.add('card__like_active');
            this._likeCounter.textContent = res.likes.length;
          })
          .catch(err => console.log(err))
      }
    }
  }

  // Ручка удаления карточки
  _handleDeleteCard() {
    api.deleteCard(this._id)
      .then(() => {
        popupDeleteCard.close();
        this._cardElement.remove();
      })
      .catch(err => console.log(err))
  }

  _setEventListeners() {
    // Вызов зума
    this._image.addEventListener('click', () => this._handleZoomCardImage());

    // Обработка лайков
    this._likeButton.addEventListener('click', () => this._handlerLikes());

    // Обработчик удаления
    // modalDeleteCard.addEventListener('submit', this._handleDeleteCard);
  }

  render() {
    this._image.src = this.link;
    this._image.alt = this.name;
    this._cardElement.querySelector('.card__title').textContent = this.name;

    // Кнопка удаления карточки
    if (this._cardOwner === this._userId) {
      this._deleteButton.addEventListener('click', () => {
        popupDeleteCard.open();
      });
    } else {
      this._deleteButton.remove()
    }

    // Отрисовка лайка
    if (this._likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('card__like_active');
    }

    // Отрисовка счетчика лайков
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();
    return this._cardElement
  }
}
