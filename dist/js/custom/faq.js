// var botui_faq = new BotUI('my-botui-app-faq');

$('.show-faq').click(function () {
    $(".menu-dialogs").modal('hide');
    $(".menu-faq").modal('show');
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
                    text: 'Если количество жителей достигнет 1,000,000 жителей, то получу 1,000,000 тенге?',
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
                },
                {
                    text: 'Какой у меня Индентификатор участника и зачем он нужен?',
                    value: '10'
                }
            ]
        }).then(function (res) { // will be called when a button is clicked.
            switch (res.value) {
                case "1" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Участник акции получает шанс на выигрыш в 1,000,000 (миллион) тенге при достижении 1 млн. жителей к концу акции и при выполнении Правил акции:'
                    }).then(function () {
                        botui_faq.message.add({ // show a message
                            type : "html",
                            human: false,
                            loading: true,
                            delay: 2000,
                            content: '<a style="text-decoration: underline" target="_blank" href="https://urbancity.kz/docs/rules.pdf">Открыть правила</a>'
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
                        content: 'Приз в 1,000,000 (миллион) тенге будет разыгрываться между участниками акции, кто достигнет 1,000,000 жителей.'
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
                        content: 'Начни строить здания и кварталы города, которые приносят монеты. Так ты быстрее получишь средства для развития города. Выполняй задания для получения дополнительных наград в игре.'
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
                        content: 'Открой карту VISA Urban, совершай покупки и выполняй задания. Так ты быстрее получишь игровые монеты, т.к. получаешь их за каждую операцию покупки, и сможешь выполнять задания с использованием банковской карты.'
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
                        content: 'Нет, участие в акции не требует банковской карты. Открытие карты и операции по ней дают Участнику дополнительные монеты и возможность быстрее развивать свой город. Карту VISA Urban можно выпустить прямо в приложении Банка.'
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
                        content: 'Игровые монеты даются только за покупки по курсу 1 тенге = 1 игровая монета. Монеты за покупки должны будут поступать в течение 20 минут.'
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
                        content: 'Это займет всего 1 минуту. Нужно заполнить форму на сайте Банка по ссылке ниже. Карта будет привязана автоматически и можно ее использовать для получения монет и выполнения заданий.'
                    }).then(function () {
                        let href = set_utm("https://sberbank.kz/ru/urban_ver_2?urbancity_id="+profile.profile_id);

                        botui_faq.message.add({ // show a message
                            type : "html",
                            human: false,
                            loading: true,
                            delay: 2000,
                            content: '<a style="text-decoration: underline" target="_blank" onclick="link_card();" href="'+href+'">Привязать карту</a>'
                        });
                        display_questions();
                    });
                    break;
                }
                case "8" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Задания – это способы получения дополнительных монет или жителей в акции. Список заданий может изменяться, поэтому отслеживай их, чтобы скорее дойти до своей цели.'
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
                        content: 'Опиши свой вопрос и укажи ID участника (если что, то твой номер '+profile.profile_id+') и пришли запрос на info@cubesolutions.ru. Помни, что мы никогда не спросим номер твоей карты и ты, конечно же, не сообщай данные карты НИКОМУ и НИКОГДА. В остальном, мы постараемся помочь.'
                    }).then(function () {
                        display_questions();
                    });
                    break;
                }
                case "10" : {
                    botui_faq.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'Это твой личный идентификатор в акции или ID участника – '+profile.profile_id+', он нужен при обращении в службу поддержки пользователей Акции. Он же будет использоваться в процессе определения победителей.'
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
