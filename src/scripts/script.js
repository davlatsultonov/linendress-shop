import './components/lang-switcher/_script';
import './components/nav-menu/_script';
import './components/sliders/_script';

$(window).on('load', function() {
    $('.info-block').each(function () {
        let totalHeight = $(this).find('.info-block__img').css('height') + $(this).find('.info-block__statement').css('height');
        $(this).children('.substrate__item').height(totalHeight);
    });

    $('.header').find('.substrate__item').height($('.header').outerHeight() + 105);
});