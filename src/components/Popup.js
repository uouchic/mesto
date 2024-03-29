export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscPress = this._handleEscPress.bind(this);

    //console.log(this._popup);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscPress);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscPress);
  }

  _handleEscPress(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mouseup", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });

    this._popup
      .querySelector(".popup__close")
      .addEventListener("mouseup", () => {
        this.close();
      });
  }
}
