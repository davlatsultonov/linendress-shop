$(document).ready(function () {
    let addCounterBtn = $('.add-counter .add-counter__btn'),
        countBox = $('.add-counter .add-counter__num'),
        addToCartButtons = $('.product-card__button_add');

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
});