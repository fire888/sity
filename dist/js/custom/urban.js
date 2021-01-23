var event = new Event('build');
document.addEventListener('build', function (e) { console.log(e) }, false);
//document.dispatchEvent(event);

function login() {
    $("#login").modal('show');
}

$('.tabbar li a').on('click', function(e) {

    e.preventDefault();

    let that = $(this),
        li = that.parent(),
        ul = li.parent();

    if(!ul.hasClass('move') && !li.hasClass('active')) {
        ul.children('li').removeClass('active');

        ul.css('--x-n', li.position().left + li.outerWidth() / 2 + 'px');
        li.addClass('move');
        ul.addClass('move');

        setTimeout(() => {
            ul.removeClass('move');
            li.removeClass('move').addClass('active');
            ul.css('--x', li.position().left + li.outerWidth() / 2 + 'px');
        }, 1200);
    }

});


$(".botui").click(function(event){
    event.preventDefault();
    $(".dialogs").addClass("opened");

});

$(".tasks").click(function(event){
    event.preventDefault();
    $(".tasks").addClass("opened");

});

$(".close_menu").click(function(event){
    event.preventDefault();
    $(".navigation_mobile").removeClass("opened");

});

$('.targets').click(function (event) {
    event.preventDefault();

    $(".navigation_mobile").removeClass("opened");
    $(".my-active-tasks").addClass("opened");
});

function auth(social) {
    switch (social) {
        case "fb": {
            window.open("/accelera/api/v1/authorization/facebook?game_id=urbancity20", '_self');
            break;
        }
        case "vk": {
            window.open("/accelera/api/v1/authorization/vk?game_id=urbancity20", '_self');
            break;
        }
        case "google": {
            window.open("/accelera/api/v1/authorization/google?game_id=urbancity20", '_self');
            break;
        }
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    console.log(vars);
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

$('.registration').click(function () {
    $('#login').modal('hide');
    $('#registration').modal('show');
});

$('#game').click(function () {
    window.location.href = '/wheel'
});

$('.goto-alien-game').click(function () {
    window.location.href = '/fruits?people_ufo=' + people_ufo
});


function start_confetti() {
    var end = Date.now() + (3 * 1000);
    var colors = ['#6cff98', '#df0c0b'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function detailed(element, button) {
    let elem = document.getElementsByClassName(element);
    let but = document.getElementsByClassName(button);
    if ($(elem).hasClass('has-overflow')) {
        $(elem).removeClass('has-overflow');
        $(but).html('Скрыть');
    } else {
        $(elem).addClass('has-overflow');
        $(but).html('Детали');
    }
}

$('#forgetpassword').click(function () {
    $('#login').modal('hide');
    $('#forget_password').modal('show');
});

var botui_faq = new BotUI('my-botui-app-faq');

$('.show-faq').click(function () {
    $(".dialogs").removeClass("opened");
    botui_faq.message.removeAll();
    botui_faq.action.hide();

    $(".faq").addClass("opened");
    botui_faq.message.add({
        type: 'html',
        profile: true,
        content: '<img src="images/characters/Normie 4.png" srcset="images/characters/Normie 4.png 2x"\n' +
            '                             class="mw-110 flex-shrink-0 radius10" alt=""/>'
    }).then(function () {
        display_faq();
    })
});

function display_faq() {
    botui_faq.message.add({ // show a message
        human: false,
        loading: true,
        delay: 2000,
        content: 'Какой вопрос тебя интересует?'
    }).then(function () {
        botui_faq.action.button({
            action: [
                {
                    text: 'Расскажи мне про акцию в целом',
                    value: '1'
                },
                {
                    text: 'Если количество жителей достигнет 100,000 жителей, то получу 100,000 тенге?',
                    value: '2'
                },
                {
                    text: 'Как увеличивать количество жителей быстрее?',
                    value: '3'
                },
                {
                    text: 'Как увеличивать количество жителей еще быстрее?',
                    value: '4'
                },
                {
                    text: 'Обязательна ли банковская карта VISA Urban для участия в акции?',
                    value: '5'
                },
                {
                    text: 'Сколько игровых монет я получу за покупки по карте VISA Urban?',
                    value: '6'
                },
                {
                    text: 'У меня есть карта VISA Urban, как мне "привязать" для получения игровых монет?',
                    value: '7'
                },
                {
                    text: 'Что такое задания?',
                    value: '8'
                },
                {
                    text: 'У меня остались вопросы. Кому мне можно их задать?',
                    value: '9'
                }
            ]
        }).then(function (res) { // will be called when a button is clicked.
            switch (res.value) {
                case "1" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Мы подготовили краткое описание об акции. Вот тебе ссылка:'
                    }).then(function () {
                        botui_faq.message.add({ // show a message
                            type : "html",
                            human: false,
                            loading: true,
                            delay: 2000,
                            content: '<a style="text-decoration: underline" target="_blank" href="https://urbancity.kz/faq?urbancity_id=' + urbancity_id+'">Открыть описание</a>'
                        }).then(function () {
                            display_questions();
                        });
                    });
                    break;
                }
                case "2" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: '1-й приз в 100,000 тенге получит первый, кто достигнет цели в 100,000 жителей. Другие 2 приза в 100,000 тенге будут разыгрываться среди всех остальных Участников, кто достиг цели в 100,000 жителей.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "3" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Начни развивать кварталы города, которые приносят монеты. Так ты быстрее получишь средства для развития города. Развивай кварталы, чтобы наращивать прирост жителей и монет. Проводи мероприятия (ивенты), чтобы привлечь единоразово большое количество жителей. Мероприятия имеют стоимость в монетах и появляются в карточках некоторых кварталов.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "4" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Открой карту VISA Urban, совершай покупки и выполняй задания. Так ты быстрее получишь игровые монеты и сможешь быстро построить город и увеличить количество жителей.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "5" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Нет, участие в акции не требует банковской карты. Открытие карты и операции по ней дают Участнику дополнительные монеты и возможность быстрее развивать свой город.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "6" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Игровые монеты даются только за покупки по курсу 1 тенге = 1 игровая монета. Монеты за покупки должны будут поступать в течение 20-30 минут.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "7" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Это займет всего 1 минуту. Нужно пройти по ссылке на сайт Банка и вести несколько полей. Карта будет привязана автоматически и можно ее использовать для получения монет и выполнения заданий.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "8" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Задания – это способы получения дополнительных монет в акции. Список заданий и их статус можно всегда посмотреть в меню (иконка справа в верхней части экрана). Список заданий может изменяться, поэтому отслеживай их, чтобы скорее дойти до своей цели.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "9" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Опиши свой вопрос и ID участника ('+urbancity_id+') и пришли на info@cubesolutions.ru. Помни, что мы никогда не спросим номер твоей карты и ты, конечно же, не сообщай данные карты НИКОМУ и НИКОГДА. В остальном, мы постараемся помочь.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
            }
        })
    })
}

function display_questions() {
    botui_faq.action.button({
        action: [
            {
                text: 'Показать вопросы',
                value: '1'
            }
            ]
    }).then(function (res) { // will be called when a button is clicked.
        switch (res.value) {
            case "1" : {
                display_faq();
            }
        }
    });
}
