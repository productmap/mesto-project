function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme_dark') {
    console.log('dd')
    setTheme('theme_light');
  } else {
    setTheme('theme_dark');
  }
}


(function () {
  if (localStorage.getItem('theme') === 'theme_dark') {
    setTheme('theme_dark');
    document.getElementById('slider').checked = false;
  } else {
    setTheme('theme_light');
    document.getElementById('slider').checked = true;
  }
})();
