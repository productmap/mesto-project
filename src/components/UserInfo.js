import {
  profileAvatar,
  profileName,
  profileDescription,
} from './utils';
import {api} from "../pages";

export default class UserInfo {
  constructor(info) {
    this.name = info.name;
    this.about = info.about;
    this.avatar = info.avatar;
    this.id = info._id;
  }

  setUserInfo() {
    console.log(this);
  }

  getUserInfo() {
    // console.log(api.getProfileInfo())
    return api.getProfileInfo();
  }

  renderUserInfo() {
    profileAvatar.src = this.avatar;
    profileName.textContent = this.name;
    profileDescription.textContent = this.about;
  }
}
