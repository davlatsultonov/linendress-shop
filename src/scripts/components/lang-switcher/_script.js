let wrapper = $( ".lang-switcher" ),
    wrapperLinks = wrapper.find('a'),
    currentLang = $('.lang-switcher__current');

wrapper.on( "click", function( event ) {
    $(this).toggleClass("active");
    $(this).find(".lang-switcher__popover").toggleClass("visible");
});

wrapperLinks.click(function(){
    wrapperLinks.removeClass('sel');
    $(this).addClass('sel');
    var selectedValue = $(this).text();
    currentLang.html(selectedValue);
    currentLang.attr("title", selectedValue);
    $('.lang-switcher .hover').html(selectedValue);
})