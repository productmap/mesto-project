import './index.css';
import Api from '../components/Api';
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

import {disableSubmit, enableValidation} from '../components/validate';

import {
  cardTemplate,
  cardsGallery,
  config,
  formCreateCard,
  formEditProfile,
  formUpdateAvatar,
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
  profileDescription,
  profileEditButton,
  profileName,
  validationConfig, profileCreateCardButton,
} from '../components/utils'


export const api = new Api(config);

export const popupZoom = new PopupWithImage(modalCardZoom);
export const popupEditProfile = new PopupWithForm(modalProfileEdit, handleProfileForm);
export const popupEditAvatar = new PopupWithForm(modalEditAvatar, handleProfileAvatar);
export const popupAddCard = new PopupWithForm(modalCreateCard);
export const popupDeleteCard = new PopupWithForm(modalDeleteCard);

// export const deleteCardForm = new PopupWithForm(modalDeleteCard, id => {
//   api.deleteCard(this._id)
//     .then(() => {
//       popupDeleteCard.close();
//       this._cardElement.remove();
//     })
//     .catch(err => console.log(err))
// });

// Редактирование профиля
profileEditButton.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileDescription.textContent;
  popupEditProfile.open();
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
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

// formEditProfile.addEventListener('submit', handleProfileForm);


// Добавление карточек
profileCreateCardButton.addEventListener('click', () => {
  popupAddCard.open();
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
    popupEditProfile.close();
    formCreateCard.reset();
    cardsGallery.prepend(createCard(res, res.owner._id))
  })
    .catch(err => console.log(err))
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
}

// formCreateCard.addEventListener('submit', handleCreateCardForm);

// Загрузка аватара
const profileEditAvatar = document.querySelector(".profile__avatar-overlay");
profileEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});

// Обработчик «отправки» формы редактирования аватара
function handleProfileAvatar(event) {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';
  disableSubmit(event.submitter, validationConfig.inactiveButtonClass);

  api.updateProfileAvatar(inputProfileAvatar.value)
    .then(res => {
      profileAvatar.src = res.avatar;
      formUpdateAvatar.reset();
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => event.submitter.textContent = 'Сохранить');
}

// modalEditAvatar.addEventListener('submit', handleProfileAvatar);

enableValidation(validationConfig);

// Отрисовка страницы
Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then(([profile, cards]) => {
    const user = new UserInfo(profile);
    const gallerySection = new Section({
      items: cards.reverse(),
      renderer: item => {
        const card = new Card(item, user.id, cardTemplate);
        gallerySection.addItem(card.render(item, user.id, cardTemplate));
      }
    }, cardsGallery);
    user.setUserInfo();
    gallerySection.renderItems();
  })
  .catch(err => console.log(err))
