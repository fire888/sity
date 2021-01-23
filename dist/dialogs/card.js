if ($('#my-botui-app').attr('data-status') === 'active') {
    $('#menu_dialogs').click();
}

botui.message.add({
    type: 'html',
    profile: true,
    delay: 1000,
    content: '<img src="images/characters/Normie 4.png" class="mw-110 flex-shrink-0 radius10" alt=""/>'
}).then(function () {
    botui.message.add({ // show a message
        human: false,
        loading: true,
        delay: 2000,
        content: 'Шеф, мы все верим, что ты сможешь построить большой город и достигнешь 1 млн. жителей. Для этой цели тебе может помочь карта Visa Urban. Используя банковскую карту, ты сможешь получать больше монет и жителей.'
    }).then(function () {
        botui.message.add({
            type: 'html',
            profile: true,
            delay: 1000,
            content: '<img style="max-width:200px; height: auto" class="radius10" src="images/urban_card.gif">'
        }).then(function () {
            botui.message.add({ // show a message
                human: false,
                loading: true,
                delay: 2000,
                content: 'Замечательно, что карту Visa Urban теперь можно выпустить прямо в смартфоне без посещения офиса Банка. Пройди по ссылке ниже и выпусти свою карту.'
            }).then(function () {
                let href = set_utm("https://sberbank.kz/ru/urban_ver_2?urbancity_id="+profile.profile_id);

                botui.message.add({
                    type: 'html',
                    delay: 1000,
                    content: '<a target="_blank" href="'+href+'" onclick="issue_card();">Выпустить карту</a>'
                }).then(function () {
                    botui.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 5000,
                        content: 'Как только ты оформишь карту, то привяжи ее к данной акции, чтобы получать дополнительные монеты за покупки и за выполненные задания.'
                    }).then(function () {
                        let href = set_utm("https://sberbank.kz/ru/urban_ver_2?urbancity_id="+profile.profile_id);

                        botui.message.add({
                            type: 'html',
                            delay: 1000,
                            content: '<a target="_blank" onclick="link_card();" href="'+href+'">Привязать карту</a>'
                        }).then(function () {

                            botui.message.add({ // show a message
                                human: false,
                                loading: true,
                                delay: 1000,
                                content: 'Данные по операциям учитываются в акции с задержкой до 15 минут.'
                            });

                            to_accelera({
                                event: 'read',
                                game_id: game_id,
                                context: {'name': 'card', 'status': 'finished', 'read': 'yes'}
                            }, function () {
                                console.log('Event was sent to Accelera.ai');
                            });
                            show_dialog();
                        });
                    });
                });
            });
        });
    });
});

function issue_card() {
    to_accelera({event: 'issue_card', game_id: game_id, context: {game_id: game_id, event: 'open_card_landing'}}, function () {
        console.log('Issue event was sent to Accelera.ai');
    });
}

function link_card() {
    to_accelera({event: 'link_card', game_id: game_id, context: {game_id: game_id, event: 'linkCardAttempt'}}, function () {
        console.log('Link event was sent to Accelera.ai');
    });
}