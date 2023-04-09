export default class Section {
  constructor(renderer, container) {
    this._container = container;
    this._renderer = renderer;
  }

  renderer(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
