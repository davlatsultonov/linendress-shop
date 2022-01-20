import { createPopper } from '@popperjs/core';

$(document).ready(function () {
    $('.main-slider').slick({
        autoplay: true,
        autoplaySpeed: 7000,
        dots: true,
        slidesToShow: 1,
        fade: true,
        speed: 700,
        infinite: false,
        mobileFirst: true,
        verticalSwiping: true
    });

    $('.product-view__gallery').slick({
        dots: false,
        arrows: true,
        speed: 700,
        asNavFor: '.product-view__gallery-parts',
        infinite: false,
        mobileFirst: true
    });

    $('.product-view__gallery-parts').slick({
        asNavFor: '.product-view__gallery',
        dots: false,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        focusOnSelect: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 455,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 350,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }

        ]
    });

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
        ],
        infinite: false
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
        infinite: false
    });

    $('.popper-slider').slick({
        dots: false,
        arrows: true,
        speed: 700,
        infinite: false
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        const el = slick.$slider.closest('[data-popper-el-content]').find(`.pattern-item[data-id="${nextSlide}"]`);
        const parent = el.parent();
        el.click()
        parent.animate({
            scrollTop: parent.scrollTop() + (el.offset().top - parent.offset().top)
        }, 400);
    });

    $('.has-slider_only-arrows').slick({
        dots: false,
        arrows: true,
        speed: 700,
        infinite: false
    });

    let windowInnerWidth = window.innerWidth;

    // click on eye icon
    const poppers = $('[data-popper-el]');
    const popperInstances = [];

    poppers.each((i, item) => {
        const popperBtn = $(item).find('[data-popper-el-button]');
        const popperBtnClose = $(item).find('[data-popper-el-button-close]');
        const popperContent = $(item).find('[data-popper-el-content]');
        let src, popperInstance;

        if (windowInnerWidth > 639) {
            popperInstance = createPopper(popperBtn.get(0), popperContent.get(0), {
                placement: 'top',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            padding: 15
                        },
                    },
                ],
            });
            popperContent.attr('data-popper-escaped', '');
        }
        popperInstances.push([popperBtn, popperContent]);

        popperBtn.on('click', function () {
            src = $(this).attr('src');
            let isActive = src.search(/active-eye/g);

            setTimeout(() => {
                $(item).closest('[data-popper-el]').find('.popper-slider').slick('setPosition');
            }, 200)

            popperInstances.forEach(item => {
                $(item[0]).attr('src', src.replace('active-eye', 'eye'))
                item[1].get(0).removeAttribute('data-show');
            })

            if (isActive !== -1) {
                hide()
            } else {
                if (windowInnerWidth > 639) {
                    popperContent.get(0).setAttribute('data-show', '');
                    popperInstance.update();
                } else {
                    popperContent.show();
                    disableScrollInActiveModal();
                }

                $(this).attr('src', src.replace('eye', 'active-eye'))
            }
        })

        popperBtnClose.on('click', function () {
            hide();
            enableScrollInActiveModal();
        })

        function hide() {
            $(popperBtn).attr('src', src.replace('active-eye', 'eye'));

            if (windowInnerWidth > 639) {
                popperContent.get(0).removeAttribute('data-show');
            } else {
                popperContent.hide();
            }
        }
    })

    //filter-block
    let filterBlockOpenBtn = $('.filter-block-open-btn'),
        filterBlockCloseBtn = $('.filter-block__btn-close'),
        windowScrollY = window.scrollY,
        filterBlock = $('.filter-block');

    $(window).on('scroll', throttle(function () {
        windowScrollY = window.scrollY;
    }, 50));

    $(window).on('resize', function () {
        windowInnerWidth = window.innerWidth;
        setTimeout(() => {
            $('.has-slider').slick('setPosition');
            $('.product-view__gallery-parts').slick('setPosition');
            dynamicSubstrateHeight();
        }, 300)
    });

    $(document).click(function (e) {
        closeOnOuterClick(e, 'with-shadow', '.filter-block', closeFilterBlock);
        closeOnOuterClick(e, 'with-shadow', '.product-full-info', closeProductPopover);
        closeOnOuterClick(e, 'no-shadow', '.select-block', () => $('.select-block').removeClass('active'));
        closeOnOuterClick(e, 'no-shadow', '.product-img-info', () => $('.product-img-info').removeClass('product-img-info--active'));
    });

    function closeOnOuterClick(event, modalType, target, toggleScript) {
        if (modalType == 'with-shadow') {
            if ($(event.target).is(target)) toggleScript();
        }
        if (modalType == 'no-shadow') {
            if (!$(event.target).closest(target).length) toggleScript();
        }
    }

    filterBlockOpenBtn.click(() => {
        let activateOnceInDesktop = false;
        filterBlock.addClass('filter-block--active');
        disableScrollInActiveModal();

        $(window).on('resize', function () {
            if (!activateOnceInDesktop && windowInnerWidth > 768) {
                closeFilterBlock();
                activateOnceInDesktop = true;
            }
        });
    });

    filterBlockCloseBtn.click(closeFilterBlock);

    function closeFilterBlock() {
        filterBlock.removeClass('filter-block--active');
        enableScrollInActiveModal();
        $('.filter-block__content').scrollTop(0);
    }

    // product-card popover
    let productPopoverShowBtn = $('.product-card__btn-more--js'),
        productPopoverHideBtn = $('.product-full-info__close-btn');

    productPopoverShowBtn.click(function (e) {
        e.stopPropagation();
        $(this).closest('body').find('.product-full-info').addClass('product-full-info_visible');
        $(".has-slider").slick('setPosition');
        disableScrollInActiveModal();
    });

    productPopoverHideBtn.click(closeProductPopover);

    function closeProductPopover() {
        $('body').find('.product-full-info_visible').removeClass('product-full-info_visible');
        enableScrollInActiveModal();
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
    let defaultItem = $('.select-block__default'),
        dropdownItems =  $('.select-block__list li');

    openDropdown(defaultItem);
    selectDropdownItem(dropdownItems);
    function openDropdown(defaultItem) {
        if (defaultItem) {
            defaultItem.click(function () {
                $(this).parent().toggleClass('active');
            });
        }
        return false;
    }
    function selectDropdownItem(items) {
        items.click(function () {
            let current = $(this).html();
            defaultItem.find('li').html(current);
            $(this).parents('.select-block').removeClass('active');
        });
    }

    // language selection
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

    navMenuLinks.click(function () {
        navMenuLinks.removeClass('current');
        $(this).addClass('current');
    });

    // patterns select
    let patternsWrapper = $('.pattern-group'),
        patternItems = $('.pattern-group__item').not('.pattern-item_type_btn').not('.pattern-group__item_blank');

    patternItems.click(function () {
        $(this).closest('.dual-block').find('.product-full-info__gallery.popper-slider').slick('slickGoTo', Number($(this).data('id')));
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

    // menu-dropdown on mobile
    let menuDropDownBtn = $('.menu-dropdown__btn');

    menuDropDownBtn.click(e => {
        if (windowInnerWidth <= 768) {
            e.preventDefault()
        }
    });

    // look-book. product-img-info
    let productImgInfo = $('.product-img-info__btn');

    productImgInfo.click(function () {
        $(this).closest('.product-img-info').toggleClass('product-img-info--active');
    });

    // scroll disabling and enabling
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


    let accordionBlock = $('.accordion-block__item'),
        accordionBlockBtn = $('.accordion-block__btn');


    accordionBlockBtn.on('click', function () {
        let parent = $(this).closest('.accordion-block__item'),
            panel = parent.children('.accordion-block__content')[0],
            panelScrollHeight = panel.scrollHeight;

        accordionBlock.each(function () {
            $(this).removeClass('accordion-block__item_active');
            $(this).children('.accordion-block__content').css('max-height', 0);
        });

        parent.addClass('accordion-block__item_active');
        panel.style.maxHeight = panelScrollHeight + 30 + 'px';

        $(window).on('resize', throttle(function () {
            if (!panel.style.maxHeight) return;
            accordionBlock.each(function () {
                $(this).children('.accordion-block__content').css('max-height', 0);
            });
            panelScrollHeight = panel.scrollHeight;
            panel.style.maxHeight = panelScrollHeight + 30 + 'px';
        }, 300));
    });

    // to initialize the product card image
    const productViewBtn = $('.product-view__btn-expand');

    productViewBtn.on('click', function (e) {
        e.preventDefault();
        $.fancybox.open($('.product-view__img a'), fancyBoxConfigs);
    });

    let fancyBoxConfigs = {
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "close"
        ]
    };

    $('[data-fancybox="workview"]').fancybox(fancyBoxConfigs);

    $('[data-fancybox="product-img"]').fancybox(fancyBoxConfigs);

    $('[data-fancybox="look-book"]').fancybox(fancyBoxConfigs);
});

$(window).on('load', dynamicSubstrateHeight);

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
