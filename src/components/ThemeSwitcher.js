export default class ThemeSwitcher {
  constructor(selector) {
    this._toggle = document.querySelector(selector)
    this._init();
  }

  _setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  }

  _init() {
    if (localStorage.getItem("theme") === "theme_dark") {
      this._setTheme("theme_dark");
      this._toggle.checked = false;
    } else {
      this._setTheme("theme_light");
      this._toggle.checked = true;
    }
  }

  toggleTheme() {
    if (localStorage.getItem("theme") === "theme_dark") {
      this._setTheme("theme_light");
    } else {
      this._setTheme("theme_dark");
    }
  }
}
