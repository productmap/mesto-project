import {
  profileAvatar,
  profileName,
  profileDescription,
} from './utils';

export default class UserInfo {
  constructor(info) {
    this.name = info.name;
    this.about = info.about;
    this.avatar = info.avatar;
    this.id = info.id;
  }

  setUserInfo() {
    console.log(this);
  }

  getUserInfo() {

  }

  renderUserInfo() {
    profileAvatar.src = this.avatar;
    profileName.textContent = this.name;
    profileDescription.textContent = this.about;
  }
}
