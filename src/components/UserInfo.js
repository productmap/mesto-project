export default class UserInfo {
  constructor({profileAvatar, profileName, profileAbout}, api) {
    this.profileAvatar = profileAvatar;
    this.profileName = profileName;
    this.profileAbout = profileAbout;
    this.api = api;
  }

  _renderUserInfo(info) {
    this.profileAvatar.src = info.avatar;
    this.profileName.textContent = info.name;
    this.profileAbout.textContent = info.about;
  }

  setUserInfo(info) {
    this.id = info._id;
    this.name = info.name;
    this.about = info.about;
    this.avatar = info.avatar;
    this._renderUserInfo(info);
  }

  getUserInfo() {
    return this.api.getProfileInfo()
      .then(info => {
        this.setUserInfo(info);
        return info
      })
  }
}
