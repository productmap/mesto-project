import './index.css';
import Api from '../components/Api';
import UserInfo from "../components/UserInfo";

import {disableSubmit, enableValidation} from '../components/validate';
import {closePopup, openPopup} from '../components/Popup'
import {createCard} from "../components/Card";

import {
  config,
  modalProfileEdit,
  modalCreateCard,
  modalEditAvatar,
  modalDeleteCard,
  profileEditButton,
  formEditProfile,
  formCreateCard,
  cardsGallery,
  validationConfig,
  inputPlaceTitle,
  inputPlaceImage,
  formUpdateAvatar,
  profileName,
  profileDescription,
  inputProfileName,
  inputProfileAbout,
  profileAvatar,
  inputProfileAvatar
} from '../components/utils'

export const api = new Api(config);


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

  api.updateProfileInfo(info)
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

  api.addCard(card).then(res => {
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

  api.updateProfileAvatar(inputProfileAvatar.value)
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

// Отрисовка страницы
Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then(([profile, cards]) => {
    const user = new UserInfo(profile);
    user.renderUserInfo();
    console.log(user)
    cards.reverse().forEach(card => cardsGallery.prepend(createCard(card, user.id)));
  })
  .catch(err => console.log(err))
