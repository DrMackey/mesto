
export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer();
    // this._elementsContainer = container.querySelector(`${containerSelector}`);
  }

  addItem() {
    // this._elementsContainer.prepend(cardElement);
    console.log(this._renderer);
  }

  render() {
    console.log('test render');
  }
}