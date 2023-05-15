export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  addItem(item) {
    this._selector.prepend(item)
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
