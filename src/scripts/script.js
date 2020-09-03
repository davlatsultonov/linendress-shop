$(document).ready(function () {
    $('.main-slider').slick({
        dots: true,
        slidesToShow: 1,
        vertical: true,
        verticalSwiping: true,
    });

    $('#products-group-slider').slick({
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        swipe: false,
        swipeToSlide: false,
        appendDots: $("#products-group-controls .custom-controls__dots"),
        prevArrow: $("#products-group-controls .custom-controls__prev"),
        nextArrow: $("#products-group-controls .custom-controls__next")
    });

    $('.info-cards').slick({
        dots: true,
        arrows: true,
        appendDots: $("#info-cards-controls .custom-controls__dots"),
        prevArrow: $("#info-cards-controls .custom-controls__prev"),
        nextArrow: $("#info-cards-controls .custom-controls__next")
    });

    $('.has-slider').slick({
        dots: true,
        arrows: true,
    });

    $('.has-slider_only-arrows').slick({
        dots: false,
        arrows: true,
    });
});

$(window).on('load', function() {
    let productCardItems = $('.product-card  a');

    productCardItems.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // setting dynamic height to bg-layers
  /*  $('.info-block').each(function () {
        let totalHeight = $(this).find('.info-block__img').css('height') + $(this).find('.info-block__statement').css('height');
        $(this).children('.substrate__item').height(totalHeight);
    });

    $('.header').find('.substrate__item').height($('.header').outerHeight());*/

    // product-card__btn-more
    let cardBtnMore = $('.product-card__btn-more--js'),
        closeBtn = $('.product-full-info__close-btn');

    cardBtnMore.click(function (e) {
        let popover = $(this).parents('.product-card').children('.product-full-info:hidden');
        e.preventDefault();
        popover.addClass('visible');
        //disableScroll(); нужно подключить после интеграции карточек продуктов на главной при показе доп.информации; попап доп.инофрмации не работает корректно внутри слайдера группы продуктов
    });

    closeBtn.on('click', function () {
        $(this).closest('.product-full-info').removeClass('visible');
        //enableScroll(); нужно подключить после интеграции карточек продуктов на главной при показе доп.информации; попап доп.инофрмации не работает корректно внутри слайдера группы продуктов
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

    // counting products count
    let addCounterBtn = $('.add-counter .add-counter__btn'),
        countBox = $('.add-counter .add-counter__num'),
        addToCartButtons = $('.button-add-js');

    countBox.keyup(function (e) {
        if (e.which === 13) {
            if (Number(e.target.value)) {
                console.log(Number(e.target.value));
                e.stopPropagation();
                $(this).val(e.target.value).blur();
            }

            if (e.target.value === '') $(this).val(1).blur();
        }
    });

    addToCartButtons.click(function (e) {
        e.preventDefault();
        $(this).addClass('show-counter');
    });

    addCounterBtn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let parent = $(this).closest('.add-counter'),
            counterBox = parent.children('.add-counter__num');

        if ($(this).hasClass('add-counter__decrease')) {
            if (+counterBox.val() <= 1) {
                parent.parent().removeClass('show-counter');
            } else {
                counterBox.val(+counterBox.val() - 1)
            }
        }

        if ($(this).hasClass('add-counter__increase')) {
            counterBox.val(+counterBox.val() + 1);
        }
    })

    // color picker
    let colorPicker = $('.color-picker'),
        colorPickerItem = $('.color-picker__item');

    colorPickerItem.on('click', function () {
        colorPicker.find('li').removeClass('checked');
        $(this).addClass('checked');
    });

    // dropdown

    let defaultItem = $('.select-block__default'), // начальный/дефолтный выбранный элемент блока селект
        dropdownItems =  $('.select-block__list li'); // все элементы внутри дропдовна
    // инициализация кликов
    openDropdown(defaultItem);
    selectDropdownItem(dropdownItems);
    // функция для показа дропдовна
    function openDropdown(defaultItem) {
        if (defaultItem) {
            defaultItem.click(function () {
                $(this).parent().toggleClass('active');
            });
        }
        return false;
    }
    // функция для выбора элемента дропдовна
    function selectDropdownItem(items) {
        items.click(function () {
            let current = $(this).html();
            defaultItem.find('li').html(current);
            $(this).parents('.select-block').removeClass('active');
        });
    }

    // выбор языка
    let langSwticherWrapper = $( ".lang-switcher" ),
        langSwticherWrapperLinks = langSwticherWrapper.find('a'),
        currentLang = $('.lang-switcher__current');

    langSwticherWrapper.click(function() {
        $(this).toggleClass("active");
        $(this).find(".lang-switcher__popover").toggleClass("visible");
    });

    langSwticherWrapperLinks.click(function(){
        langSwticherWrapperLinks.removeClass('sel');
        $(this).addClass('sel');
        let selectedValue = $(this).text();
        currentLang.html(selectedValue);
        currentLang.attr("title", selectedValue);
        $('.lang-switcher .hover').html(selectedValue);
    });

    // navmenu select
    let navMenuWrapper = $('#nav-menu'),
        navMenuLinks = navMenuWrapper.find('a');

    navMenuLinks.click(function () {
        $(this).closest(navMenuWrapper).find('a.current').removeClass('current');
        $(this).addClass('current');
    });

    // patterns select
    let patternsWrapper = $('.pattern-group'),
        patternItems = $('.pattern-group__item').not('.pattern-item_type_btn').not('.pattern-group__item_blank');

    patternItems.click(function () {
        $(this).closest(patternsWrapper).find('.pattern-group__item').removeClass('active');
        $(this).addClass('active');
    });
});