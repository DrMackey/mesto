export class UserInfo {
  constructor(name, caption) {
    this._nameElement = name;
    this._captionElement = document.querySelector(caption);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      caption: this._captionElement.textContent,
    };
  }

  setUserInfo({ name, subtitle }) {
    this._nameElement.textContent = name;
    this._captionElement.textContent = subtitle;
  }
}
