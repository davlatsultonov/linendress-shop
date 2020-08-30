import './components/lang-switcher/_script';
import './components/nav-menu/_script';
import './components/color-picker/_script';
import './components/sliders/_script';
import './components/custom-select/_script';
import './components/add-counter/_script';
import './components/pattern-group/_script';

// динамическая высота для подложки
$(window).on('load', function() {
    let productCardItems = $('.product-card  a');

    productCardItems.click(function (e) {
        e.stopPropagation();
    });

    // setting dynamic height to bg-layers
    $('.info-block').each(function () {
        let totalHeight = $(this).find('.info-block__img').css('height') + $(this).find('.info-block__statement').css('height');
        $(this).children('.substrate__item').height(totalHeight);
    });

    $('.header').find('.substrate__item').height($('.header').outerHeight() + 105);

    // product-card__btn-more
    let cardBtnMore = $('.product-card__btn-more--js'),
        closeBtn = $('.product-full-info__close-btn');

    cardBtnMore.click(function (e) {
        let popover = $(this).parents('.product-card').children('.product-full-info:hidden');
        e.preventDefault();
        popover.addClass('visible');
        //disableScroll();
    });

    closeBtn.on('click', function () {
        $(this).closest('.product-full-info').removeClass('visible');
        //enableScroll();
    });

    // disable scrolling when modal is open
    let keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () { supportsPassive = true; }
        }));
    } catch(e) {}

    let wheelOpt = supportsPassive ? { passive: false } : false;
    let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    function disableScroll() {
        window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
        window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    // call this to Enable
    function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        window.removeEventListener('touchmove', preventDefault, wheelOpt);
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }


    $('[data-fancybox="gallery"]').fancybox({

    });
});