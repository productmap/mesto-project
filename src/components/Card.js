import {closePopup, openPopup} from "./Popup";
import {api} from "../pages";

import {
  cardTemplate,
  modalCardZoom,
  modalDeleteCard,
  modalOverlay,
  cardZoomImage,
  cardZoomCaption
} from './utils'


modalCardZoom.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__image')) {
    closePopup(modalCardZoom);
  }
});

// Вызов зума
const handleZoomCardImage = props => {
  cardZoomImage.src = props.link;
  cardZoomImage.alt = props.name;
  cardZoomCaption.textContent = props.name;
  modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  openPopup(modalCardZoom);
}

// Функция генерации карточки
export const createCard = (props, userId) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.dataset.cardId = props._id;
  cardElement.querySelector('.card__delete-button').dataset.cardId = props._id;

  // Кнопка удаления карточки
  if (props.owner._id === userId) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      modalDeleteCard.querySelector('.form__submit').dataset.cardId = props._id;
      openPopup(modalDeleteCard);
    });
  } else {
    cardElement.querySelector('.card__delete-button').remove()
  }

  // Картинка карточки
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = props.link;
  cardImage.alt = props.name;
  cardImage.dataset.userId = props.owner._id;

  // Увеличение картинки
  cardImage.addEventListener('click', () => handleZoomCardImage(props));

  // Заголовок
  cardElement.querySelector('.card__title').textContent = props.name;

  // Кнопка лайка
  const likeButton = cardElement.querySelector('.card__like');

  // Счетчик лайка
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardLikeCounter.textContent = props.likes.length;

  if (props.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like_active');
  }

  likeButton.addEventListener('click', event => {
    if (event.target.classList.contains("card__like_active")) {
      api.deleteLike(props._id)
        .then(res => {
          event.target.classList.remove('card__like_active');
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch(err => console.log(err))
    } else {
      api.addLike(props._id)
        .then(res => {
          event.target.classList.add('card__like_active');
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch(err => console.log(err))
    }
  });

  // cards.append(cardElement)
  return cardElement
}

// Обработчик удаления карточки
function handleDeleteCard(event) {
  const cardId = event.submitter.getAttribute('data-card-id');
  api.deleteCard(cardId)
    .then(() => {
      closePopup(modalDeleteCard);
      document.querySelector(`.card[data-card-id="${cardId}"]`).remove();
    })
    .catch(err => console.log(err))
}

modalDeleteCard.addEventListener('submit', handleDeleteCard);