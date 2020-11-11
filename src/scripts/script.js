$(document).ready(function () {
    $('.main-slider').slick({
        autoplay: true,
        autoplaySpeed: 7000,
        dots: true,
        slidesToShow: 1,
        fade: true,
        speed: 700,
        infinite: true,
        mobileFirst: true,
        verticalSwiping: true
    });

    /*$('.product-view__parts').slick({
        dots: false,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 7,
        slidesToScroll: 4,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    dots: true
                }
            }
        ]
    });*/

    $('#products-group-slider').slick({
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: 'ease',
        speed: 700,
        swipe: false,
        appendDots: $("#products-group-controls .custom-controls__dots"),
        prevArrow: $("#products-group-controls .custom-controls__prev"),
        nextArrow: $("#products-group-controls .custom-controls__next"),
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    swipe: true
                }
            }
        ]
    });

    $('.info-cards__slider').slick({
        dots: true,
        arrows: true,
        appendDots: $(".custom-controls--info-card .custom-controls__dots"),
        prevArrow: $(".custom-controls--info-card .custom-controls__prev"),
        nextArrow: $(".custom-controls--info-card .custom-controls__next")
    });

    $('.has-slider').slick({
        dots: true,
        arrows: true,
        speed: 700,
    });

    $('.has-slider_only-arrows').slick({
        dots: false,
        arrows: true,
        speed: 700,
    });

    //filter-block
    let filterBlockOpenBtn = $('.filter-block-open-btn'),
        filterBlockCloseBtn = $('.filter-block__btn-close'),
        windowScrollY = window.scrollY,
        filterBlock = $('.filter-block');

    $(window).on('scroll', throttle(function () {
        windowScrollY = window.scrollY;
    }, 50));


    filterBlockOpenBtn.click((e) => {
        e.stopPropagation();
        let activateOnceInDesktop = false;
        filterBlock.addClass('filter-block--active');
        disableScrollInActiveModal();

        $(window).on('resize', throttle(function () {
            let w = window.innerWidth;
            if (!activateOnceInDesktop && w > 768) {
                closeFilterBlock();
                activateOnceInDesktop = true;
            }
        }, 50));

        closeOnOuterClick('.filter-block__content', '.filter-block', '.filter-block--active');
    });

    filterBlockCloseBtn.click(() => {
        closeFilterBlock();
    });

    function closeFilterBlock() {
        filterBlock.removeClass('filter-block--active');
        enableScrollInActiveModal();
        $('.filter-block__content').scrollTop(0);
    }

    function disableScrollInActiveModal() {
        let body = document.body,
            windowScrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.top = `-${windowScrollY}px`;
    }

    function enableScrollInActiveModal() {
        let body = document.body,
            scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    function closeOnOuterClick(targetElement, hideElement, removeClass) {
        $(document).click(function(event) {
            if (!$(event.target).closest(targetElement).length) {
                let $body = $("body");
                $body.find(hideElement).removeClass(removeClass);
                enableScrollInActiveModal();
            }
        });
    }

    // mobile-menu
    let mobileOpenBtn = $('.hamburger-btn_js'),
        mobileMenuCloseBtn = $('.header-mobile__btn-close'),
        mobileNavbar = $('.header-mobile__navbar');

    mobileOpenBtn.click(() => hideMobileMenu(mobileNavbar));

    mobileMenuCloseBtn.click(() => showMobileMenu(mobileNavbar));

    function hideMobileMenu(menu) {
        let activateOnceInDesktop = false;
        menu.addClass('header-mobile__navbar--active');
        disableScrollInActiveModal();

        $(window).on('resize', throttle(function () {
            let w = window.innerWidth;
            if (!activateOnceInDesktop && w > 768) {
                showMobileMenu(menu);
                enableScrollInActiveModal();
            }
        }, 50));
    }

    function showMobileMenu(menu) {
        menu.removeClass('header-mobile__navbar--active');
        enableScrollInActiveModal();
    }

    // product-card__btn-more
    let cardBtnMore = $('.product-card__btn-more--js'),
        closeBtn = $('.product-full-info__close-btn');

    cardBtnMore.click(function (e) {
        e.stopPropagation();
        let popover = $(this).parents('.product-card').children('.product-full-info');
        popover.addClass('product-full-info_visible');
        $(".has-slider").slick('setPosition');
        disableScrollInActiveModal();
        //disableScroll(); нужно подключить после интеграции карточек продуктов на главной при показе доп.информации; попап доп.инофрмации не работает корректно внутри слайдера группы продуктов
    });

    closeBtn.on('click', function () {
        $(this).closest('.product-full-info').removeClass('product-full-info_visible');
        enableScrollInActiveModal();
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
                e.stopPropagation();
                $(this).val(e.target.value).blur();
            }

            if (e.target.value === '') $(this).val(1).blur();
        }
    });

    addToCartButtons.click(function () {
        $(this).parent().addClass('show-counter');
    });

    addCounterBtn.on('click', function () {
        let decreaseBtn = $(this).hasClass('add-counter__decrease') ? $(this) : null,
            increaseBtn = $(this).hasClass('add-counter__increase') ? $(this) : null,
            parent = $(this).parent(),
            counterBox = parent.children('.add-counter__num');

        if (+counterBox.val()) {
            if (decreaseBtn) {

                if (+counterBox.val() <= 1) {
                    console.log(parent.parent());


                    parent.parent().removeClass('show-counter');
                } else {
                    counterBox.val(+counterBox.val() - 1)
                }
            }

            if (increaseBtn) {
                counterBox.val(+counterBox.val() + 1);
            }
        }
    });

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
    let navMenuLinks = $('.nav-menu').find('a');

    navMenuLinks.click(() => {
        navMenuLinks.removeClass('current');
        $(this).addClass('current');
    });

    // patterns select
    let patternsWrapper = $('.pattern-group'),
        patternItems = $('.pattern-group__item').not('.pattern-item_type_btn').not('.pattern-group__item_blank');

    patternItems.click(function () {
        $(this).closest(patternsWrapper).find('.pattern-group__item').removeClass('active');
        $(this).addClass('active');
    });

    //cards-view
    let cardsViewItems = $('.cards-view__item'),
        productsGroupWrapper = $('.products-group');

    cardsViewItems.click(function () {
        cardsViewItems.removeClass('cards-view__item--active');
        $(this).addClass('cards-view__item--active');
        setTimeout(() => {
            $('.has-slider').slick('setPosition');
        }, 330);
        if (!$(this).children('.cards-view__icons').hasClass('cards-view__icons--poly')) {
            productsGroupWrapper.addClass('products-group_no-grid')
        } else {
            productsGroupWrapper.removeClass('products-group_no-grid')
        }
    });
});

$(window).on('load', dynamicSubstrateHeight);

$(window).on('resize', throttle(function () {
   setTimeout(() => {
       $('.has-slider').slick('setPosition');
       dynamicSubstrateHeight();
   }, 300);
}, 40));

function dynamicSubstrateHeight() {
    // setting dynamic height to bg-layers
    let infoBlocks = $('.info-block__item'),
        infoCards = $('.info-cards'),
        infoCardsSubstrate = infoCards.children('.substrate__item'),
        header = $('.header');

    infoBlocks.each(function () {
        let totalHeight = $(this).find('.info-block__img').outerHeight() + $(this).find('.info-block__statement').outerHeight();
        $(this).children('.substrate__item').height(totalHeight - 30);
    });

    infoCards.each(function () {
        infoCardsSubstrate.height($(this).outerHeight() - 30);
    });

    header.find('.substrate__item').height(header.outerHeight() + 120);
}

function throttle(fn, wait) {
    var time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}