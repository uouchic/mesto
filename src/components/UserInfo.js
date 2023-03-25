import { nameInput, jobInput } from "../utils/constants.js";

export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    nameInput.value = this._userName.textContent;
    jobInput.value = this._userJob.textContent;
  }

  setUserInfo() {
    this._userName.textContent = nameInput.value;
    this._userJob.textContent = jobInput.value;
  }
}
