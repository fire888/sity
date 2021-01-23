$('.people').click(function () {
    $('#people').modal('show');
});

$('.money').click(function () {
    $('#money').modal('show');
});


$('#menu_dialogs').click(function () {
    $('.land').hide();
    $('.menu-dialogs').modal('show');
});

$('.menu-dialogs').on('hidden.bs.modal', function () {
    $('#menu_city').click();
    $('.land').show();
});

$('#menu_tasks').click(function () {
    $('.land').hide();
    $('.menu-tasks').modal('show');
});

$('.menu-tasks').on('hidden.bs.modal', function () {
    $('#menu_city').click();
    $('.land').show();
});

//New menu
var tabs = document.getElementsByClassName('nav-item');
var activeEl = tabs[0];

function select(el){
    console.log(el);
    activeEl.classList.remove('active');
    activeEl = el;
    activeEl.classList.add('active');
}

select(tabs[1]);