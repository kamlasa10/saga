//sliders
$('.intro-banner-wrap').on('init afterChange', (_, slick, currentSlide = 0, nextSlide = 0) => {
    $('.swiper-pagination-current').text(`0${currentSlide + 1}`)
    $('.swiper-pagination-total').text(`0${slick.$slides.length}`)
})

$('.intro-banner-wrap').slick({
    fade: true,
    autoPlay: true,
    arrows: false,
    infinite: true,
})

$('.intro-banner__button--prev').click(() => {
    $('.intro-banner-wrap').slick('slickPrev')
})

$('.intro-banner__button--next').click(() => {
    $('.intro-banner-wrap').slick('slickNext')
})