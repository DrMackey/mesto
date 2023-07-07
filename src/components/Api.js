export class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  patchUserInfo({ name, subtitle }) {
    fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: subtitle,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postCreateCard({ name, link }) {
    console.log(name);
    console.log(link);
    fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        console.log(data);
      });
  }

  deleteCard(idCard) {
    console.log("api card " + idCard);
  }
}
