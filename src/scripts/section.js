export default class Section {
  constructor({ data, renderer }, selector) {
    this._initialArray = data;
    this._container = selector;
    this._renderer = renderer; // записываем renderer в this
    // ...
  }

  renderer() {
    this._initialArray.forEach((item) => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
