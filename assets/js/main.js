const projectCards = document.querySelectorAll('[data-project-card]');

const closeCard = (card) => {
  card.classList.remove('is-open');
  const expanded = card.querySelector('.project-expanded');
  if (expanded) {
    expanded.hidden = true;
  }
  const rolePreview = card.querySelector('.project-role-preview');
  if (rolePreview) {
    rolePreview.hidden = false;
  }
  const toggle = card.querySelector('[data-project-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = toggle.dataset.openLabel || 'View details';
  }
};

const openCard = (card) => {
  projectCards.forEach((other) => {
    if (other !== card && other.classList.contains('is-open')) {
      closeCard(other);
    }
  });
  card.classList.add('is-open');
  const expanded = card.querySelector('.project-expanded');
  if (expanded) {
    expanded.hidden = false;
  }
  const rolePreview = card.querySelector('.project-role-preview');
  if (rolePreview) {
    rolePreview.hidden = true;
  }
  const toggle = card.querySelector('[data-project-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.textContent = toggle.dataset.closeLabel || 'Collapse';
  }
};

document.addEventListener('click', (event) => {
  const card = event.target.closest('[data-project-card]');
  if (!card) {
    return;
  }

  const toggle = event.target.closest('[data-project-toggle]');
  if (toggle) {
    event.preventDefault();
    if (card.classList.contains('is-open')) {
      closeCard(card);
    } else {
      openCard(card);
    }
    return;
  }

  if (event.target.closest('a')) {
    return;
  }

  if (!card.classList.contains('is-open')) {
    openCard(card);
  }
});

projectCards.forEach((card) => {
  const expanded = card.querySelector('.project-expanded');
  if (expanded) {
    expanded.hidden = true;
  }
  const rolePreview = card.querySelector('.project-role-preview');
  if (rolePreview) {
    rolePreview.hidden = false;
  }
});
