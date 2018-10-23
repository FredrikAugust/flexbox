/*
 * Logic to handle hovering/clicking on panels in menu.
 */

const seasons = [
  "spring",
  "summer",
  "fall",
  "winter"
].map(v => document.querySelector(`#${v}`));

// Init to no selected
let selected = -1;

function revert() {
  seasons
    .forEach((_s) => {
      _s.classList.remove('shrunk-1', 'shrunk-2', 'expanded-1', 'expanded-2');
      _s.classList.add('default-size');
    });
}

function hoverCallback(e) {
  seasons
    .filter((_s) => _s != e.target)
    .forEach((_s) => {
      _s.classList.add('shrunk-1');
      _s.classList.remove('default-size', 'expanded-1', 'expanded-2');
    });

  e.target.classList.add('expanded-1');
}

function mouseOutCallback(e) {
  const which = seasons.indexOf(e.target);

  revert();
}

seasons.forEach((s) => {
  s.addEventListener('mouseover', hoverCallback);
  s.addEventListener('mouseout', mouseOutCallback);
});

seasons.forEach((s) => {
  s.addEventListener('click', (e) => {
    const which = seasons.indexOf(e.target);

    if (e.target.classList.contains('expanded-2')) {
      seasons.forEach((_s) => {
        _s.addEventListener('mouseover', hoverCallback);
        _s.addEventListener('mouseout', mouseOutCallback);
      });

      revert();

      hoverCallback(e);
    } else {
      seasons
        .filter((_s) => _s != e.target)
        .forEach((_s) => {
          _s.removeEventListener('mouseover', hoverCallback);
          _s.classList.add('shrunk-2');
          _s.classList.remove('default-size', 'shrunk-1', 'expanded-1', 'expanded-2');
        });

      seasons.forEach((_s) => _s.removeEventListener('mouseout', mouseOutCallback));
      e.target.classList.add('expanded-2');
    }
  });
});
