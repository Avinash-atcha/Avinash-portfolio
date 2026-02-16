// All JS will run after the HTML is loaded

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1) Scroll reveal animations =====

  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Once it has animated in, stop observing it

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18                                        // when ~18% is visible, animate
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ===== 2) Active nav highlight on scroll =====

  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Collect sections that match nav links

  const sections = [];
  navLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1);    // remove '#'
    const sec = document.getElementById(id);
    if (sec) sections.push(sec);
  });

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(link => {
          const linkTarget = link.getAttribute('href');
          link.classList.toggle('active', linkTarget === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.45                                     // section ~45% visible = "active"
  });

  sections.forEach(sec => activeObserver.observe(sec));


  // ===== 3) Always start at top on reload =====

  window.scrollTo(0, 0);


  // ===== 4) Typewriter effect for hero role text =====

  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    const fullText = roleEl.textContent.trim();
    roleEl.textContent = "";                           // clear initial text
    let index = 0;
    const speed = 60;                                  // ms per character

    function typeNext() {
      roleEl.textContent = fullText.slice(0, index);
      index++;
      if (index <= fullText.length) {
        setTimeout(typeNext, speed);
      }
    }

    typeNext();
  }

  // ===== 5) Dynamic Footer Year =====
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent =
      `© ${new Date().getFullYear()} Avinash Atcha — Where creativity meets code 🔥💡 Turning ideas into impact 🚀`;
  }
});

