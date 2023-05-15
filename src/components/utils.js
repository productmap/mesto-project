export const cardsGallery = document.querySelector('.cards'),
  modalProfileEdit = document.querySelector("#profileEdit"),
  modalCreateCard = document.querySelector("#newCard"),
  modalEditAvatar = document.querySelector("#newAvatar"),
  modalDeleteCard = document.querySelector("#deleteCard"),

  profileAvatar = document.querySelector('.profile__avatar'),
  profileName = document.querySelector(".profile__name"),
  profileDescription = document.querySelector(".profile__description"),

  formEditProfile = modalProfileEdit.querySelector(".form"),
  formCreateCard = modalCreateCard.querySelector(".form"),
  formUpdateAvatar = modalEditAvatar.querySelector(".form"),

  inputProfileName = formEditProfile.querySelector("input[name='name']"),
  inputProfileAbout = formEditProfile.querySelector("input[name='description']"),
  inputPlaceTitle = formCreateCard.querySelector("input[name='title']"),
  inputPlaceImage = formCreateCard.querySelector("input[name='link']"),
  profileEditButton = document.querySelector(".profile__edit-button"),
  inputProfileAvatar = formUpdateAvatar.querySelector("input[name='avatar-link']")


