
export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._elementsContainer = document.querySelector(`${containerSelector}`);
  }

  addItem(itemList) {
    this._elementsContainer.prepend(this._renderer(itemList))
  }

  render() {
    this._items.forEach((itemList) => this.addItem(itemList))
  }
}