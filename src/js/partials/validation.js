window.addEventListener('load', function() {
  const form = document.querySelector('.application__form');

  if (form) {
    const checkboxWrapper = form.querySelector('.application__consent');

    if (checkboxWrapper) {

    const checkbox = document.getElementById('applicationConsent');
    const button = form.querySelector('button[type=submit]');

    let triedToSend = false;
    let isValid = false;
    let isEmpty = true;


    const validateForm = (selectChanged) => {
      const requiredInputs = form.querySelectorAll('.required');
      if (requiredInputs.length) {
        requiredInputs.forEach(item => {
          if (item.closest('.application__field').querySelector('.field__error') && selectChanged) {
            hideError(item.closest('.application__field'));
          }

          if (!item.closest('.application__group.hidden') &&
              !item.closest('label.field--disabled') && !selectChanged) {

            if (item.getAttribute('type') === 'text' && item.value.length < 3) {
              showError(item.closest('.application__field'));
            }

            if (item.getAttribute('type') === 'tel') {
              if (item.value === '') {
                showError(item.closest('.application__field'));
              } else if (!isValidPhone(item.value)) {
                showError(item.closest('.application__field'), 'phone');
              }
            }

            if (item.getAttribute('type') === 'number') {
              if (item.value === '') {
                showError(item.closest('.application__field'));
              } else if (!isValidTaxNumber(item.value)) {
                showError(item.closest('.application__field'), 'taxNumber');
              }
            }

            if (item.getAttribute('type') === 'email') {
              if (item.value === '') {
                showError(item.closest('.application__field'))
              } else if (!isValidEmail(item.value)) {
                showError(item.closest('.application__field'), 'email')
              }
            }

            if (item.tagName === 'select' && item.value === '---' || item.value === '') {
              showError(item.closest('.application__field'));
            }

          }
          else{
            if(item.closest('label.field--disabled')){
              hideError(item.closest('.application__field'));
            }
          }

          if (item.closest('.application__field').querySelector('.field__error') && !selectChanged) {
            if (item.getAttribute('type') === 'text' && item.value.length >= 3) {
              hideError(item.closest('.application__field'))
            }

            if (item.getAttribute('type') === 'tel' && item.value.length >= 18) {
              hideError(item.closest('.application__field'))
            }

            if (item.getAttribute('type') === 'number' && isValidTaxNumber(item.value)) {
              hideError(item.closest('.application__field'))
            }

            if (item.getAttribute('type') === 'email' && isValidEmail(item.value)) {
              hideError(item.closest('.application__field'))
            }

            if (item.classList.contains('.__js_select') && item.value !== '---' && item.value !== '') {
              hideError(item.closest('.application__field'))
            }
          }
        })
      }

      if (!checkbox.checked) {
        showError(checkboxWrapper);
      } else {
        hideError(checkboxWrapper);

      }

      checkInputs();

      const invalidInputs = form.querySelectorAll('.field__error');
      const emptyInputs = form.querySelectorAll('.empty');

      isValid = checkbox.checked && !invalidInputs.length && !emptyInputs.length ? true : false;

      toggleButton();
    }

    function isValidEmail(value) {
      const regExp = /.+@.+\..+/i;

      return regExp.test(value);
    }

    function isValidPhone(value) {
      return value.length === 18;
    }

    function isValidTaxNumber(value) {
      return value.length >= 10;
    }

    function checkInputs() {
      const requiredInputs = form.querySelectorAll('.required');

      if (requiredInputs.length) {
        requiredInputs.forEach(item => {
          if (!item.closest('.application__group.hidden') &&
          !item.closest('.field--disabled')) {
            if (!item.classList.contains('empty') && item.value === '' || item.value === '---') {
              item.classList.add('empty');
            }
          }

            if (item.value !== '' && item.value !== '---') {
              if (item.classList.contains('empty')) {
                item.classList.remove('empty');
              }
            }

            if (item.closest('.application__group.hidden') ||
            item.closest('.field--disabled')) {
              if (item.classList.contains('empty')) {
                item.classList.remove('empty');
              }
            }

        })

      }

      if (!checkbox.checked) {
        checkbox.classList.add('empty');
      } else {
        checkbox.classList.remove('empty');
      }
    }

    checkInputs();


    function toggleButton() {
      button.classList[!isValid ? 'add' : 'remove']('button--disabled');
      button.disabled = isValid ? false : true;
      button.closest('.button-wrapper').classList[isValid ? 'remove' : 'add']('button-wrapper--disabled');
    }


    function showError(elem, type = '') {
      if (elem.querySelector('.field__error') && type === '') {
        return;
      }

      if (!triedToSend) {
        return;
      }

      if (elem.querySelector('.field__error')) {
        elem.querySelector('.field__error').remove();
      }

      const errorSpan = document.createElement('div');
      errorSpan.setAttribute('aria-hidden', true);
      errorSpan.classList.add('field__error');
      errorSpan.style.cssText = `
        display: block;
        color: tomato;
        font-size: 14px;
      `;

      switch (type) {
        case '':
          errorSpan.textContent = 'Поле обязательно для заполнения.';
          break;

        case 'email':
          errorSpan.textContent = 'Введен некорректный email.';
          break;

        case 'phone':
          errorSpan.textContent = 'Введен неполный номер.';
          break;

        case 'taxNumber':
          errorSpan.textContent = 'Введен неполный ИНН.';
          break;

        default:
          errorSpan.textContent = 'Поле обязательно для заполнения.';
          break;
      }


      elem.append(errorSpan);
    }


    function hideError(elem) {
      const errorSpan = elem.querySelector('.field__error');

      if (errorSpan) {
        errorSpan.remove();
      }
    }

    toggleButton();


    form.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.button-wrapper')) {
        triedToSend = true;
        validateForm();
      }
    })

    form.addEventListener('change', e => {
      const target = e.target;

      if (target.closest('.__js_legal-status') || target.closest('.__js_sides-count') || target.closest('.__js_student-experience') || target.closest('.__js_teacher-status')) {
        validateForm(true)
      } else {
        validateForm();
      }
    })

    }
  }
})