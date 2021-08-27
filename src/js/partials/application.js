window.addEventListener('DOMContentLoaded', () => {
  const appForm = document.querySelector('.application__form');
  const legalStatusNum = 1;//Юридическое лицо

  if (appForm) {
    const sidesWrapper = document.querySelector('.__js_counterparty');
    const legalStatusFields = document.querySelectorAll('.__js_legal-status');

    const typeSelect = document.querySelector('.__js_mediation-type');

    if (typeSelect) {
      const measuresSelect = document.querySelector('.__js_measures');

      const measuresChoices = new Choices(measuresSelect, {
        searchEnabled: false,
        shouldSort: false,
        shouldSortItems: false,
        loadingText: 'Загрузка...',
        noResultsText: 'Ничего не найдено',
        noChoicesText: 'Нет элементов для выбора',
        itemSelectText: '',
        addItemText: (value) => {
          return `Нажмите Enter чтобы добавить <b>"${value}"</b>`;
        },
        maxItemText: (maxItemCount) => {
          return `Only ${maxItemCount} values can be added`;
        },
        valueComparer: (value1, value2) => {
          return value1 === value2;
        }
      });

      validateMediationTypeField();

      if (legalStatusFields.length) {
        legalStatusFields.forEach(it => {
          validateLegalStatusField(it);
        });
      }

      function validateLegalStatusField(current) {
        const currentVal = parseInt(current.value, 10);
        const parent = current.closest('.application__group') || current.closest('.application__section');

        if (parent) {
          const agentField = parent.querySelector('.__js_agent');
          const taxNumField = parent.querySelector('.__js_tax-num');
          const sideNameField = parent.querySelector('.__js_side-name');

          agentField.classList[currentVal !== legalStatusNum ? 'add' : 'remove']('field--disabled');
          taxNumField.classList[currentVal !== legalStatusNum ? 'add' : 'remove']('field--disabled');
          sideNameField.classList[currentVal === legalStatusNum ? 'add' : 'remove']('field--disabled');

          agentField.querySelector('.field__input').disabled = currentVal !== legalStatusNum;
          taxNumField.querySelector('.field__input').disabled = currentVal !== legalStatusNum;
          sideNameField.querySelector('.field__input').disabled = currentVal === legalStatusNum;
        }
      }

      function validateMediationTypeField() {
        const value = parseInt(typeSelect.value, 10);
        value !== 2 ? measuresChoices.disable() : measuresChoices.enable();
        measuresSelect.closest('.field').classList[value !== 2 ? 'add' : 'remove']('field--disabled');
      }
    }

    function validateTeacherExistence(current) {
      const currentVal = current.value;
      const parent = current.closest('.application__group') || current.closest('.application__section');

      if (parent) {
        const teacherNameField = parent.querySelector('.__js_teacher-name');
        const teacherPhoneField = parent.querySelector('.__js_teacher-phone');
        const teacherRankField = parent.querySelector('.__js_teacher-rank');
        const teacherEmailField = parent.querySelector('.__js_teacher-email');

        teacherNameField.classList[currentVal !== 'Есть' ? 'add' : 'remove']('field--disabled');
        teacherPhoneField.classList[currentVal !== 'Есть' ? 'add' : 'remove']('field--disabled');
        teacherRankField.classList[currentVal !== 'Есть' ? 'add' : 'remove']('field--disabled');
        teacherEmailField.classList[currentVal !== 'Есть' ? 'add' : 'remove']('field--disabled');

        teacherNameField.querySelector('.field__input').disabled = currentVal !== 'Есть';
        teacherPhoneField.querySelector('.field__input').disabled = currentVal !== 'Есть';
        teacherRankField.querySelector('.field__input').disabled = currentVal !== 'Есть';
        teacherEmailField.querySelector('.field__input').disabled = currentVal !== 'Есть';
      }
    }

    appForm.addEventListener('submit', e => {
      const target = e.target;

      const requiredCheckbox = document.getElementById('applicationPersonal') ?? document.getElementById('applicationConsent');

      if ( requiredCheckbox && !requiredCheckbox.checked) {
        e.preventDefault();
      }
      
    });

    appForm.addEventListener('change', e => {
      const current = e.target;

      if (current.closest('.__js_legal-status')) {
        validateLegalStatusField(current);
      }

      if (current.closest('.__js_teacher-status')) {
        validateTeacherExistence(current);
      }

      if (current.closest('.__js_sides-count') || current.closest('.__js_students-count')) {
        const count = parseInt(current.value, 10);
        const fragment = document.createDocumentFragment();
        sidesWrapper.innerHTML = '';

        if (count > 1) {
          for (let i = 1; i < count; i++) {
            fragment.append(setFieldGroup(i + 1))
          }

          sidesWrapper.append(fragment);
        }

      }

      if (typeSelect) {
        validateMediationTypeField();
      }

    });

  }

  function setFieldGroup(num) {
    const group = document.createElement('div');
    group.classList.add('application__group');

    const contestFormHTML = `
      <div class="application__group">
        <div class="application__row">
          <div class="application__row-left">
            <div class="application__title--inside-row title--green title--size-xxs title">Заполните данные студента ${num}</div>
          </div>
          <div class="application__row-right">
            <label class="field application__field application__field--size-half __js_student-name"><span class="field__hint">ФИО</span>
              <input class="field__input" type="text" name="student-name${num}">
            </label>
            <label class="field application__field application__field--size-half __js_student-speciality"><span class="field__hint">Специализация</span>
              <input class="field__input" type="text" name="student-speciality${num}">
            </label>
            <label class="field application__field application__field--size-half __js_course"><span class="field__hint">Курс</span>
              <input class="field__input" type="text" name="course${num}">
            </label>
            <label class="field application__field application__field--text-green application__field--size-half application__field--size-mdfull"><span class="field__hint">Опыт участия в Moot Courts</span>
              <select class="field__input __js_select __js_student-experience" name="student-experience${num}"> 
                <option value="1">Нет</option>
                <option value="2">Да</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    `;

    const orderFormHTML = `
    <div class="application__row">
      <label class="field application__field application__field--size-third">
        <span class="field__hint">Сторона-контрагент ${num}</span>
        <select class="field__input __js_select __js_legal-status" name="counterparty${num}" >
          <option value="1">Юридическое лицо</option>
          <option value="2">ИП</option>
          <option value="3">Физическое лицо</option>
        </select>
      </label>
      <label class="field application__field application__field--size-third">
        <span class="field__hint">Согласие на участие в процедуре медиации</span>
        <select class="field__input __js_select" name="mediation-consent${num}">
          <option value="1">Согласна</option>
          <option value="2">Не обсуждали эту возможность</option>
          <option value="3">Не cогласна</option>
        </select>
      </label>
    </div>
    <div class="application__row">
      <label class="field application__field application__field--size-third __js_side-name">
        <span class="field__hint">ФИО стороны-котрагента</span>
        <input class="field__input" type="text" name="counterparty-name${num}">
      </label>
      <label class="field application__field application__field--size-third __js_agent">
        <span class="field__hint">ФИО представителя стороны-котрагента</span>
        <input class="field__input" type="text" name="representative-counterparty-name${num}">
      </label>
      <label class="field application__field application__field--size-third __js_tax-num">
        <span class="field__hint">ИНН стороны-котрагента</span>
        <input class="field__input" type="number" name="counterparty-tax-number${num}">
      </label>
      <label class="field application__field application__field--size-third">
        <span class="field__hint">Контактный телефон стороны-котрагента</span>
        <input class="field__input" type="tel" name="counterparty-phone${num}">
      </label>
      <label class="field application__field application__field--size-third">
        <span class="field__hint">Email стороны-котрагента</span>
        <input class="field__input" type="email" name="counterparty-email${num}">
      </label>
    </div>`;

    const formType = appForm.id;

    switch (formType) {
      case 'orderForm':
        group.innerHTML = orderFormHTML;
        break;
    
      case 'contestForm':
        group.innerHTML = contestFormHTML;
        break;
    }

    const selects = group.querySelectorAll('.__js_select');
    const legalStatusFields = group.querySelectorAll('.__js_legal-status');

    if (selects.length) {
      selects.forEach(it => {
        const choices = new Choices(it, {
          searchEnabled: false,
          shouldSort: false,
          shouldSortItems: false,
          loadingText: 'Загрузка...',
          noResultsText: 'Ничего не найдено',
          noChoicesText: 'Нет элементов для выбора',
          itemSelectText: '',
          addItemText: (value) => {
            return `Нажмите Enter чтобы добавить <b>"${value}"</b>`;
          },
          maxItemText: (maxItemCount) => {
            return `Only ${maxItemCount} values can be added`;
          },
          valueComparer: (value1, value2) => {
            return value1 === value2;
          }
          
        });
      });
    }

    if (legalStatusFields.length) {
      legalStatusFields.forEach(it => {
        validateLegalStatusField(it);
      })
    }

    return group;
  }
});