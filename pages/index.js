const page = document.querySelector('.page')
const cards = document.querySelector('.cards')

// Шаблоны
const cardTemplate = document.querySelector('#card-template').content;
const zoomTemplate = document.querySelector('#zoom-template').content;

// Открытие поп-апа
function openPopup(modal) {
  modal.classList.add('popup_opened');
}

// Закрытие поп-апа
function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

// Функция добавление карточки
const createCard = (props) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Удаление карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  // Картинка карточки
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = props.link;
  cardImage.alt = props.name;
  // Увеличение картинки
  cardImage.addEventListener('click', () => {
    const zoomView = zoomTemplate.querySelector('.card__zoom').cloneNode(true);
    // Закрытие окна по клику в любой области
    zoomView.addEventListener('click', () => {
      zoomView.remove();
    });

    const cardZoomImage = zoomView.querySelector('.card__zoom-image')
    cardZoomImage.src = props.link;
    cardZoomImage.alt = props.name;

    zoomView.querySelector('.card__zoom-caption').textContent = props.name;

    const cardZoomClose = zoomView.querySelector('.card__zoom-close');
    cardZoomClose.addEventListener('click', () => {
      zoomView.remove();
    });
    page.append(zoomView);
  });

  // Заголовок
  cardElement.querySelector('.card__title').textContent = props.name;

  // Кнопка лайка
  cardElement.querySelector('.card__like').addEventListener('click', (e) => {
    e.target.classList.toggle('card__like_active');
  });

  // cards.append(cardElement)
  return cardElement
}

/** Отрисовка галереи */
const renderCards = (data) => {
  data.forEach((item) => {
    cards.prepend(createCard(item))
  })
}

// Данные и отрисовка
fetch('api/cards.json')
  .then((response) => response.json())
  .then(data => renderCards(data))
  .catch((error) => console.error(error));


// Модалки
const modalEditProfile = document.querySelector("#profileEdit");
const modalCreateCard = document.querySelector("#newCard");
const formEditProfile = modalEditProfile.querySelector(".popup__form");
const formCreateCard = modalCreateCard.querySelector(".popup__form");
const inputProfileName = formEditProfile.querySelector("input[name='name']");
const inputProfileJob = formEditProfile.querySelector("input[name='description']");
const inputPlaceTitle = formCreateCard.querySelector("input[name='title']");
const inputPlaceImage = formCreateCard.querySelector("input[name='link']");

// Редактирование профиля
const profileEditButton = document.querySelector(".profile__edit-button");
// Вызов поп-апа редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(modalEditProfile);
});

// Добавление карточек
const profileCreateCardButton = document.querySelector(".profile__add-button");
profileCreateCardButton.addEventListener('click', () => {
  openPopup(modalCreateCard);
});

// Закрытие поп-апа
const profileEditCloseButton = modalEditProfile.querySelector('.popup__close');
profileEditCloseButton.addEventListener('click', () => {
  closePopup(modalEditProfile);
});

// Закрытие поп-апа
const modalCloseButton = modalCreateCard.querySelector('.popup__close');
modalCloseButton.addEventListener('click', () => {
  closePopup(modalCreateCard);
});

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Обработчик «отправки» формы редактирования профиля
function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileJob.value;
  modalEditProfile.classList.remove('popup_opened');
}

formEditProfile.addEventListener('submit', submitProfileForm);

// Обработчик «отправки» формы добавления карточек
function submitCreateCardForm(event) {
  event.preventDefault();

  const card = {};
  card.name = inputPlaceTitle.value;
  card.link = inputPlaceImage.value;
  cards.prepend(createCard(card));
  modalCreateCard.classList.remove('popup_opened');
}

formCreateCard.addEventListener('submit', submitCreateCardForm);


