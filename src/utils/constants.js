export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23/',
  headers: {
    authorization: 'a9c8f3fa-c4c8-428a-b274-c9fed27107d1',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

export const cardsGallery = document.querySelector('.cards'),
  // Шаблоны
  modalProfileEdit = document.querySelector("#profileEdit"),
  modalCreateCard = document.querySelector("#newCard"),
  modalEditAvatar = document.querySelector("#newAvatar"),
  modalDeleteCard = document.querySelector("#deleteCard"),
  modalCardZoom = document.querySelector("#cardZoom"),
  cardTemplate = document.querySelector('#card-template').content,

  profileAvatar = document.querySelector('.profile__avatar'),
  profileName = document.querySelector(".profile__name"),
  profileAbout = document.querySelector(".profile__description"),

  // Формы
  formEditProfile = modalProfileEdit.querySelector(".form"),
  formCreateCard = modalCreateCard.querySelector(".form"),
  formUpdateAvatar = modalEditAvatar.querySelector(".form"),

  // Инпуты
  inputProfileName = formEditProfile.querySelector("input[name='name']"),
  inputProfileAbout = formEditProfile.querySelector("input[name='about']"),
  inputPlaceTitle = formCreateCard.querySelector("input[name='name']"),
  inputPlaceImage = formCreateCard.querySelector("input[name='link']"),
  inputProfileAvatar = formUpdateAvatar.querySelector("input[name='avatar']"),

  profileCreateCardButton = document.querySelector(".profile__add-button"),
  profileEditButton = document.querySelector(".profile__edit-button"),
  profileEditAvatar = document.querySelector(".profile__avatar-overlay")
