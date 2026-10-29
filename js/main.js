/**
 * Back to the Past Video - Main JavaScript
 * Lightweight, Vanilla JS (No external libraries required)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollNav();
  initPricingCalculator();
  initContactForm();
  initLightbox();
  initBackToTop();
});

/* -------------------------------------------------------------------------
   1. Mobile Navigation Toggle
   ------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* -------------------------------------------------------------------------
   2. Active Nav Link on Scroll
   ------------------------------------------------------------------------- */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------------------
   3. Interactive Pricing & Estimate Calculator
   ------------------------------------------------------------------------- */
function initPricingCalculator() {
  const calcContainer = document.querySelector('.calculator-wrapper');
  if (!calcContainer) return;

  const inputs = {
    vhsHours: document.getElementById('calc-vhs-hours'),
    cassettes: document.getElementById('calc-cassettes'),
    audioReels: document.getElementById('calc-audio-reels'),
    reels3: document.getElementById('calc-reels-3'),
    reels5: document.getElementById('calc-reels-5'),
    reels7: document.getElementById('calc-reels-7'),
    slidesNegatives: document.getElementById('calc-slides-negatives'),
    printedPhotos: document.getElementById('calc-printed-photos'),
    photoAlbums: document.getElementById('calc-photo-albums'),
    tapeRepair: document.getElementById('calc-tape-repair'),
    extraCopies: document.getElementById('calc-extra-copies')
  };

  // Stepper buttons (+ / -)
  document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const action = btn.getAttribute('data-action');
      const input = document.getElementById(targetId);
      if (!input) return;

      let val = parseInt(input.value, 10) || 0;
      if (action === 'plus') {
        val += 1;
      } else if (action === 'minus') {
        val = Math.max(0, val - 1);
      }
      input.value = val;
      calculateEstimate();
    });
  });

  // Direct input change
  Object.values(inputs).forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        let val = parseInt(input.value, 10);
        if (isNaN(val) || val < 0) {
          input.value = 0;
        }
        calculateEstimate();
      });
    }
  });

  function calculateEstimate() {
    const vhsHours = parseInt(inputs.vhsHours?.value, 10) || 0;
    const cassettes = parseInt(inputs.cassettes?.value, 10) || 0;
    const audioReels = parseInt(inputs.audioReels?.value, 10) || 0;
    const reels3 = parseInt(inputs.reels3?.value, 10) || 0;
    const reels5 = parseInt(inputs.reels5?.value, 10) || 0;
    const reels7 = parseInt(inputs.reels7?.value, 10) || 0;
    const slidesNegatives = parseInt(inputs.slidesNegatives?.value, 10) || 0;
    const printedPhotos = parseInt(inputs.printedPhotos?.value, 10) || 0;
    const photoAlbums = parseInt(inputs.photoAlbums?.value, 10) || 0;
    const tapeRepair = parseInt(inputs.tapeRepair?.value, 10) || 0;
    const extraCopies = parseInt(inputs.extraCopies?.value, 10) || 0;

    // Pricing rates
    const vhsCost = vhsHours * 10;
    const cassetteCost = cassettes * 20;
    const audioReelsCost = audioReels * 30;
    const reels3Cost = reels3 * 15;
    const reels5Cost = reels5 * 40;
    const reels7Cost = reels7 * 80;

    // Slides & Negatives discount: $0.45 if > 250, else $0.50
    const slideRate = slidesNegatives > 250 ? 0.45 : 0.50;
    const slidesCost = Math.round(slidesNegatives * slideRate * 100) / 100;

    const photosCost = Math.round(printedPhotos * 0.15 * 100) / 100;
    const albumsCost = photoAlbums * 10;
    const repairCost = tapeRepair * 20;
    const copiesCost = extraCopies * 10;

    // Subtotal updates on page
    setSubtotal('subtotal-vhs', vhsCost);
    setSubtotal('subtotal-cassettes', cassetteCost);
    setSubtotal('subtotal-audio-reels', audioReelsCost);
    setSubtotal('subtotal-reels-3', reels3Cost);
    setSubtotal('subtotal-reels-5', reels5Cost);
    setSubtotal('subtotal-reels-7', reels7Cost);
    setSubtotal('subtotal-slides', slidesCost);
    setSubtotal('subtotal-photos', photosCost);
    setSubtotal('subtotal-albums', albumsCost);
    setSubtotal('subtotal-repair', repairCost);
    setSubtotal('subtotal-copies', copiesCost);

    const rawTotal = vhsCost + cassetteCost + audioReelsCost + reels3Cost + reels5Cost + reels7Cost + slidesCost + photosCost + albumsCost + repairCost + copiesCost;

    // Check $20 minimum fee rule
    let effectiveTotal = rawTotal;
    const minFeeNotice = document.getElementById('calc-min-fee-note');
    if (rawTotal > 0 && rawTotal < 20) {
      effectiveTotal = 20;
      if (minFeeNotice) minFeeNotice.style.display = 'block';
    } else {
      if (minFeeNotice) minFeeNotice.style.display = 'none';
    }

    const totalEl = document.getElementById('calc-total-amount');
    if (totalEl) {
      totalEl.textContent = `$${effectiveTotal.toFixed(2)}`;
    }

    const itemCountEl = document.getElementById('calc-item-count');
    const totalItems = (vhsHours > 0 ? 1 : 0) + cassettes + audioReels + reels3 + reels5 + reels7 + (slidesNegatives > 0 ? 1 : 0) + (printedPhotos > 0 ? 1 : 0) + photoAlbums + tapeRepair + extraCopies;
    if (itemCountEl) {
      itemCountEl.textContent = `${totalItems} categor${totalItems === 1 ? 'y' : 'ies'}`;
    }
  }

  function setSubtotal(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = `$${val.toFixed(2)}`;
  }

  // Initial calculation
  calculateEstimate();

  // Send estimate to contact form button
  const transferBtn = document.getElementById('apply-estimate-btn');
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const summaryParts = [];
      const vhs = parseInt(inputs.vhsHours?.value, 10) || 0;
      if (vhs > 0) summaryParts.push(`• Video Tape Conversion: ~${vhs} hours ($${vhs * 10})`);

      const cassettes = parseInt(inputs.cassettes?.value, 10) || 0;
      if (cassettes > 0) summaryParts.push(`• Audio Cassettes: ${cassettes} tape(s) ($${cassettes * 20})`);

      const audioReels = parseInt(inputs.audioReels?.value, 10) || 0;
      if (audioReels > 0) summaryParts.push(`• Audio Reels: ${audioReels} reel(s) ($${audioReels * 30})`);

      const r3 = parseInt(inputs.reels3?.value, 10) || 0;
      if (r3 > 0) summaryParts.push(`• 8mm/Super8 3" Reels: ${r3} reel(s) ($${r3 * 15})`);

      const r5 = parseInt(inputs.reels5?.value, 10) || 0;
      if (r5 > 0) summaryParts.push(`• 8mm/Super8 5" Reels: ${r5} reel(s) ($${r5 * 40})`);

      const r7 = parseInt(inputs.reels7?.value, 10) || 0;
      if (r7 > 0) summaryParts.push(`• 8mm/Super8 7" Reels: ${r7} reel(s) ($${r7 * 80})`);

      const slides = parseInt(inputs.slidesNegatives?.value, 10) || 0;
      if (slides > 0) summaryParts.push(`• Film Negatives / Slides: ${slides} photo(s)`);

      const photos = parseInt(inputs.printedPhotos?.value, 10) || 0;
      if (photos > 0) summaryParts.push(`• Printed Photo Scans: ${photos} photo(s)`);

      const albums = parseInt(inputs.photoAlbums?.value, 10) || 0;
      if (albums > 0) summaryParts.push(`• Photo Albums: ${albums} album(s)`);

      const repair = parseInt(inputs.tapeRepair?.value, 10) || 0;
      if (repair > 0) summaryParts.push(`• Tape Repair / Mold Cleaning: ${repair} tape(s)`);

      const copies = parseInt(inputs.extraCopies?.value, 10) || 0;
      if (copies > 0) summaryParts.push(`• Additional Copies / Drives: ${copies}`);

      const totalText = document.getElementById('calc-total-amount')?.textContent || '$0.00';

      const notesField = document.getElementById('contact-notes');
      if (notesField) {
        let msg = `Hi Stephen,\n\nI used your online calculator to prepare an estimate:\n\n`;
        if (summaryParts.length > 0) {
          msg += summaryParts.join('\n') + `\n\nEstimated Total: ${totalText}\n\n`;
        } else {
          msg += `(No items selected yet)\n\n`;
        }
        msg += `Please let me know when we can arrange drop-off/pick-up. Thanks!`;
        notesField.value = msg;

        // Smooth scroll to contact
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        showToast('Estimate copied to contact form below!');
      }
    });
  }
}

