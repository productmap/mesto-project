import './index.css';
import {disableSubmit, enableValidation} from '../components/validate'
import {closePopup, openPopup} from '../components/modal'
import {createCard} from "../components/card";
import {addCard, deleteCard, getCards, getProfileInfo, updateProfileAvatar, updateProfileInfo} from "../components/api";

const cardsGallery = document.querySelector('.cards');

const modalProfileEdit = document.querySelector("#profileEdit");
const modalCreateCard = document.querySelector("#newCard");
const modalEditAvatar = document.querySelector("#newAvatar");
const modalDeleteCard = document.querySelector("#deleteCard");

const profileAvatar = document.querySelector('.profile__avatar')
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = modalProfileEdit.querySelector(".form");
const formCreateCard = modalCreateCard.querySelector(".form");
const formUpdateAvatar = modalEditAvatar.querySelector(".form");
const inputProfileName = formEditProfile.querySelector("input[name='name']");
const inputProfileAbout = formEditProfile.querySelector("input[name='description']");
const inputPlaceTitle = formCreateCard.querySelector("input[name='title']");
const inputPlaceImage = formCreateCard.querySelector("input[name='link']");
const profileEditButton = document.querySelector(".profile__edit-button");
const inputProfileAvatar = formUpdateAvatar.querySelector("input[name='avatar-link']");


const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const modalsCloser = modal => {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close-button')) {
      closePopup(modal);
    }
  });
}
modalsCloser(modalProfileEdit);
modalsCloser(modalCreateCard);
modalsCloser(modalEditAvatar);
modalsCloser(modalDeleteCard);


// Редактирование профиля
profileEditButton.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileDescription.textContent;
  openPopup(modalProfileEdit);
});

// Обработчик «отправки» формы редактирования профиля
function handleProfileForm(event) {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';

  const info = {
    name: inputProfileName.value,
    about: inputProfileAbout.value
  }

  updateProfileInfo(info)
    .then(res => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(modalProfileEdit);
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

formEditProfile.addEventListener('submit', handleProfileForm);

// Добавление карточек
const profileCreateCardButton = document.querySelector(".profile__add-button");
profileCreateCardButton.addEventListener('click', () => {
  openPopup(modalCreateCard);
});

// Обработчик «отправки» формы добавления карточек
function handleCreateCardForm(event) {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';
  disableSubmit(event.submitter, validationConfig.inactiveButtonClass);

  const card = {};
  card.name = inputPlaceTitle.value;
  card.link = inputPlaceImage.value;

  addCard(card).then(res => {
    formCreateCard.reset();
    closePopup(modalCreateCard);
    cardsGallery.prepend(createCard(res, res.owner._id))
  })
    .catch(err => console.log(err))
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
}

formCreateCard.addEventListener('submit', handleCreateCardForm);

// Загрузка аватара
const profileEditAvatar = document.querySelector(".profile__avatar-overlay");
profileEditAvatar.addEventListener('click', () => {
  openPopup(modalEditAvatar);
});

// Обработчик «отправки» формы редактирования аватара
function handleProfileAvatar(event) {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';
  console.log(inputProfileAvatar.value)
  disableSubmit(event.submitter, validationConfig.inactiveButtonClass);

  updateProfileAvatar(inputProfileAvatar.value)
    .then(res => {
      profileAvatar.src = res.avatar;
      formUpdateAvatar.reset();
      closePopup(modalEditAvatar);
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

modalEditAvatar.addEventListener('submit', handleProfileAvatar);

enableValidation(validationConfig);

// Обработчик удаления карточки
function handleDeleteCard(event) {
  const cardId = event.submitter.getAttribute('data-card-id');
  deleteCard(cardId)
    .then(() => {
      closePopup(modalDeleteCard);
      document.querySelector(`.card[data-card-id="${cardId}"]`).remove();
    })
    .catch(err => console.log(err))
}

modalDeleteCard.addEventListener('submit', handleDeleteCard);

// Отрисовка страницы
Promise.all([
  getProfileInfo,
  getCards
])
  .then(([profile,cards]) => {

    profileAvatar.src = profile.avatar;
    profileName.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileName.dataset.userId = profile._id;

    cards.reverse().forEach(card => cardsGallery.prepend(createCard(card, profile._id)));
  })
  .catch(err => console.log(err))
