export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Функция, которая проверяет валидность поля, внутри вызывает функцию showInputError или hideInputError
  _isValid = (formElement, inputElement, _settings) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        _settings
      );
    } else {
      this._hideInputError(formElement, inputElement, _settings);
    }
  };

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (_formElement, inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (_formElement, inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}`);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };

  // Функция принимает массив полей
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners = () => {
    this._toggleButtonState(this._inputList, this._submitButton);

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(this._formElement, inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButton(this._submitButton);
    } else {
      this._enableButton(this._submitButton);
    }
  };

  disableButton = () => {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "disabled");
  };

  _enableButton = () => {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
