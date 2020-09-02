$(".ReactModal__Overlay").hide();
const dropdownLists = $(".vacancy-select-list");
dropdownLists.hide();
let prevShowSelect;
let isItemList = false;

$(".vacancy__send").each(function () {
  $(this).on("click", function () {
    $(".ReactModal__Overlay").fadeToggle();
  });
});

$(".modal-close").each(function () {
  $(this).on("click", function () {
    $(".ReactModal__Overlay").fadeOut();
  });
});

dropdownLists.each(function () {
  $(this).click((e) => {
    e.stopPropagation();
    const target = e.target;
    const parent = e.currentTarget.parentNode;

    if (target.classList.contains("ant-select-selection__placeholder")) {
      parent.querySelector(".ant-select-selection-selected-value").textContent =
        target.textContent;
      prevShowSelect = null;
      $(e.currentTarget).fadeOut();
    }
  });
});

$(".filter-bar__select").click(function () {
  dropdownLists.fadeOut();
  let list = $(this).find(".vacancy-select-list");

  if (prevShowSelect == list[0]) {
    list.fadeOut();
    return;
  }

  list.fadeToggle();
  prevShowSelect = list[0];
});
(function () {
  const phone = document.querySelector('[name="phone"]');

  phone.addEventListener("keyup", (e) => {
    mask('[name="phone"]', "+000(00)000-00-00", e);
  });

  function removeFormTextWarn(input) {
    input.parent().find(".field__error-msg").remove();
  }

  function removeAllFormTextWarn(inputs) {
    inputs.each(function () {
      $(this).parent().find(".field__error-msg").remove();
    });
  }

  function addIndicateWarnForNode(node, classes, isAdded = true) {
    if (isAdded) {
      $(node).closest(".field").addClass(classes);
      return;
    }

    $(node).closest(".field").removeClass(classes);
  }

  function removeNodeByDelay(node, delay) {
    setTimeout(() => {
      node.remove();
    }, delay);
  }

  function validateForm(inputs) {
    let isValid = true;
    inputs.each(function () {
      $(this).on("input", (e) => {
        if ($(e.target).val().replace(/\s+/g, "")) {
          removeFormTextWarn($(this));
          addIndicateWarnForNode($(this), "field--error", false);
          isValid = false;
          return;
        } else {
          removeFormTextWarn($(this));
          $(this)
            .parent()
            .append(
              '<div class="field__error-msg">Это поле обязательное</div>'
            );
          addIndicateWarnForNode($(this), "field--error", true);
          isValid = false;
          return;
        }
      });

      if (!$(this).val().replace(/\s+/g, "")) {
        removeFormTextWarn($(this));
        $(this)
          .parent()
          .append('<div class="field__error-msg">Это поле обязательное</div>');
        addIndicateWarnForNode($(this), "field--error", true);
        isValid = false;
      }
    });

    return isValid;
  }

  $(document).on("click", ".submit__form", (e) => {
    const $form = $(e.target.closest("[data-form]"));
    e.preventDefault();
    const inputs = $form.find($("[name]"));
    const isValid = validateForm(inputs);

    if (isValid) {
      sendAjaxForm("static/mail.php", $form);
    }
  });

  function sendAjaxForm(url, selectorForm) {
    const status = {
      sucess: "Спасибо за заявку мы с вами свяжемся в ближайшее время",
      error: "Ошибка на сервере повторите попытку позже",
    };

    $.ajax({
      url: url, //url страницы (action_ajax_form.php)
      type: "POST", //метод отправки
      dataType: "html", //формат данных
      data: $(selectorForm).serialize(), // Сеарилизуем объект
      success: function (response) {
        //Данные отправлены успешно
        $(selectorForm).append(
          `<div class="form__status">${status.sucess}</div>`
        );
        const msg = $(selectorForm).find(".form__status");
        removeNodeByDelay(msg, 5000);
        $(selectorForm)[0].reset();
      },
      error: function (response) {
        // Данные не отправлены
        $(selectorForm).append(
          `<div class="form__status">${status.error}</div>`
        );
        const msg = $(selectorForm).find(".form__status");

        removeNodeByDelay(msg, 5000);
        $(selectorForm)[0].reset();
      },
    });
  }
})();
