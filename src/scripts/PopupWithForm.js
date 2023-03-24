import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitForm) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._inputList = document.querySelectorAll(".popup__item");
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formSelector.reset();
    //console.log(this._inputList);
  }
}
