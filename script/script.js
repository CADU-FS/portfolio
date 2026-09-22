// DOM elements to be removed when screen size changes
const elementsToRemove = document.getElementsByClassName('tablet-remove');

const torchBtn = document.getElementById('torchBtn');
const imageContainer = document.getElementById('dynamicImage');

// DOM elements for flame and mask
const torchFlame = document.getElementById('torch-flame');
const torchLighting = document.getElementById('torch-lighting');

let flameGroup;
let lightingGroup;

// Fetch and inject SVGs
await fetchSvg();

const mediaQuery = window.matchMedia('(max-width: 1024px) and (min-width: 769px)');
mediaQuery.addEventListener('change', () => toggleElements(mediaQuery));

if (torchBtn) {
  torchBtn.addEventListener('click', () => {
    imageContainer.classList.toggle('lit-up');
    torchBtn.classList.toggle('lit-up');
  });
}

async function toggleElements(mediaQuery) {
  if (mediaQuery.matches) {
    await fetchSvg();
  } else {

    Array.from(elementsToRemove).forEach(node => {
      node.innerHTML = '';
    })
  }
}

async function fetchSvg() {
  const responseFlame = await fetch('../assets/flame.svg');
  const responseFlameLighting = await fetch('../assets/flame-lighting.svg');

  const flameSvg = await responseFlame.text();
  const flameLightingSvg = await responseFlameLighting.text();

  torchFlame.innerHTML = flameSvg;
  torchLighting.innerHTML = flameLightingSvg;

  flameGroup = document.getElementById('flame-group');
  lightingGroup = document.getElementById('lighting-group');
}