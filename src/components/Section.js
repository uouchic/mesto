export default class Section {
  constructor({ data, renderer }, container) {
    this._initialArray = data;
    this._container = container;
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
