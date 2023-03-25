import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, title) {
    super(popupSelector);
    this._image = image;
    this._title = title;
  }

  open(link, name) {
    super.open();

    //console.log(this._image);

    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
