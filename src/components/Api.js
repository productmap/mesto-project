export default class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем карточки
  getInitialCards() {
    return fetch(`${this.baseUrl}cards`, {
      headers: this.headers
    })
      .then(res => this._getData(res));
  }

  // Получаем данные профиля
  getProfileInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.headers
    })
      .then(res => this._getData(res));
  }

  // Обновляем профиль
  updateProfileInfo(info) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
      .then(res => this._getData(res));
  }

  // Обновление аватара
  updateProfileAvatar(link) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(res => this._getData(res));
  }

  // Добавление карточки
  addCard(card) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => this._getData(res));
  }

// Удаление карточки
  deleteCard(card) {
    return fetch(`${this.baseUrl}cards/${card}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => this._getData(res));
  }

// Добавление лайка
  addLike(card) {
    return fetch(`${this.baseUrl}cards/likes/${card}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(res => this._getData(res));
  }

// Удаление лайка
  deleteLike(card) {
    return fetch(`${this.baseUrl}cards/likes/${card}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => this._getData(res));
  }
}
