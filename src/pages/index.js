import './index.css';
import Api from '../components/Api';
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

import {
  apiConfig,
  cardTemplate,
  cardsGallery,
  inputPlaceImage,
  inputPlaceTitle,
  inputProfileAbout,
  inputProfileAvatar,
  inputProfileName,
  modalCardZoom,
  modalCreateCard,
  modalDeleteCard,
  modalEditAvatar,
  modalProfileEdit,
  profileAvatar,
  profileCreateCardButton,
  profileAbout,
  profileEditAvatar,
  profileEditButton,
  profileName,
  validationConfig
} from '../utils/constants'

export const api = new Api(apiConfig);
const user = new UserInfo({
    profileAvatar,
    profileName,
    profileAbout
  },
  api
);

/** Редактирование профиля  */
const popupEditProfile = new PopupWithForm(modalProfileEdit, handleProfileForm);
const profileFormValidator = new FormValidator(validationConfig, modalProfileEdit);
profileFormValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  inputProfileName.value = user.name;
  inputProfileAbout.value = user.about;
  profileFormValidator.resetError();
  popupEditProfile.open();
});

// Ручка формы редактирования профиля
function handleProfileForm(event, info) {
  event.submitter.textContent = 'Сохранение...';

  api.updateProfileInfo(info)
    .then(res => {
      user.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

/** Загрузка аватара  */
const popupEditAvatar = new PopupWithForm(modalEditAvatar, handleProfileAvatar);
const profileAvatarValidator = new FormValidator(validationConfig, modalEditAvatar);
profileAvatarValidator.enableValidation();

profileEditAvatar.addEventListener('click', () => {
  profileAvatarValidator.disableSubmit();
  popupEditAvatar.open();
});

// Ручка формы редактирования аватара
function handleProfileAvatar(event, info) {
  event.submitter.textContent = 'Сохранение...';
  api.updateProfileAvatar(info.avatar)
    .then(res => {
      user.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

/** Добавление карточек  */
const popupAddCard = new PopupWithForm(modalCreateCard, handleCreateCardForm);
const addCardValidator = new FormValidator(validationConfig, modalCreateCard);
addCardValidator.enableValidation();

profileCreateCardButton.addEventListener('click', () => {
  addCardValidator.resetError();
  popupAddCard.open();
});

// Ручка формы добавления карточек
function handleCreateCardForm(event, card) {
  event.submitter.textContent = 'Сохранение...';

  api.addCard(card).then(res => {
    gallerySection.addItem(createCard(res));
    popupAddCard.close();
  })
    .catch(err => console.log(err))
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
}

/** Удаление карточки  */
const popupConfirmDelete = new PopupWithForm(modalDeleteCard, submitRemove);

// Ручка удаления карточки
function handlerRemove(card) {
  popupConfirmDelete.open();
  popupConfirmDelete.card = card;
}

// Удаление
function submitRemove(event) {
  event.submitter.textContent = 'Удаление...';
  api.deleteCard(popupConfirmDelete.card.id)
    .then(() => {
      popupConfirmDelete.card.remove();
      popupConfirmDelete.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      event.submitter.textContent = 'Да';
    })
}

const popupZoom = new PopupWithImage(modalCardZoom);

// Ручка зума
function handlerZoom(card) {
  popupZoom.open(card.link, card.name);
}

// Ручка лайков
function handlerLikes(card) {
  if (card.liked) {
    api.deleteLike(card.id)
      .then(res => {
        card.dislike(res.likes)
      })
      .catch(err => console.log(err))
  } else {
    api.addLike(card.id)
      .then(res => {
        card.like(res.likes)
      })
      .catch(err => console.log(err))
  }
}

// Отрисовка карты
function createCard(data) {
  const card = new Card(
    data,
    user.id,
    handlerZoom,
    handlerRemove,
    handlerLikes,
    cardTemplate
  );
  return card.render();
}

// Отрисовка секции
const gallerySection = new Section({
  renderer: item => createCard(item)
}, cardsGallery);

// Отрисовка страницы
Promise.all([
  user.getUserInfo(),
  api.getInitialCards()
])
  .then(([profile, cards]) => {
    user.setUserInfo(profile);
    gallerySection.renderItems(cards.reverse());
  })
  .catch(error => console.log(`Ошибка: ${error}`))
