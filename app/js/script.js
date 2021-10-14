'use strict';

const themeToggle = document.querySelector('.theme-toggle');

// Select the theme preference from localStorage
const currentTheme = localStorage.getItem("theme");

// If the current theme in localStorage is "defalut, light-mode"...
if (currentTheme === null) {
  document.documentElement.classList.remove('light-mode', 'purple-mode');
} else if (currentTheme === 'light-mode') {
  document.documentElement.classList.add('light-mode');
} else if(currentTheme === 'purple-mode') {
  document.documentElement.classList.add('purple-mode');
};

// EVENT LISTENERS:
themeToggle.addEventListener('click', (e) => {
  const currBtn = e.target.closest('.custom-radio-button');
  const radio = currBtn.querySelector('input');
  let theme;

  if (radio.classList.contains('default-mode')) {
    document.documentElement.classList.remove('light-mode', 'purple-mode');
    theme = null;
  }
  if (radio.classList.contains('light-mode')) {
    document.documentElement.classList.add('light-mode');
    theme ='light-mode';
  } else document.documentElement.classList.remove('light-mode');

  if (radio.classList.contains('purple-mode'))  {
    document.documentElement.classList.add('purple-mode');
    theme = 'purple-mode';
  } else document.documentElement.classList.remove('purple-mode');

  // Save the choice in localStorage:
  localStorage.setItem("theme", theme);
});















