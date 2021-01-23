let name = '';
function onboarding() {

    $(".navigation_mobile").addClass("opened");

    botui.message.add({
        type: 'html',
        profile : true,
        delay: 1000,
        content: '<img class="profile" src="images/characters_animations/Character-24-Hello.gif">'
    }).then(function () {
        botui.message.add({ // show a message
            human: false,
            loading: true,
            delay: 2500,
            content: 'Привет! Рад приветствовать тебя! Я житель этого замечательного города. А как тебя зовут?'
        }).then(function () { // wait till its shown
            botui.action.text({ // show 'text' action
                action: {
                    placeholder: 'Твое имя'
                }
            }).then(function (res) {
                name = res.value;
                botui.message.add({ // show a message
                    human: false,
                    loading: true,
                    delay: 2500,
                    content: 'Классное имя, ' + res.value + '! Давай развивать город?'
                }).then(function () {
                    botui.action.button({
                        action: [
                            { // show only one button
                                text: 'Конечно!',
                                value: 'yes'
                            },
                            { // show only one button
                                text: 'А зачем?',
                                value: 'no'
                            }
                        ]
                    }).then(function (res) { // will be called when a button is clicked.
                        switch (res.value) {
                            case "yes" : {

                                botui.message.add({ // show a message
                                    human: false,
                                    loading: true,
                                    delay: 2500,
                                    content: name + ', шикарно! Давай построим первый квартал и приблизимся к призу!'
                                }).then(function () {
                                    botui.action.button({
                                        action: [
                                            { // show only one button
                                                text: 'Построить квартал!',
                                                value: 'yes'
                                            }
                                        ]
                                    }).then(function (res) {
                                        switch (res.value) {
                                            case "yes" : {

                                                botui.message.add({ // show a message
                                                    human: false,
                                                    loading: true,
                                                    delay: 2500,
                                                    content: name + ', строим! Кстати, обрати внимания на доступные задания (кнопка внизу).'
                                                }).then(function () {
                                                    $('.tasks-menu').fadeIn(1000);
                                                });


                                                break;
                                            }
                                        }
                                    });;
                                });

                                break;
                            }


                            case "no" : {
                                botui.message.add({ // show a message
                                    human: false,
                                    loading: true,
                                    delay: 2500,
                                    content: name + ', дело в том, что если развивать город и увеличивать количество жителей до 1 млн. человек, ' +
                                        'то можно выиграть 1,000,000 ТГ! Это прекрасно! Давай построим первый квартал и приблизимся к призу?'
                                }).then(function () {

                                    botui.message.add({
                                        type: 'embed', // this is 'text' by default
                                        content: 'https://www.youtube.com/embed/XoauzeKn5xc'
                                    }).then(function () {
                                        botui.action.button({
                                            action: [
                                                { // show only one button
                                                    text: 'Построить квартал!',
                                                    value: 'yes'
                                                }
                                            ]
                                        }).then(function (res) {
                                            switch (res.value) {
                                                case "yes" : {

                                                    botui.message.add({ // show a message
                                                        human: false,
                                                        loading: true,
                                                        delay: 2500,
                                                        content: name + ', строим! Кстати, обрати внимания на доступные задания (кнопка внизу).'
                                                    });
                                                    $('.tasks-menu').fadeIn(1000);

                                                    break;
                                                }
                                            }
                                        });
                                    })
                                });
                                break;
                            }

                        }
                    });
                    }
                )
            });
        });
    });
}


function shake(message) {

    $('#messages').addClass('animated infinite tada');

    $('#messages').on('click',function (event) {

        if($('#messages').hasClass('animated') === true) {
            botui.message.add({ // show a message
                human: false,
                loading: true,
                delay: 2500,
                content: message
            });

            $('#messages').removeClass('animated infinite tada');
        }
    });

}