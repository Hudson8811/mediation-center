window.addEventListener('DOMContentLoaded', () => {
	function filesUpload() {
		const uploadBtn = document.querySelector(".application__upload");
		const uploadInput = document.querySelector(
			"input[type=file].field__input--hidden"
		);
		const filesContainer = document.querySelector(".application__file-list");
		let files = [];

		if (!uploadBtn || !uploadInput || !filesContainer) {
			return;
		}

		const createFileHtml = (file) => {
			const fileContainer = document.createElement("div");
			const fileNameText = document.createElement("span");
			const fileRemoveBtn = document.createElement("button");

			fileContainer.classList.add("application__file");
			fileContainer.dataset.filename = file.name;
			fileRemoveBtn.classList.add("application__file-remove");
			fileRemoveBtn.setAttribute("type", "button");

			fileNameText.textContent = file.name;
			fileRemoveBtn.innerHTML = "&times;";

			fileContainer.append(fileNameText);
			fileContainer.append(fileRemoveBtn);

			return fileContainer;
		};

		const triggerInput = () => {
			uploadInput.click();
		};

		const uploadHandler = (event) => {
			if (!event.target.files.length) {
				return;
			}

			if (files.length === 0) {
				files = Array.from(event.target.files);
			} else {
				const tempfiles = Array.from(event.target.files);
				const namespace = [];

				for (let i = 0; i < files.length; i++) {
					const name = files[i].name;
					namespace.push(name);
				}

				const filteredArr = tempfiles.filter(
					(item) => !namespace.includes(item.name)
				);

				files = [...files, ...filteredArr];
			}

			files.forEach((file) => {
				if (!document.querySelector(`[data-filename="${file.name}"]`)) {
					const fileHtml = createFileHtml(file);
					filesContainer.append(fileHtml);
				}
			});
		};

		const removeFile = (el) => {
			const name = el.querySelector("span").textContent;
			const fileHtml = document.querySelector(`[data-filename="${name}"]`);

			fileHtml.remove();
			files = files.filter((file) => file.name !== name);
		};

		const clickHandler = (event) => {
			const target = event.target;
			const removeBtn = target.closest(".application__file-remove");
			if (removeBtn) {
				removeFile(removeBtn.closest(".application__file"));
			}
		};
		uploadBtn.addEventListener("click", triggerInput);
		uploadInput.addEventListener("change", uploadHandler);
		filesContainer.addEventListener("click", clickHandler);
	}

	filesUpload();

  const appForm = document.querySelector('.application__form');
  const jq_appSection = $(appForm).closest('.application');
  const legalStatus = 'Юридическое лицо';
  const orderTypeValueOfMediation='Медиация';
  const orderTypeValueOfPartnersSession='Партнерская сессия';

  if (appForm) {
    const sidesWrapper = document.querySelector('.__js_counterparty');
    const legalStatusFields = document.querySelectorAll('.__js_legal-status');

    const typeSelect = document.querySelector('.__js_mediation-type');


    if (typeSelect) {
      const measuresSelect = document.querySelector('.__js_measures');
      const jq_consentSelects = $('.__js_consent-select-item');


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

      processOrderType();
      validateMediationTypeField();

      if (legalStatusFields.length) {
        legalStatusFields.forEach(it => {
          validateLegalStatusField(it);
        });
      }

      function validateLegalStatusField(current) {
        const currentVal = current.value;
        const parent = current.closest('.application__group') || current.closest('.application__section');

        if (parent) {
          //const agentField = parent.querySelector('.__js_agent');
          const taxNumField = parent.querySelector('.__js_tax-num');
          const sideNameField = parent.querySelector('.__js_side-name');
          const companyNameField = parent.querySelector(".__js_side-company");



          taxNumField.classList[currentVal !== legalStatus ? 'add' : 'remove']('field--disabled');
          sideNameField.classList[currentVal === legalStatus ? 'add' : 'remove']('field--disabled');
					companyNameField.classList[
						currentVal !== legalStatus ? "add" : "remove"
					]("field--disabled");
          // agentField.classList[currentVal !== legalStatus ? 'add' : 'remove']('field--disabled');



          //agentField.querySelector('input').value = '';
          taxNumField.querySelector('input').value = '';
          sideNameField.querySelector('input').value = '';
					companyNameField.querySelector("input").value = "";

          //agentField.querySelector('.field__input').disabled = currentVal !== legalStatus;
          taxNumField.querySelector('.field__input').disabled = currentVal !== legalStatus;
          sideNameField.querySelector('.field__input').disabled = currentVal === legalStatus;
					companyNameField.querySelector(".field__input").disabled = currentVal !== legalStatus;
        }
      }

      function processOrderType() {
        var orderType=$('.__js_order-type input:checked').val();

        $('.__js-application-section--hide--only-partners').show();

        $('.__js_select-business-area').closest('.application__field').show();

        $('.__js_business-area-text-field').prop('disabled', true).closest('.application__field').addClass('field--disabled').hide();



        if(orderType===orderTypeValueOfMediation){
          jq_consentSelects.prop('disabled', false);
          jq_consentSelects.closest('.application__field').removeClass('field--disabled').show();
          $('.__js-application-section--show--only-med').show();
          $('.__js-application-section--show--only-no-med').hide();
          $('.__js_select-business-area').closest('.field').addClass('application__field--size-two-thirds');
        }
        else{
          if(orderType===orderTypeValueOfPartnersSession){
            jq_consentSelects.prop('disabled', true);
            jq_consentSelects.closest('.application__field').addClass('field--disabled').hide();
            $('.__js-application-section--show--only-med').hide();
            $('.__js-application-section--show--only-no-med').show();
            $('.__js-application-section--hide--only-partners').hide();
            $('.__js_select-business-area').closest('.application__field').hide();

            $('.__js_business-area-text-field').prop('disabled', false).closest('.application__field').removeClass('field--disabled').show();

          }else{
            jq_consentSelects.prop('disabled', true);
            jq_consentSelects.closest('.application__field').addClass('field--disabled').hide();
            $('.__js-application-section--show--only-no-med').show();
            $('.__js-application-section--show--only-med').hide();
            $('.__js_select-business-area').closest('.field').removeClass('application__field--size-two-thirds');
          }
        }

      }

      function validateMediationTypeField() {
        const value = typeSelect.value;
        //console.log(value);
        value !== 'Урегулирование спора' ? measuresChoices.disable() : measuresChoices.enable();
        measuresSelect.closest('.field').classList[value !== 'Урегулирование спора' ? 'add' : 'remove']('field--disabled');
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

        teacherNameField.querySelector('input').value = '';
        teacherPhoneField.querySelector('input').value = '';
        teacherRankField.querySelector('input').value = '';
        teacherEmailField.querySelector('input').value = '';

        teacherNameField.querySelector('.field__input').disabled = currentVal !== 'Есть';
        teacherPhoneField.querySelector('.field__input').disabled = currentVal !== 'Есть';
        teacherRankField.querySelector('.field__input').disabled = currentVal !== 'Есть';
        teacherEmailField.querySelector('.field__input').disabled = currentVal !== 'Есть';
      }
    }

    $('.__js_order-type input').on('change',function(){appForm.dispatchEvent(new Event("change"));    });


    appForm.addEventListener('change', e => {
      const current = e.target;

		if (typeof processOrderType === "function") {
			processOrderType();
		}

      if (current.closest('.__js_legal-status')) {
        validateLegalStatusField(current);
      }

      if (current.closest('.__js_teacher-status')) {
        validateTeacherExistence(current);
      }

      if (current.closest('.__js_sides-count')) {
        const count = parseInt(current.value, 10) - 1;
        const sidesGroups = document.querySelectorAll('.application__sides-group');

        sidesGroups.forEach((group, index) => {
          if (index <= count) {
            group.classList.remove('hidden');
          } else if (index > count && !group.classList.contains('hidden')) {
            group.classList.add('hidden');
          }
        })
      }

      if (current.closest('.__js_students-count')) {
        const count = parseInt(current.value, 10) - 1;
        const studentsGroups = document.querySelectorAll('.application__students-group');

        studentsGroups.forEach((group, index) => {
          if (index <= count) {
            group.classList.remove('hidden');
          } else if (index > count && !group.classList.contains('hidden')) {
            group.classList.add('hidden');
          }
        })

      }

      if (typeSelect) {
        validateMediationTypeField();
      }
    });
  }

  //function setFieldGroup(num) {
  //  const formType = appForm.id;

  //  switch (formType) {
  //    case 'orderForm':
  //      group.innerHTML = orderFormHTML;
  //      break;

  //    case 'contestForm':
  //      group.innerHTML = contestFormHTML;
  //      break;
  //  }

  //  const selects = group.querySelectorAll('.__js_select');
  //  const legalStatusFields = group.querySelectorAll('.__js_legal-status');

  //  if (selects.length) {
  //    selects.forEach(it => {
  //      const choices = new Choices(it, {
  //        searchEnabled: false,
  //        shouldSort: false,
  //        shouldSortItems: false,
  //        loadingText: 'Загрузка...',
  //        noResultsText: 'Ничего не найдено',
  //        noChoicesText: 'Нет элементов для выбора',
  //        itemSelectText: '',
  //        addItemText: (value) => {
  //          return `Нажмите Enter чтобы добавить <b>"${value}"</b>`;
  //        },
  //        maxItemText: (maxItemCount) => {
  //          return `Only ${maxItemCount} values can be added`;
  //        },
  //        valueComparer: (value1, value2) => {
  //          return value1 === value2;
  //        }

  //      });
  //    });
  //  }

  //  if (legalStatusFields.length) {
  //    legalStatusFields.forEach(it => {
  //      validateLegalStatusField(it);
  //    })
  //  }

  //  return group;
  //}
});