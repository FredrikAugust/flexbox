/*
 * This file is responsible for the scrolling logic of the website.
 * When the user scrolls, we will override the scrolling behaviour to fluidly
 * scroll them to the next page.
 * Written completely by Fredrik August Madsen-Malmo
 */

let previousScrollPosition = 0;
let position = 0;

const anchors = [
  document.querySelector('header'),
  document.querySelector('#seasons'),
  document.querySelector('#reservations'),
  document.querySelector('footer'),
];

(() => (window.scrollTo(0, 0)))()

window.addEventListener('scroll', function scrollHandler (e) {
  // We're hiding the overflow so the user can't scroll when the smooth
  // scrolling is working its magic. We're also hiding it so that the user won't
  // see a scrollbar popping up now and then.
  window.removeEventListener('scroll', scrollHandler);
  document.querySelector('body').style.overflowY = 'hidden';
  // Set lock so you can't scroll, and remove it after half a second
  setTimeout(() => {
    window.addEventListener('scroll', scrollHandler);
    previousScrollPosition = document.documentElement.scrollTop;
    document.querySelector('body').style.overflowY = 'scroll';
  }, 600);

  if (document.documentElement.scrollTop > previousScrollPosition) {
    scrollDown();
  } else {
    scrollUp();
  }

  prevEventTimestamp = e.timeStamp;
});

const scrollDown = () => {
  console.log("Scrolling down detected");

  if (position != anchors.length - 1) {
    console.log(`Pos: ${position}->${position+1}`)
    position++;
    anchors[position].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollUp = () => {
  console.log("Scrolling up detected");

  if (position != 0) {
    console.log(`Pos: ${position}->${position-1}`)
    position--;
    anchors[position].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
