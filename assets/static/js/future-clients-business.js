document.addEventListener("DOMContentLoaded", () => {
    (function() {
        function removeFormTextWarn(input) {
            input.parent().find(".field__error-msg").remove();
        }

        function removeAllFormTextWarn(inputs) {
            inputs.each(function() {
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
            inputs.each(function() {
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
                        .append(
                            '<div class="field__error-msg">Это поле обязательное</div>'
                        );
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
                success: function(response) {
                    //Данные отправлены успешно
                    $(selectorForm).append(
                        `<div class="form__status">${status.sucess}</div>`
                    );
                    const msg = $(selectorForm).find(".form__status");
                    removeNodeByDelay(msg, 5000);
                    $(selectorForm)[0].reset();
                },
                error: function(response) {
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

    $(".projects-slider--proj").on(
        "init",
        (_, slick, currentSlide = 0, nextSlide = 0) => {
            $(".swiper-pagination-current").text(currentSlide + 1);
            $(".swiper-pagination-total").text(slick.$slides.length);
        }
    );

    $(".projects-slider--proj").on(
        "afterChange",
        (_, slick, currentSlide = 0, nextSlide = 0) => {
            bindTabsToSlider(
                $(".projects-slider--proj"),
                ".slider-pagination__button",
                "slider-pagination__item--active",
                currentSlide
            );
            $(".swiper-pagination-current").text(currentSlide + 1);
            $(".swiper-pagination-total").text(slick.$slides.length);
        }
    );

    $(".projects-slider--proj").slick({
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: "linear",
        autoplay: true,
        autoplaySpeed: 3000,
    });

    bindTabsToSlider(
        $(".projects-slider--proj"),
        ".slider-pagination__button",
        "slider-pagination__item--active"
    );

    $(".business-projects-slider .project-slider__button--prev").click(() => {
        $(".projects-slider--proj").slick("slickPrev");
    });

    $(".business-projects-slider .project-slider__button--next").click(() => {
        $(".projects-slider--proj").slick("slickNext");
    });
});