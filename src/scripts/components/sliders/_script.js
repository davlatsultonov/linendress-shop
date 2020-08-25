$(document).ready(function() {
    $('.info-cards').owlCarousel({
        items: 1,
        margin: 40,
        loop: true,
        autoplay: true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
    });

    $('#products-group').owlCarousel({
        items: 1,
        margin: 40,
        loop: true
    });

    $('.product-card__gallery').owlCarousel({
        items: 1,
        margin: 40,
        loop: true
    });

    $('#product-view__gallery').owlCarousel({
        items: 1,
        margin: 40,
        loop: true,
        dots: false,
        smartSpeed :900,
        nav: true,
        navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    });
});