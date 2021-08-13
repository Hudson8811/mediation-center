window.addEventListener('load', () => {
  const appForm = document.querySelector('.application__form');
  const legalStatusNum = 1;//Юридическое лицо

  if (appForm) {
    appForm.addEventListener('change', e => {
      const current = e.target;

      if (current.closest('.__js_legal-status')) {
        const currentVal = parseInt(current.value, 10);
        const parent = e.target.closest('.application__group') || e.target.closest('.application__section');

        if (parent) {
          const agentField = parent.querySelector('.__js_agent');
          const taxNumField = parent.querySelector('.__js_tax-num');

          agentField.classList[currentVal === legalStatusNum ? 'add' : 'remove']('field--disabled');
          taxNumField.classList[currentVal === legalStatusNum ? 'add' : 'remove']('field--disabled');

          agentField.querySelector('.field__input').disabled = currentVal === legalStatusNum;
          taxNumField.querySelector('.field__input').disabled = currentVal === legalStatusNum;

        }
      }
    });
  }

  function setFieldGroup(nem) {
    const groupTemplate = `<div class="application__group">
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
      <label class="field application__field application__field--size-third">
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
    </div>
  </div>`;
  }
});