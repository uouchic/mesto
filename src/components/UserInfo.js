export default class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    };
    return userData;
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
