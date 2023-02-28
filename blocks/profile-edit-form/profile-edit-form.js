let profileEditModal = document.querySelector(".profile-edit-modal");
let profileEditButton = document.querySelector(".profile__edit-profile")
let modalCloseButton = document.querySelector(".profile-edit-modal__close");

profileEditButton.onclick = function () {
  profileEditModal.style.display = "flex";
}

modalCloseButton.onclick = function () {
  profileEditModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === profileEditModal) {
    profileEditModal.style.display = "none";
  }
}
