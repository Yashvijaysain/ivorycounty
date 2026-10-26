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
})();
