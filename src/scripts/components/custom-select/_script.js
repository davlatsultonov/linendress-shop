$(document).ready(function () {
    let defaultItem = $('.select-block__default'), // начальный/дефолтный выбранный элемент блока селект
        dropdownItems =  $('.select-block__list li'); // все элементы внутри дропдовна
    // инициализация кликов
    openDropdown(defaultItem);
    selectDropdownItem(dropdownItems);
    // функция для показа дропдовна
    function openDropdown(defaultItem) {
        if (defaultItem) {
            defaultItem.click(function () {
                $(this).parent().toggleClass('expanded');
            });
        }
        return false;
    }
    // функция для выбора элемента дропдовна
    function selectDropdownItem(items) {
        items.click(function () {
            let current = $(this).html();
            defaultItem.find('li').html(current);
            $(this).parents('.select-block').removeClass('expanded');
        });
    }
});