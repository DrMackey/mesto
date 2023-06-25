export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(containerSelector);
  }

  addItem(itemList) {
    this._cardsContainer.prepend(itemList);
  }

  renderItems(items) {
    items.forEach((itemList) => this._renderer(itemList));
  }
}
