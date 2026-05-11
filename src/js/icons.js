import iconsUrl from 'url:../img/icons.svg';

let spriteMounted = false;

export const mountIconsSprite = async function () {
  if (spriteMounted || document.getElementById('svg-icons-sprite')) return;

  const response = await fetch(iconsUrl);
  const iconsSprite = await response.text();

  const spriteContainer = document.createElement('div');
  spriteContainer.id = 'svg-icons-sprite';
  spriteContainer.setAttribute('aria-hidden', 'true');
  spriteContainer.style.display = 'none';
  spriteContainer.innerHTML = iconsSprite;

  document.body.insertAdjacentElement('afterbegin', spriteContainer);
  spriteMounted = true;
};

export const iconHref = function (iconId) {
  return `#${iconId}`;
};
