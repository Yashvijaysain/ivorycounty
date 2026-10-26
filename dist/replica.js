(function () {
  function showLocalSuccess() {
    var form = document.getElementById('global_form');
    if (!form) return;

    var required = ['Name', 'Mobile', 'E-Mail'];
    var missing = required.some(function (name) {
      var field = form.elements[name];
      return !field || !String(field.value || '').trim();
    });

    var existing = form.querySelector('.replica-success');
    if (existing) existing.remove();

    var message = document.createElement('div');
    message.className = 'replica-success';
    message.setAttribute('role', 'status');
    message.textContent = missing
      ? 'Please complete your name, mobile number and e-mail.'
      : 'Thank you. This independent site does not transmit your form data.';
    form.appendChild(message);

    if (!missing) form.reset();
  }

  window.replicaInquiry = showLocalSuccess;
  window.global_form_corporate = showLocalSuccess;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var brochurePopup = document.getElementById('brochure-popup');
  var brochureForm = document.getElementById('brochure-download-form');
  var brochureName = document.getElementById('brochure-name');
  var brochurePhone = document.getElementById('brochure-phone');
  var brochureError = document.getElementById('brochure-form-error');
  var lastFocusedElement = null;

  function openBrochurePopup() {
    if (!brochurePopup) return;
    lastFocusedElement = document.activeElement;
    brochurePopup.classList.remove('is-complete');
    brochurePopup.hidden = false;
    document.body.classList.add('brochure-popup-open');
    window.setTimeout(function () {
      if (brochureName) brochureName.focus();
    }, 120);
  }

  function closeBrochurePopup() {
    if (!brochurePopup) return;
    brochurePopup.hidden = true;
    document.body.classList.remove('brochure-popup-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  window.openBrochurePopup = openBrochurePopup;

  if (brochurePopup) {
    brochurePopup.querySelectorAll('[data-brochure-close]').forEach(function (control) {
      control.addEventListener('click', closeBrochurePopup);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !brochurePopup.hidden) {
        closeBrochurePopup();
      }
    });
  }

  if (brochureForm) {
    brochureForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var nameValue = String(brochureName.value || '').trim();
      var phoneValue = String(brochurePhone.value || '').trim();
      var phoneDigits = phoneValue.replace(/\D/g, '');

      brochureError.textContent = '';

      if (nameValue.length < 2) {
        brochureError.textContent = 'Please enter your name.';
        brochureName.focus();
        return;
      }

      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        brochureError.textContent = 'Please enter a valid phone number.';
        brochurePhone.focus();
        return;
      }

      brochurePopup.classList.add('is-complete');
      brochureForm.reset();
    });
  }

  window.addEventListener('load', function () {
    window.setTimeout(openBrochurePopup, 450);
  });
})();
