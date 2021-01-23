var botui = new BotUI('my-botui-app');
var dialogs_array = [];

function load_urbancity() {
    get_profile(function () {

    });

    get_achievements(function () {

        if (achievements.wheel !== undefined && achievements.wheel.active === 'true') {
            $('#game').attr('src','images/svg/game.svg');
        }
    });

    get_counters(function () {
        if (counters !== undefined) {
            $('#money_badge').html(Math.round(parseInt(counters.coins)));
            if (counters.people !== undefined) {
                $('#people_badge').html(Math.round(parseInt(counters.people)));
            }
        }
    });

    setTimeout(function () {
        get_tasks(function () {
            console.log('Preparing tasks');
            if (_.size(tasks) !== 0) {
                $('.tasks-introduction').html('');
                $('#table-tasks tr').remove();
                $('.table-tasks').show();
                _.forEach(tasks, function (task) {
                    $('#table-tasks').append('<tr>\n' +
                        '<td><img src="images/characters/Banker.png" srcset="images/characters/Banker.png 2x" class="mw-110 flex-shrink-0 radius10" alt=""/></td>\n' +
                        '<td><span class="text-left">'+task.description+'</span><br>\n' +
                        '<span class="text-left">Статус: '+((task.status === "active") ? "активно" : "выполнено") +'</span>\n' +
                        '</td>\n' +
                        '</tr>');

                    if (task.name === 'transactional_first_task' && task.status === 'active') {
                        $(".modal-magicball-teaser").modal('show');
                    }
                })
            }
        });
    },5000)

    let gacid = cid();
    to_accelera({event: 'tag', game_id: game_id, context: {gacid: gacid}}, function () {
        console.log('Google tag was sent to Accelera.ai');
    });

    let _fbp = fbp();
    to_accelera({event: 'pixel', game_id: game_id, context: {fbp: _fbp}}, function () {
        console.log('Facebook pixel was sent to Accelera.ai');
    });

    get_items(function () {
        console.log('Already purchased items:',(_.size(items.purchases)));

        if (_.size(items.purchases) !== 0) {
            _.forEach(items.purchases, function (item) {
                console.log('Will be built:', item);
                remove_model(item.plane);

                let objects = [];

                _.forEach(mash, function (value) {
                    if (value.name.includes(item.name)) {
                        value.position.x = item.x;
                        value.position.y = item.y;
                        value.position.z = item.z;
                        objects.push(value);
                    }
                });

                console.log(objects);

                _.forEach(objects, function (mashes) {
                    load_mash_positioned(mashes);
                });
            })
        } else {
            console.log('There is no items purchased')
        }
    });

    get_dialogs(function () {
        if (_.size(dialogs) !== 0) {
            let unsorted = [];
            _.forEach(dialogs, function (item) {
                unsorted.push(item);
            });
            console.log('Dialogs are:', dialogs_array);
            let sorted = _.sortBy(unsorted, ['timestamp']);
            dialogs_array = sorted;
            show_dialog();
        }
    })
}

function build_item(id, category) {
    let item = _.get(items, [category, id]);
    console.log('Will be built;', item);
    item.x = parseInt($('.menu-builder').attr('data-x')) + item.offset_x;
    item.y = parseInt($('.menu-builder').attr('data-y'));
    item.z = parseInt($('.menu-builder').attr('data-z')) + item.offset_z;
    item.plane = $('.menu-builder').attr('data-plane');

    purchase(item, function (done) {
        if (done.status === 'processed') {
            console.log('Purchased successfully!');

            let item = _.get(items, [category, id]);
            console.log('Will be built;', item);

            let objects = [];

            _.forEach(mash, function (value) {
                if (value.name.includes(id)) {
                    objects.push(value);
                }
            });

            console.log(objects);

            _.forEach(objects, function (mashes) {
                mashes.position.x = parseInt($('.menu-builder').attr('data-x')) + item.offset_x;
                mashes.position.y = parseInt($('.menu-builder').attr('data-y'));
                mashes.position.z = parseInt($('.menu-builder').attr('data-z')) + item.offset_z;
                load_mash_positioned(mashes);
            });
            remove_model(item.plane);

            $('#money_badge').html(Math.round(parseInt(done.balance)));
            $('.menu-builder').modal('hide');

            $('.build-topic').html('Постройка завершена!');
            $('.build-description').html('Отлично, здание построено!');
            $('.modal-built').modal('show');

            //To Accelera.ai
            if (parseInt(item.increment_people) > 0) {
                to_accelera({
                    event: 'build',
                    game_id: game_id,
                    context: {
                        item: item.name,
                        price: item.price,
                        topic: item.topic,
                        description: item.description,
                        counter: "people",
                        increment: parseInt(item.increment_people),
                        period : 'day',
                        name : item.name
                    }
                }, function () {
                    console.log('Event was sent to Accelera.ai');
                })
            }

            if (parseInt(item.increment_money) > 0) {
                to_accelera({
                    event: 'build',
                    game_id: game_id,
                    context: {
                        item: item.name,
                        price: item.price,
                        topic: item.topic,
                        description: item.description,
                        counter: "coins",
                        increment: parseInt(item.increment_money),
                        period : 'day',
                        name : item.name
                    }
                }, function () {
                    console.log('Event was sent to Accelera.ai');
                })
            }

        } else {
            $('.menu-builder').modal('hide');

            $('.build-topic').html('Недостаточно монет?');
            $('.build-description').html('К сожалению, у тебя недостаточно монет для строительства. Не забудь сыграть в мини-игру.\n' +
                'Тебе также может помочь карта Visa Urban. Привязав банковскую карту, ты сможешь получать больше монет и жителей.\n' +
            '<br><a target="_blank" href="https://sberbank.kz/ru/urban_ver_2?urbancity_id='+profile.profile_id+'">Привязать карту</a>');
            $('.modal-built').modal('show');
        }
    });
}

function pull_dialog() {
    if (_.size(dialogs_array) !== 0) {
        let dialog = dialogs_array.splice(0, 1);
        console.log('Got dialog:', dialog);
        return dialog[0];
    } else {
        console.log('No dialogs left');
        return false;
    }
}

function show_dialog() {
    let dialog = pull_dialog();
    if (dialog !== false) {
        console.log('Loading dialog:', dialog.name);
        $("#my-botui-app").attr('data-status', dialog.status);
        $("#my-botui-app").attr('data-read', dialog.read);

        $.getScript(dialog.script, function () {
        });
    }
}

show_dialog();


$('#game').click(function () {
    if (achievements.wheel !== undefined) {
        if (achievements.wheel.active === 'true') {
            window.location = 'wheel.html'
        } else {
            $('.modal-game-unavailable').modal('show');
        }
    } else {
        $('.modal-game-unavailable').modal('show');
    }
});

function gotocard() {
    let href = set_utm("https://sberbank.kz/ru/urban_ver_2?urbancity_id="+profile.profile_id);
    to_accelera({event: 'open_card_landing', game_id: game_id, context: {gacid: gacid, fbp: _fbp, event: 'open_card_landing'}}, function () {});
    window.location = href;
}