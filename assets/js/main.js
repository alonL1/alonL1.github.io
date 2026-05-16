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

const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('is-open')) return;
    if (event.target.closest('[data-nav]') || event.target.closest('[data-nav-toggle]')) return;
    closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });
}

const navLinks = Array.from(document.querySelectorAll('[data-nav] a'));

const setActiveLink = (matchHash) => {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
  let active = null;

  if (matchHash) {
    active = navLinks.find((link) => {
      const url = new URL(link.href);
      return url.pathname === currentPath && url.hash === matchHash;
    });
  }

  if (!active) {
    active = navLinks.find((link) => {
      const url = new URL(link.href);
      return url.pathname === currentPath && (matchHash ? url.hash === matchHash : !url.hash);
    });
  }

  navLinks.forEach((link) => link.classList.toggle('is-active', link === active));
};

const isHome = (() => {
  const p = window.location.pathname.replace(/\/index\.html$/, '/');
  return p === '/' || p === '';
})();

if (isHome && 'IntersectionObserver' in window) {
  const sectionIds = ['about', 'projects', 'skills', 'goals', 'contact'];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let activeId = null;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId = entry.target.id;
          setActiveLink('#' + activeId);
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
  setActiveLink(window.location.hash || null);
} else {
  setActiveLink(window.location.hash || null);
}

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

const isMobileViewport = () => window.matchMedia('(max-width: 720px)').matches;

const isVisible = (el) => el && getComputedStyle(el).display !== 'none';

const getLineHeightPx = (el) => {
  const cs = getComputedStyle(el);
  const fs = parseFloat(cs.fontSize) || 16;
  const lhStr = cs.lineHeight;
  if (!lhStr || lhStr === 'normal') return fs * 1.2;
  const num = parseFloat(lhStr);
  if (Number.isNaN(num)) return fs * 1.2;
  return lhStr.endsWith('px') ? num : num * fs;
};

const setClamp = (el, lines) => {
  el.style.setProperty('-webkit-line-clamp', String(lines));
  el.style.setProperty('line-clamp', String(lines));
};

const clearClamp = (el) => {
  el.style.removeProperty('-webkit-line-clamp');
  el.style.removeProperty('line-clamp');
};

const linesThatFit = (el, height) => {
  const lh = getLineHeightPx(el);
  if (!lh || height <= 0) return 1;
  return Math.max(1, Math.floor(height / lh));
};

const fitRoleClamp = () => {
  const mobile = isMobileViewport();

  projectCards.forEach((card) => {
    if (card.classList.contains('is-open')) return;
    const block = card.querySelector('.project-summary-block');
    if (!block) return;

    const role = card.querySelector('.project-role-preview');
    const shortSummary = card.querySelector('.project-short-summary');
    const shortRole = card.querySelector('.project-short-role');

    if (role) clearClamp(role);
    if (shortSummary) clearClamp(shortSummary);
    if (shortRole) clearClamp(shortRole);

    void block.offsetHeight;

    if (mobile) {
      if (!isVisible(shortSummary) || !isVisible(shortRole)) return;

      // Stabilize block size: clamp both to 1 line so flex layout doesn't shrink the block.
      setClamp(shortSummary, 1);
      setClamp(shortRole, 1);
      void block.offsetHeight;

      const title = card.querySelector('.project-title');
      const titleH = title ? title.offsetHeight : 0;
      const blockStyle = getComputedStyle(block);
      const gap = parseFloat(blockStyle.rowGap) || parseFloat(blockStyle.gap) || 0;
      const blockH = block.clientHeight;
      const totalAvailable = Math.max(0, blockH - titleH - gap * 2);

      const summaryLH = getLineHeightPx(shortSummary);
      const roleLH = getLineHeightPx(shortRole);

      // Measure summary's natural line count (with clamp cleared).
      clearClamp(shortSummary);
      void shortSummary.offsetHeight;
      const summaryNaturalLines = Math.max(1, Math.ceil(shortSummary.scrollHeight / summaryLH));

      // Cap summary at half-share lines so role always gets at least half.
      const halfShareLines = Math.max(1, Math.floor((totalAvailable / 2) / summaryLH));
      const summaryLines = Math.min(summaryNaturalLines, halfShareLines);
      setClamp(shortSummary, summaryLines);
      void shortSummary.offsetHeight;

      // Role gets all the space summary didn't use.
      const summaryActualH = shortSummary.offsetHeight;
      const remainingForRole = Math.max(0, totalAvailable - summaryActualH);
      const roleLines = Math.max(1, Math.floor(remainingForRole / roleLH));
      setClamp(shortRole, roleLines);
    } else {
      if (!isVisible(role)) return;
      const blockStyle = getComputedStyle(block);
      const gap = parseFloat(blockStyle.rowGap) || parseFloat(blockStyle.gap) || 0;
      const blockH = block.clientHeight;
      let used = 0;
      let count = 0;
      Array.from(block.children).forEach((child) => {
        if (child === role) return;
        if (!isVisible(child)) return;
        used += child.offsetHeight;
        count += 1;
      });
      const available = Math.max(0, blockH - used - gap * count);
      setClamp(role, linesThatFit(role, available));
    }
  });
};

const scheduleFit = () => {
  if (scheduleFit._t) cancelAnimationFrame(scheduleFit._t);
  scheduleFit._t = requestAnimationFrame(fitRoleClamp);
};

window.addEventListener('load', fitRoleClamp);
window.addEventListener('resize', scheduleFit);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitRoleClamp);
}
fitRoleClamp();
