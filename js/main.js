/* ================================================
   MAIN.JS — Interactions & comportements globaux
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR — scroll + burger + mobile menu ──────────────────────────

  const navbar   = document.querySelector('.navbar');
  const burger   = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.nav-mobile');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger?.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileMenu?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fermer le menu mobile au clic sur un lien
  document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      burger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ── 2. REVEAL ON SCROLL ────────────────────────────────────────────────

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // // ── 3. FORMULAIRE DE CONTACT ───────────────────────────────────────────

  // const form        = document.getElementById('contact-form');
  // const formBox     = document.querySelector('.contact__form-content');
  // const successMsg  = document.querySelector('.form-success');
  // const submitBtn   = document.getElementById('form-submit');

  // if (form) {
  //   form.addEventListener('submit', async (e) => {
  //     e.preventDefault();
  //     if (!validateForm()) return;

  //     // État "loading"
  //     submitBtn.disabled = true;
  //     submitBtn.innerHTML = '<span class="spinner"></span> Envoi en cours…';

  //     // Simuler envoi — remplacer par fetch() vers votre API
  //     await new Promise(resolve => setTimeout(resolve, 1600));

  //     // Succès
  //     const prenom = document.getElementById('f-prenom').value;
  //     document.querySelector('.form-success__title').innerHTML =
  //       `Merci <span>${prenom}</span>&nbsp;!`;
  //     formBox.style.display = 'none';
  //     successMsg?.classList.add('show');
  //   });
  // }

  // // Validation champ par champ
  // function validateForm() {
  //   let valid = true;
  //   const required = form.querySelectorAll('[required]');
  //   required.forEach(field => {
  //     const err = field.closest('.form-group')?.querySelector('.form-error-msg');
  //     if (!field.value.trim()) {
  //       field.classList.add('error');
  //       err?.classList.add('show');
  //       valid = false;
  //     } else {
  //       field.classList.remove('error');
  //       err?.classList.remove('show');
  //     }
  //   });

  //   // Validation email
  //   const email = document.getElementById('f-email');
  //   if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
  //     email.classList.add('error');
  //     const emailErr = email.closest('.form-group')?.querySelector('.form-error-msg');
  //     if (emailErr) { emailErr.textContent = 'Email invalide'; emailErr.classList.add('show'); }
  //     valid = false;
  //   }

  //   return valid;
  // }

  // // Effacer les erreurs à la saisie
  // document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
  //   field.addEventListener('input', () => {
  //     field.classList.remove('error');
  //     field.closest('.form-group')?.querySelector('.form-error-msg')?.classList.remove('show');
  //   });
  // });


  // ── 3. FORMULAIRE DE CONTACT (Formspree) ──────────────────────────────

  const form       = document.getElementById('contact-form');
  const formBox    = document.querySelector('.contact__form-content');
  const successMsg = document.querySelector('.form-success');
  const submitBtn  = document.getElementById('form-submit');

  const FORMSPREE_URL = 'https://formspree.io/f/mkovkayn'; // Formspree OK

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      // Etat chargement
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Envoi en cours...';

      try {
        const response = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });

        if (!response.ok) throw new Error('Erreur reseau');

        // Afficher le message de succes
        const prenom = document.getElementById('f-prenom').value;
        document.querySelector('.form-success__title').innerHTML =
          'Merci <span>' + prenom + '</span>&nbsp;!';
        formBox.style.display = 'none';
        successMsg?.classList.add('show');

      } catch (err) {
        // Remettre le bouton en etat normal
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Envoyer ma demande <span>&#8594;</span>';
        alert('Une erreur est survenue. Veuillez reessayer ou nous contacter par telephone.');
      }
    });
  }

  // Validation champ par champ
  function validateForm() {
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      const err = field.closest('.form-group')?.querySelector('.form-error-msg');
      if (!field.value.trim()) {
        field.classList.add('error');
        err?.classList.add('show');
        valid = false;
      } else {
        field.classList.remove('error');
        err?.classList.remove('show');
      }
    });

    // Validation format email
    const email = document.getElementById('f-email');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      const emailErr = email.closest('.form-group')?.querySelector('.form-error-msg');
      if (emailErr) { emailErr.textContent = 'Email invalide'; emailErr.classList.add('show'); }
      valid = false;
    }

    return valid;
  }

  // Effacer les erreurs a la saisie
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      field.closest('.form-group')?.querySelector('.form-error-msg')?.classList.remove('show');
    });
  });




  // ── 4. SMOOTH SCROLL avec offset navbar ───────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 74;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── 5. COMPTEUR ANIMÉ (stats hero) ────────────────────────────────────

  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, step);
  }

});


/* ================================================
   TOAST — Notification d'accueil
   ================================================ */
(function () {
  const toast    = document.getElementById('toast');
  const closeBtn = document.getElementById('toast-close');
  const progress = document.getElementById('toast-progress');
  let autoTimer;

  function showToast() {
    toast.classList.add('show');
    // Fermeture automatique apres 9s
    autoTimer = setTimeout(hideToast, 9000);
  }

  function hideToast() {
    clearTimeout(autoTimer);
    toast.classList.remove('show');
    toast.classList.add('hide');
    // Stopper la barre de progression
    if (progress) progress.style.animationPlayState = 'paused';
  }

  closeBtn?.addEventListener('click', hideToast);

  // Apparition 1.5s apres le chargement de la page
  setTimeout(showToast, 1500);
})();