import {
  profileAvatar,
  profileName,
  profileDescription,
} from './utils';

export default class UserInfo {
  constructor(info) {
    this.name = info.name;
    this.description = info.description;
    this.avatar = info.avatar;
    // this.id = info._id;
  }

  setUserInfo() {
    console.log(this)
  }

  getUserInfo() {

  }
  renderUserInfo(){
    console.log(this);
    profileAvatar.src = this.avatar;
    profileName.textContent = this.name;
    profileDescription.textContent = this.description;
  }
}
