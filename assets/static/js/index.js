//youtube

(function() {
    const videosId = ['zvVrgxZPZIY', '774v3JsL_HU', 't-8gXQHP7Xk']
    const items = Array.from(document.querySelectorAll('.publications-slider__slide'))
    let currentVideoSrc = ''
    const modal = $('.ReactModal__Overlay')
    const modalClose = modal.find('.modal-close')
    const videoContainer = document.querySelector('.ReactModal__Content')
    let player
    let blockWithVideo

    modal.hide()

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            blockWithVideo = createNodeToFrame('div', 'modal-video__frame')
            console.log(blockWithVideo);
            const source = e.currentTarget.dataset.video
            modal.fadeIn()

            videoContainer.appendChild(blockWithVideo)

           player = onYoutubePlayer(blockWithVideo, source)
        })
    })

    modalClose.on('click', (e) => {
        e.preventDefault()

        modal.fadeOut()
        blockWithVideo.remove()
        player.stopVideo()
    })

    renderVideos(videosId)

    function getPreviewImgFormVideo(idVideo) {
        return `https://i1.ytimg.com/vi/${idVideo}/hqdefault.jpg`
    }

    function createNodeToFrame(node, classses) {
        const elem = document.createElement(node)
        elem.classList.add(classses)

        return elem
    }


    function renderVideos(videos) {
        let fragment = ''
        
        videosId.forEach((id, i) => {
            items[i].querySelector('.publication-preview__image')
                .style.backgroundImage = `url(${getPreviewImgFormVideo(id)})`
            items[i].setAttribute('data-video', id)
        })
    }

    function onYoutubePlayer(whereSelector, videId) {
        let player
        window.YT.ready(function() {
            player = new YT.Player(whereSelector, {
                height: '390',
                width: '640',
                videoId: videId,
                events: {
                    'onReady': onPlayerReady
                }
            });
        })

        return player
    }

    function onPlayerReady() {
        console.log('start');
        player.playVideo()
    }
})();

// event listeners

(function() {
    function removeFormTextWarn(input) {
        input.parent().find('.field__error-msg').remove()
    }

    function removeAllFormTextWarn(inputs) {
        inputs.each(function () {
            $(this).parent().find('.field__error-msg').remove()
        })
    }

    function addIndicateWarnForNode(node, classes, isAdded = true) {
        if(isAdded) {
            $(node).closest('.field').addClass(classes)
            return
        }

        $(node).closest('.field').removeClass(classes)
    }

    function removeNodeByDelay(node, delay) {
        setTimeout(() => {
            node.remove()
        }, delay)
    }

    function validateForm(inputs) {
        let isValid = true
        inputs.each(function() {
            $(this).on('input', (e) => {
                if($(e.target).val().replace(/\s+/g, '')) {
                    removeFormTextWarn($(this))
                    addIndicateWarnForNode($(this), 'field--error', false)
                    isValid = false
                    return
                } else {
                    removeFormTextWarn($(this))
                    $(this).parent().append('<div class="field__error-msg">Это поле обязательное</div>')
                    addIndicateWarnForNode($(this), 'field--error', true)
                    isValid = false
                    return
                }
            })

            if(!$(this).val().replace(/\s+/g, '')) {
                removeFormTextWarn($(this))
                $(this).parent().append('<div class="field__error-msg">Это поле обязательное</div>')
                addIndicateWarnForNode($(this), 'field--error', true)
                isValid = false
            }
        })

        return isValid
    }

    $(document).on('click', '.submit__form', (e) => {
        const $form = $(e.target.closest('[data-form]'))
        e.preventDefault()
        const inputs = $form.find($('[name]'))
        const isValid = validateForm(inputs)

        if(isValid) {
            sendAjaxForm('static/mail.php', $form)
        }
    })

    function sendAjaxForm(url, selectorForm) {

        const status = {
            sucess: 'Спасибо за заявку мы с вами свяжемся в ближайшее время',
            error: 'Ошибка на сервере повторите попытку позже'
        }

        $.ajax({
            url:     url, //url страницы (action_ajax_form.php)
            type:     "POST", //метод отправки
            dataType: "html", //формат данных
            data: $(selectorForm).serialize(),  // Сеарилизуем объект
            success: function(response) { //Данные отправлены успешно
                $(selectorForm).append(`<div class="form__status">${status.sucess}</div>`)
                const msg = $(selectorForm).find('.form__status')
                removeNodeByDelay(msg, 5000)
                $(selectorForm)[0].reset()
            },
            error: function(response) { // Данные не отправлены
                $(selectorForm).append(`<div class="form__status">${status.error}</div>`);
                const msg = $(selectorForm).find('.form__status')

                removeNodeByDelay(msg, 5000)
                $(selectorForm)[0].reset()
            }
        });
    }
})();


$('.intro-banner-wrap').on('init afterChange', (e, slick, currentSlide = 0, nextSlide = 0) => {
    e.stopPropagation()
    const slideNumber = currentSlide + 1 >= 10 ? (currentSlide + 1) : `0${currentSlide + 1}`
    $('.swiper-pagination-current').text(slideNumber)
    $('.swiper-pagination-total').text((slick.slideCount))
})


$('.project-slider-wrap').on('init afterChange', (_, slick, currentSlide = 0, nextSlide = 0) => {
    bindTabsToSlider(
        $('.project-slider-wrap'),
        '.slider-pagination__button',
        'slider-pagination__item--active',
        currentSlide,
        false
    )
    $('projects-slider__navigation--main .swiper-pagination-current').text(currentSlide + 1)
    $('projects-slider__navigation--main .swiper-pagination-total').text(slick.$slides.length)
})

$('.intro-banner-wrap').slick({
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
})

$('.project-slider-wrap').slick({
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
})

$('.publications-slider__body-wrap').slick({
    arrows: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
})

$('.publications-slider__body-content').slick({
    arrows: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          }
    ]
})

$('.publications-slider__body-blocks').slick({
    arrows: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          }
    ]
})

bindTabsToSlider(
    $('.project-slider-wrap'),
    '.slider-pagination__button',
    'slider-pagination__item--active'
)

$('.intro-banner__button--prev').click(() => {
    $('.intro-banner-wrap').slick('slickPrev')
})

$('.project-slider__button--prev').click(() => {
    $('.project-slider-wrap').slick('slickPrev')
})

$('.intro-banner__button--next').click(() => {
    $('.intro-banner-wrap').slick('slickNext')
})

$('.project-slider__button--next').click(() => {
    $('.project-slider-wrap').slick('slickNext')
})

$('.videos__button--prev').click(() => {
    $('.publications-slider__body-wrap').slick('slickPrev')
})

$('.videos__button--next').click(() => {
    $('.publications-slider__body-wrap').slick('slickNext')
})

$('.publications-slider__button--prev').click(() => {
    $('.publications-slider__body-content').slick('slickPrev')
})

$('.publications-slider__button--next').click(() => {
    $('.publications-slider__body-content').slick('slickNext')
})

$('.massAboutUs__button--prev').click(() => {
    $('.publications-slider__body-blocks').slick('slickPrev')
})

$('.massAboutUs__button--next').click(() => {
    $('.publications-slider__body-blocks').slick('slickNext')
})



