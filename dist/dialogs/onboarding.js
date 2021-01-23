if ($('#my-botui-app').attr('data-status') === 'active') {
    $('#menu_dialogs').click();
}

if ($('#my-botui-app').attr('data-read') !== 'yes') {
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
            content: 'Добро пожаловать в Urbancity! Я – Айдос, твой помощник, и я буду подсказывать как выиграть 1,000,000 тенге. Давай я расскажу как пользоваться интерфейсом?'
        }).then(function () {

            to_accelera({
                event: 'read',
                game_id: game_id,
                context: {'name': 'onboarding', 'status': 'finished', 'read': 'yes'}
            }, function () {
                console.log('Event was sent to Accelera.ai');
            });


            botui.action.button({
                action: [
                    {
                        text: 'Конечно!',
                        value: 'yes'
                    }
                ]
            }).then(function () {
                $('.menu-dialogs').modal('hide');

                setTimeout(function () {
                    $('.menu-introduction').modal('show');
                },1000);


                $('.introduction-completed').click(function () {
                    console.log("Finished");
                    $('#menu_dialogs').click();

                    botui.message.add({ // show a message
                        human: false,
                        loading: true,
                        delay: 2000,
                        content: 'У тебя есть первые 💰2,000 монет! Построй первые здания, нажимая на свободные клетки и выбирая постройки, чтобы заселить первых жителей города!'
                    }).then(function () {
                        botui.message.add({ // show a message
                            human: false,
                            loading: true,
                            delay: 2000,
                            content: 'Обрати внимание, что на красных клетках ты сможешь строить специальные кварталы. Удачи!'
                        }).then(function () {
                            show_dialog();
                        });
                    })
                })

            });
        });
    });
} else {
    botui.message.add({
        type: 'html',
        profile: true,
        loading: false,
        delay: 500,
        content: '<img src="images/characters/Normie 4.png" class="mw-110 flex-shrink-0 radius10" alt=""/>'
    }).then(function () {
        botui.message.add({ // show a message
            human: false,
            loading: false,
            delay: 500,
            content: 'Добро пожаловать в Urbancity! Я – Айдос, твой помощник, и я буду подсказывать как выиграть 1,000,000 тенге.'
        }).then(function () {
            botui.message.add({ // show a message
                human: false,
                loading: false,
                delay: 5000,
                content: 'У тебя есть первые 💰2,000 монет! Построй первые здания, нажимая на свободные клетки и выбирая постройки, чтобы заселить первых жителей города!'
            }).then(function () {
                botui.message.add({ // show a message
                    human: false,
                    loading: false,
                    delay: 5000,
                    content: 'Обрати внимание, что на красных клетках ты сможешь строить специальные кварталы. Удачи!'
                }).then(function () {
                    show_dialog();
                });
            });
        });
    });
}
