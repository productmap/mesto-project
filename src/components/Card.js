export default class Card {
  constructor(data, userId, handlerZoom, handlerRemove, handlerLikes, selector) {
    this.id = data._id;
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
    this._handlerZoom = handlerZoom;
    this._handlerRemove = handlerRemove;
    this._handlerLikes = handlerLikes;
  }

  _setEventListeners() {
    // Вызов зума
    this._image.addEventListener('click', () => this._handlerZoom(this));

    // Обработка лайков
    this._likeButton.addEventListener('click', () => this._handlerLikes(this));

    // Обработчик удаления
    this._deleteButton.addEventListener('click', () => this._handlerRemove(this));
  }

  remove(card) {
    this._cardElement.remove();
  }

  render() {
    this._image.src = this.link;
    this._image.alt = this.name;
    this._cardElement.querySelector('.card__title').textContent = this.name;

    // Кнопка удаления карточки
    if (this._cardOwner !== this._userId) {
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
