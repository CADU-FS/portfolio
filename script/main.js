document.addEventListener("DOMContentLoaded", () => loadScript(window.matchMedia('(max-width: 1024px)')));

const screenSize = window.matchMedia('(max-width: 1024px)');
screenSize.addEventListener('change', () => loadScript(window.matchMedia('(max-width: 1024px)')));

async function loadScript(screenSize) {
  if (screenSize.matches) {
    await import('./tablet.js');
  } else {
    await import('./desktop.js');
  }
}

// Manage project card click animations before redirect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  console.log('previniu')
  card.addEventListener('click', (e) => {
    const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
    
    // Prevent immediate navigation on mobile/tablet to show animation
    if (!isDesktop) {
      e.preventDefault();
      card.classList.add('clicked');
      
      setTimeout(() => {
        const url = card.getAttribute('href');
        const target = card.getAttribute('target');
        
        if (target === '_blank') {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
        
        card.classList.remove('clicked');
      }, 300); // 300ms matches --transition-fast
    }
  });
});