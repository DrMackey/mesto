export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(`${containerSelector}`);
  }

  addItem(itemList) {
    this._cardsContainer.prepend(this._renderer(itemList));
  }

  renderItems() {
    this._items.forEach((itemList) => this.addItem(itemList));
  }
}
