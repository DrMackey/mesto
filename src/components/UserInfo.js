export class UserInfo {
  constructor(name, caption) {
    this._nameElement = name;
    this._captionElement = caption;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      caption: this._captionElement.textContent,
    };
  }

  setUserInfo({ link, name }) {
    this._nameElement.textContent = name;
    this._captionElement.textContent = link;
  }
}
