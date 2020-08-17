$(document).ready(function() {
    $('.info-cards').owlCarousel({
        items: 1,
        margin: 40,
        loop: true,
        autoplay: true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
    });

    $('#products').owlCarousel({
        items: 1,
        margin: 40,
        loop: true
    });
});