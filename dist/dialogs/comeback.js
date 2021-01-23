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
        content: 'С возвращением в UrbanCity! Тебе были начислены 8 000 монет. У тебя есть отличные шансы стать финалистом, удачи!'
    }).then(function () {
        to_accelera({
            event: 'read',
            game_id: game_id,
            context: {'name': 'task_signin_dialog', 'status': 'finished', 'read': 'yes'}
        }, function () {
            console.log('Event was sent to Accelera.ai');
        });
        show_dialog();
    });
});