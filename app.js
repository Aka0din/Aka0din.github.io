const navLinks = [...document.querySelectorAll('.mobile-nav a')];
const navigationPoints = ['accueil', 'logement', 'decouvrir', 'infos']
  .map(id => ({ id, element: document.getElementById(id) }))
  .filter(point => point.element);

let scrollUpdateScheduled = false;

function updateActiveLink() {
  const marker = Math.min(window.innerHeight * 0.28, 260);
  let activeId = navigationPoints[0]?.id;

  for (const point of navigationPoints) {
    if (point.element.getBoundingClientRect().top <= marker) activeId = point.id;
    else break;
  }

  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  scrollUpdateScheduled = false;
}

function scheduleActiveLinkUpdate() {
  if (scrollUpdateScheduled) return;
  scrollUpdateScheduled = true;
  window.requestAnimationFrame(updateActiveLink);
}

window.addEventListener('scroll', scheduleActiveLinkUpdate, { passive: true });
window.addEventListener('resize', scheduleActiveLinkUpdate);
window.addEventListener('hashchange', scheduleActiveLinkUpdate);
updateActiveLink();
