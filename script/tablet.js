// DOM elements to be removed when screen size changes
const elementsToRemove = document.getElementsByClassName('tablet-remove');

// DOM elements for torch and image container
const torchBtn = document.getElementById('torchBtn');
const imageContainer = document.getElementById('dynamicImage');

// DOM elements for flame and mask
const torchFlame = document.getElementById('torch-flame');
const torchLighting = document.getElementById('torch-lighting');

let flameGroup;
let lightingGroup;

// Fetch and inject SVGs
await fetchSvg();

// Fetch and inject SVGs
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

// Media query to disable elements on other screens
const mediaQuery = window.matchMedia('(max-width: 1024px) and (min-width: 769px)');
mediaQuery.addEventListener('change', () => toggleElements(mediaQuery));

// Adds or removes elements based on screen size
async function toggleElements(mediaQuery) {
  if (mediaQuery.matches) {
    await fetchSvg();
  } else {
    Array.from(elementsToRemove).forEach(node => {
      node.innerHTML = '';
    });
  }
}

// Toggle torch state
if (torchBtn) {
  torchBtn.addEventListener('click', () => {
    imageContainer.classList.toggle('lit-up');
    torchBtn.classList.toggle('lit-up');
  });
}