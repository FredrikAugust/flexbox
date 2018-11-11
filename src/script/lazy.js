window.addEventListener('load', () => {
  document.querySelectorAll(".lazy").forEach((e) => {
    e.style.backgroundImage = `url(./img/${e.id}.jpg)`;
  });
});
