const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const page = document.querySelector('.page')
const cards = document.querySelector('.cards')

// Функция добавление карточки
function Card(props) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Удаление карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', (e) => {
    e.target.parentElement.remove();
  });

  // Картинка карточки
  cardElement.querySelector('.card__image').src = props.link;
  cardElement.querySelector('.card__image').alt = props.name;
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    const cardZoom = document.createElement('div');
    cardZoom.classList.add('card__zoom');
    cardZoom.addEventListener('click', () => {
      cardZoom.remove();
    });

    const cardZoomFigure = document.createElement('figure');
    cardZoomFigure.classList.add('card__zoom-figure');

    const cardZoomImage = document.createElement('img');
    cardZoomImage.classList.add('card__zoom-image');
    cardZoomImage.src = props.link;
    cardZoomImage.alt = props.name;

    const cardZoomCaption = document.createElement('figcaption');
    cardZoomCaption.classList.add('card__zoom-caption');
    cardZoomCaption.textContent = props.name;

    const cardZoomClose = document.createElement('button');
    cardZoomClose.classList.add('card__zoom-close');
    cardZoomClose.addEventListener('click', () => {
      cardZoom.remove();
    });

    cardZoomFigure.append(cardZoomImage, cardZoomCaption, cardZoomClose);
    cardZoom.append(cardZoomFigure);
    page.append(cardZoom)
  });

  // Заголовок
  cardElement.querySelector('.card__title').textContent = props.name;

  // Кнопка лайка
  cardElement.querySelector('.card__like').addEventListener('click', (e) => {
    e.target.classList.toggle('card__like_active');
  });

  cards.append(cardElement)
}

// Отрисовка галереи
function renderCards(data) {
  data.forEach((item) => {
    Card(item);
  })
}

renderCards(initialCards);


// Редактирование профиля
const profileEditButton = document.querySelector(".profile__edit-button");
// Вызов поп-апа редактирования профиля
profileEditButton.onclick = function () {
  profileEditModal.classList.add('popup_opened');
}

const profileEditModal = document.querySelector("#profileEdit");
const profileEditForm = profileEditModal.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Закрытие поп-апа
const profileEditCloseButton = profileEditModal.querySelector('.popup__close');
profileEditCloseButton.onclick = function () {
  profileEditModal.classList.remove('popup_opened');
}

// Обработчик «отправки» формы редактирования профиля
function profileEditFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameInput = profileEditForm.querySelector("input[name='name']");
  const jobInput = profileEditForm.querySelector("input[name='description']");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  profileEditModal.classList.remove('popup_opened');
}

profileEditForm.addEventListener('submit', profileEditFormSubmit);


// Добавление карточек
const addCardButton = document.querySelector(".profile__add-button");
addCardButton.onclick = function () {
  addCardModal.classList.add('popup_opened');
}

const addCardModal = document.querySelector("#newCard");
const addCardModalForm = addCardModal.querySelector(".popup__form");

// Закрытие поп-апа
const addCardModalCloseButton = addCardModal.querySelector('.popup__close');
addCardModalCloseButton.onclick = function () {
  addCardModal.classList.remove('popup_opened');
}

// Обработчик «отправки» формы добавления карточек
function addCardModalFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const titleInput = addCardModalForm.querySelector("input[name='title']");
  const linkInput = addCardModalForm.querySelector("input[name='link']");

  let card = {};
  card.name = titleInput.value;
  card.link = linkInput.value;
  Card(card);
  addCardModal.classList.remove('popup_opened');
}

addCardModalForm.addEventListener('submit', addCardModalFormSubmit);
