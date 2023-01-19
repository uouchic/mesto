let popupBtnOpen = document.querySelector(".profile__aditbutton");
let popupContainer = document.querySelector(".popup");
let popupBtnClose = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__profile");
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");
let profileInput = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");

popupBtnOpen.addEventListener("click", openPopup);

function openPopup() {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profileInput.textContent;
  jobInput.value = profileJob.textContent;
}

popupBtnClose.addEventListener("click", closePopup);

function closePopup() {
  popupContainer.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileInput.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);