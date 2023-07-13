export class UserInfo {
  constructor(name, caption) {
    this._nameElement = document.querySelector(name);
    this._captionElement = document.querySelector(caption);
    this._avatarElement = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      caption: this._captionElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._captionElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}
