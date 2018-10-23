/*
 * This file is responsible for the scrolling logic of the website.
 * When the user scrolls, we will override the scrolling behaviour to fluidly
 * scroll them to the next page.
 */

let previousScrollPosition = window.pageYOffset;

let position = 0;

let lock = false;

const positionOffsets = [
  0,
  window.innerHeight,
  window.innerHeight * 2,
  window.innerHeight * 3,
];

window.addEventListener('scroll', (e) => {
  if (document.documentElement.scrollTop > previousScrollPosition) {
    scrollDown();
  } else {
    scrollUp();
  }

  // Set lock so you can't scroll, and remove it after half a second
  if (!lock) {
    lock = true;
    setTimeout(() => { lock = false; }, 500);
  } 

  previousScrollPosition = document.documentElement.scrollTop;
});

const lockGuard = () => {
  if (lock) {
    window.scrollTo(0, positionOffsets[position]);
    return true;
  }

  return false;
}

const scrollDown = () => {
  console.log("Scrolling down detected");

  if (lockGuard()) { return; }

  if (position != positionOffsets.length - 1) {
    position++;
    window.scrollTo(0, positionOffsets[position]);
  }
};

const scrollUp = () => {
  console.log("Scrolling up detected");

  if (lockGuard()) { return; }

  if (position != 0) {
    position--;
    window.scrollTo(0, positionOffsets[position]);
  }
};
