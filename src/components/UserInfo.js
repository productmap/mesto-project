export default class UserInfo {
  constructor({profileAvatar, profileName, profileDescription}, api) {
    this.profileAvatar = profileAvatar;
    this.profileName = profileName;
    this.profileDescription = profileDescription;
    this.api = api;
  }

  _renderUserInfo(info) {
    this.profileAvatar.src = info.avatar;
    this.profileName.textContent = info.name;
    this.profileDescription.textContent = info.about;
  }

  setUserInfo(info) {
    this.id = info._id;
    this.name = info.name;
    this.about = info.about;
    this.avatar = info.avatar;
  }

  getUserInfo() {
    return this.api.getProfileInfo().then(info => {
      this.setUserInfo(info);
      this._renderUserInfo(info);
    })
  }
}
