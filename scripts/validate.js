export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
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
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  enableValidation = () => {
    this._setEventListeners(this.formElement, this._settings);
  };
}
