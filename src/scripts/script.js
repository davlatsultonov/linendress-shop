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
        e.preventDefault();
    });

    $('.info-block').each(function () {
        let totalHeight = $(this).find('.info-block__img').css('height') + $(this).find('.info-block__statement').css('height');
        $(this).children('.substrate__item').height(totalHeight);
    });

    $('.header').find('.substrate__item').height($('.header').outerHeight() + 105);
});