export default class Section {
  constructor({ data, renderer }, selector) {
    this._initialArray = data;
    this._container = selector;
    this._renderer = renderer;
  }

  renderer() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
