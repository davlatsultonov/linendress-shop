let colorPicker = $('.color-picker'),
    colorPickerItem = $('.color-picker__item');

colorPickerItem.on('click', function () {
    colorPicker.find('li').removeClass('checked');
    $(this).addClass('checked');
});