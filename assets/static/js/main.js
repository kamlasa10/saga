try {
    $(".ant-dropdown-menu").hide();
    let isPrev;
    const search = $(".header-search-desk");
    search.hide();
    $(".mobile-header-search").hide();
    let prevActiveSubList;

    if (document.documentElement.clientWidth <= 920) {
        $(".navbar__list-language")
            .find(".ant-menu-submenu")
            .addClass("dropdown__title-container");
    }

    $(".header-open-navbar").click(() => {
        $(".navbar").addClass("navbar--open");
        $(".header-search-container").hide();
    });

    $(".header-close-navbar").click(() => {
        $(".navbar").toggleClass("navbar--open");
        $(".header-search-container").show();
    });

    function mobileDropdown(currentElem) {
        let delay = 400;
        let parent = currentElem.parent();
        parent.addClass("navbar__item--mobile-active");

        if (currentElem.hasClass("open")) {
            parent.find(".ant-dropdown-menu").slideDown(400);
        } else {
            parent.find(".ant-dropdown-menu").slideUp(400, () => {
                parent.removeClass("navbar__item--mobile-active");
            });
        }
    }

    $(".dropdown__title-container").each(function() {
        $(this).on("click", function(e) {
            $(this).toggleClass("open");

            if (document.documentElement.clientWidth <= 920) {
                mobileDropdown($(this));
                return;
            }

            $(".ant-dropdown-menu").fadeOut();

            if ($(this).hasClass("open") || $(this)[0] !== prevActiveSubList) {
                $(this).find(".ant-dropdown-menu").fadeIn();
            } else {
                $(this).find(".ant-dropdown-menu").fadeOut();
            }

            prevActiveSubList = $(this)[0];
        });
    });

    $(".header-search-opener").on("click", (e) => {
        e.preventDefault();

        e.currentTarget.remove();

        if (document.documentElement.clientWidth < 1022) {
            $(".mobile-header-search").show();
            return;
        }

        search.show();

        $(".header-search-container").append(search);
    });

    function slider(selector, btnPrevSelector, btnNextSelector, slideToShow = 3) {
        const slider = $(selector);
        const btnPrev = $(btnPrevSelector);
        const btnNext = $(btnNextSelector);

        slider.slick({
            arrows: false,
            infinite: false,
            slidesToShow: slideToShow,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    },
                },
            ],
        });

        btnPrev.click(() => {
            slider.slick("slickPrev");
        });

        btnNext.click(() => {
            slider.slick("slickNext");
        });
    }

    function mask(inputName, mask, evt) {
        try {
            var text = document.querySelector(inputName);
            var value = text.value;

            // If user pressed DEL or BACK SPACE, clean the valu
            try {
                var e = evt.which ? evt.which : event.keyCode;
                if (e == 46 || e == 8) {
                    text.value = "";
                    return;
                }
            } catch (e1) {}

            var literalPattern = /[0\*]/;
            var numberPattern = /[0-9]/;
            var newValue = "";

            for (var vId = 0, mId = 0; mId < mask.length;) {
                if (mId >= value.length) break;

                // Number expected but got a different value, store only the valid portion
                if (mask[mId] == "0" && value[vId].match(numberPattern) == null) {
                    break;
                }

                // Found a literal
                while (mask[mId].match(literalPattern) == null) {
                    if (value[vId] == mask[mId]) break;

                    newValue += mask[mId++];
                }

                newValue += value[vId++];
                mId++;
            }
            text.value = newValue;
        } catch (e) {}
    }

    function createSelecteItemsForSlider(whereAppend, count) {
        let fragment = "";
        for (let i = 0; i < count; i++) {
            let template;

            if (i + 1 < 10) {
                template = templateItem(`0${i + 1}`);
            } else {
                template = templateItem(i + 1);
            }

            fragment += template;
        }

        function templateItem(order) {
            return `<div class="slider-pagination__item">
        <button type="button" class="slider-pagination__button">
        </button>
        <span class="slider-pagination__status">${order}</span>
        </div>
        `;
        }

        whereAppend.insertAdjacentHTML("beforeend", fragment);
    }

    createSelecteItemsForSlider(
        document.querySelector(".projects-slider__pagination"),
        document.querySelectorAll(".projects-slider__slide").length
    );

    function bindTabsToSlider(
        slider,
        triggersSelector,
        activeClass,
        i = 0,
        isSynchronization = true
    ) {
        try {
            const triggers = $(triggersSelector);
            const active = activeClass;

            triggers.each(function(i) {
                $(this).on("click", (e) => {
                    e.preventDefault();

                    showActiveTab(i);
                });
            });

            function showActiveTab(i) {
                triggers.each(function() {
                    $(this).parent().removeClass(active);
                });

                if (isSynchronization) {
                    slider.slick("slickGoTo", i, true);
                }
                triggers.eq(i).parent().addClass(active);
            }
            console.log(i);
            triggers.eq(i).parent().addClass(active);
        } catch (e) {}
    }

    let scrollUp = $(".scroll-up");

    scrollUp.on("click", (e) => {
        e.preventDefault();

        $("body").animate({
                scrollTop: 0,
            },
            800
        );
    });

    window.addEventListener("scroll", (e) => {
        if (
            window.scrollY > 800 ||
            window.scrollY >= document.body.scrollHeight / 4
        ) {
            scrollUp.removeClass("scroll-up--hidden");
        } else {
            scrollUp.addClass("scroll-up--hidden");
        }
    });
} catch (e) {}