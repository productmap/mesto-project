export default class ThemeSwitcher {
  constructor(selector) {
    this._toggle = document.querySelector(selector)
    this.init();
  }

  setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  }

  toggleTheme() {
    if (localStorage.getItem("theme") === "theme_dark") {
      this.setTheme("theme_light");
    } else {
      this.setTheme("theme_dark");
    }
  }

  init() {
    if (localStorage.getItem("theme") === "theme_dark") {
      this.setTheme("theme_dark");
      this._toggle.checked = false;
    } else {
      this.setTheme("theme_light");
      this._toggle.checked = true;
    }
  }
}
