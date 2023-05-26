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
  profileDescription,
  profileEditAvatar,
  profileEditButton,
  profileName,
  validationConfig
} from '../components/utils'

export const api = new Api(apiConfig);
const user = new UserInfo({
    profileAvatar,
    profileName,
    profileDescription
  },
  api
);

export const popupZoom = new PopupWithImage(modalCardZoom);

/** Редактирование профиля  */
const popupEditProfile = new PopupWithForm(modalProfileEdit, handleProfileForm);
const profileFormValidator = new FormValidator(validationConfig, modalProfileEdit);
profileFormValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileDescription.textContent;
  popupEditProfile.open();
});

// Ручка формы редактирования профиля
function handleProfileForm(event) {
  event.submitter.textContent = 'Сохранение...';

  const info = {
    name: inputProfileName.value,
    about: inputProfileAbout.value
  }

  api.updateProfileInfo(info)
    .then(res => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

/** Загрузка аватара  */
const popupEditAvatar = new PopupWithForm(modalEditAvatar, handleProfileAvatar);
const profileAvatarValidator = new FormValidator(validationConfig, modalEditAvatar);

profileEditAvatar.addEventListener('click', () => {
  profileAvatarValidator.enableValidation();
<<<<<<< HEAD
  // profileAvatarValidator.disableSubmit();
=======
  profileAvatarValidator.disableSubmit();
>>>>>>> 2e3f029bfb610afadedb3a31a4be9d9fd354788d
  popupEditAvatar.open();
});

// Ручка формы редактирования аватара
function handleProfileAvatar(event) {
  event.submitter.textContent = 'Сохранение...';

  api.updateProfileAvatar(inputProfileAvatar.value)
    .then(res => {
      profileAvatar.src = res.avatar;
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

/** Добавление карточек  */
const popupAddCard = new PopupWithForm(modalCreateCard, handleCreateCardForm);
const addCardValidator = new FormValidator(validationConfig, modalCreateCard);

profileCreateCardButton.addEventListener('click', () => {
  popupAddCard.open();
  addCardValidator.enableValidation();
<<<<<<< HEAD
  // addCardValidator.disableSubmit();
=======
  addCardValidator.disableSubmit();
>>>>>>> 2e3f029bfb610afadedb3a31a4be9d9fd354788d
});

// Ручка формы добавления карточек
function handleCreateCardForm(event) {
  event.submitter.textContent = 'Сохранение...';

  const card = {
    name: inputPlaceTitle.value,
    link: inputPlaceImage.value
  };

  api.addCard(card).then(res => {
    gallerySection.addItem(createCard(res));
  })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddCard.close();
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
    })
    .catch(err => console.log(err))
    .finally(() => {
      event.submitter.textContent = 'Да';
      popupConfirmDelete.close();
    })
}

// Ручка зума
function handlerZoom(card) {
  popupZoom.open(card.link, card.name);
}

// Ручка лайков
function handlerLikes(card) {
  if (card._likeButton.classList.contains("card__like_active")) {
    api.deleteLike(card.id)
      .then(res => {
        this._likeButton.classList.remove('card__like_active');
        this._likeCounter.textContent = res.likes.length;
      })
      .catch(err => console.log(err))
  } else {
    api.addLike(card.id)
      .then(res => {
        this._likeButton.classList.add('card__like_active');
        this._likeCounter.textContent = res.likes.length;
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
    gallerySection.renderItems(cards.reverse())
  })
  .catch(error => console.log(`Ошибка: ${error}`))
<<<<<<< HEAD

=======
>>>>>>> 2e3f029bfb610afadedb3a31a4be9d9fd354788d
