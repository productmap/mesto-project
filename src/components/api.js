const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23/',
  headers: {
    authorization: 'a9c8f3fa-c4c8-428a-b274-c9fed27107d1',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

const getData = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// API профиля
export const getProfileInfo = fetch(`${config.baseUrl}users/me`, {
  headers: config.headers
})
  .then(res => getData(res));

export const updateProfileInfo = info => fetch(`${config.baseUrl}users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: info.name,
    about: info.about
  })
})
  .then(res => getData(res));

// Обновление аватара
export const updateProfileAvatar = link => fetch(`${config.baseUrl}users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: link,
  })
})
  .then(res => getData(res));


// API галереи
export const getCards = fetch(`${config.baseUrl}cards`, {headers: config.headers})
  .then(res => getData(res));

// Добавление карточки
export const addCard = card => fetch(`${config.baseUrl}cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: card.name,
    link: card.link
  })
})
  .then(res => getData(res));

// Удаление карточки
export const deleteCard = card => fetch(`${config.baseUrl}cards/${card}`, {
  method: 'DELETE',
  headers: config.headers,
})
  .then(res => getData(res));

// Добавление лайка
export const addLike = card => fetch(`${config.baseUrl}cards/likes/${card}`, {
  method: 'PUT',
  headers: config.headers,
})
  .then(res => getData(res));

// Удаление лайка
export const deleteLike = card => fetch(`${config.baseUrl}cards/likes/${card}`, {
  method: 'DELETE',
  headers: config.headers,
})
  .then(res => getData(res));
