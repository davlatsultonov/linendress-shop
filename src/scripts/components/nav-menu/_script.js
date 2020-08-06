let wrapper = $('#nav-menu'),
    links = wrapper.find('a');

links.on('click', function () {
    $(this).closest(wrapper).find('a.current').removeClass('current');
    $(this).addClass('current');
});