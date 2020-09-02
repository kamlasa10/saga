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

bindTabsToSlider(
    $(".projects-slider--proj"),
    ".slider-pagination__button",
    "slider-pagination__item--active"
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

$(".projects-slider .project-slider__button--prev").click(() => {
    $(".projects-slider--proj").slick("slickPrev");
});

$(".projects-slider .project-slider__button--next").click(() => {
    $(".projects-slider--proj").slick("slickNext");
});