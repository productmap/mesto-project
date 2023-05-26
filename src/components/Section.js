export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._selector = selector;
  }

  addItem(item) {
    this._selector.prepend(item)
  }

  clear() {
    this._selector.innerHTML = '';
  }

  renderItems(items) {
    this.clear();
    items.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}