/* -------------------------------------------------------------------------
   4. Contact Form Handler & Copy to Clipboard
   ------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('quote-form');
  const copyBtn = document.getElementById('copy-quote-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim() || '';
      const city = document.getElementById('contact-city')?.value.trim() || '';
      const formats = document.getElementById('contact-formats')?.value.trim() || '';
      const notes = document.getElementById('contact-notes')?.value.trim() || '';

      const subject = encodeURIComponent(`Service Enquiry from ${name || 'Customer'} - Back to the Past Video`);
      let bodyText = `Name: ${name}\nCity: ${city}\nMedia Formats: ${formats}\n\nNotes / Items:\n${notes}`;
      const mailtoLink = `mailto:Stephen@backtothepastvideo.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      // Open email client
      window.location.href = mailtoLink;
      showToast('Opening your email client...');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const name = document.getElementById('contact-name')?.value.trim() || '';
      const city = document.getElementById('contact-city')?.value.trim() || '';
      const formats = document.getElementById('contact-formats')?.value.trim() || '';
      const notes = document.getElementById('contact-notes')?.value.trim() || '';

      const textToCopy = `To: Stephen@backtothepastvideo.com\nSubject: Service Enquiry - Back to the Past Video\n\nName: ${name}\nCity: ${city}\nMedia Formats: ${formats}\n\nDetails:\n${notes}`;

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          showToast('Message details copied to clipboard!');
        })
        .catch(() => {
          showToast('Could not copy automatically. Please select text manually.');
        });
    });
  }
}

/* -------------------------------------------------------------------------
   5. Lightbox Modal
   ------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !imgEl) return;

  // Open modal on gallery or service image clicks
  document.querySelectorAll('.gallery-card, .service-card-media, .hero-image-card').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      imgEl.src = img.src;
      imgEl.alt = img.alt || 'Back to the Past Video image';
      const caption = item.getAttribute('data-caption') || img.getAttribute('title') || img.alt || '';
      if (captionEl) captionEl.textContent = caption;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------------
   6. Back to Top Button
   ------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------------------------------------------------------------
   Utility: Toast Notification
   ------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
