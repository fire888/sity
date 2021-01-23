//var api_host = 'http://localhost:802';
//var api_accelera = 'https://urbancity.kz/accelera';
var api_host = 'https://urbancity.kz/accelera';
const game_id = "urbancity20";
var profile, achievements, tasks, items, counters, dialogs;


function get_profile(callback) {
    console.log('Getting profile');
    $('.btn').attr('disabled', true);
    $('#waiting').addClass('overlay');

    var posting = $.post(api_host+'/api/v1/profiles/get',{"game_id" : game_id});
    posting
        .done(function(data) {
            profile = data;
            loaded(data);
            callback();
        })
        .fail(function(data) {
            loaded(data);
            callback();
        });
}

function get_achievements(callback) {
    console.log('Getting achievements');
    $('.btn').attr('disabled', true);
    $('#waiting').addClass('overlay');

    var posting = $.post(api_host+'/api/v1/achievements/get',{"game_id" : game_id});
    posting
        .done(function(data) {
            achievements = data;
            loaded(data);
            callback();
        })
        .fail(function(data) {
            loaded(data);
            callback();
        });
}

function get_tasks(callback) {
    console.log('Getting tasks');
    $('.btn').attr('disabled', true);
    $('#waiting').addClass('overlay');

    var posting = $.post(api_host+'/api/v1/tasks/get',{"game_id" : game_id});
    posting
        .done(function(data) {
            tasks = data;
            loaded(data);
            callback();
        })
        .fail(function(data) {
            loaded(data);
            callback();
        });
}

function get_dialogs(callback) {
    console.log('Getting dialogs');
    $('.btn').attr('disabled', true);
    $('#waiting').addClass('overlay');

    var posting = $.post(api_host+'/api/v1/dialogs/get',{"game_id" : game_id});
    posting
        .done(function(data) {
            dialogs = data;
            loaded(data);
            callback();
        })
        .fail(function(data) {
            loaded(data);
            callback();
        });
}

let fake_items = {};
function get_items(callback) {
    console.log('Getting items');
    $('.btn').attr('disabled', true);
    $('#waiting').addClass('overlay');

    var posting = $.post(api_host+'/api/v1/items/get',{"game_id" : game_id});
    posting
        .done(function(data) {
            items = data;
            loaded(data);
            callback();
        })
        .fail(function(data) {
            loaded(data);
            callback();
        });

}

function get_counters(callback) {
    console.log('Getting counters');
    $('.btn').attr('disabled', true);
    $('#waiting').addClass('overlay');

    var posting = $.post(api_host+'/api/v1/counters/get',{"game_id" : game_id});
    posting
        .done(function(data) {
            counters = data;
            loaded(data);
            callback();
        })
        .fail(function(data) {
            loaded(data);
        });
}

function purchase(item, callback) {
    console.log('Purchasing items');
    $('.btn').attr('disabled', true);
    $('#waiting').addClass('overlay');

    var posting = $.post(api_host+'/api/v1/items/purchase',item);
    posting
        .done(function(data) {
            loaded(data);
            callback(data);
        })
        .fail(function(data) {
            loaded(data);
            callback(data);
        });
}

function loaded(data) {
    $('#waiting').removeClass('overlay');
    $('.btn').attr('disabled', false);
    console.log(data);

    if (data.status === 403) {
        console.log('Login is required');
        window.location.href = '/'
    }

    return false;
}

//Google Tag Manager CID
function cid()
{
    var match = document.cookie.match('(?:^|;)\\s*_ga=([^;]*)');
    var raw = (match) ? decodeURIComponent(match[1]) : null;
    if (raw)
    {
        match = raw.match(/(\d+\.\d+)$/);
    }
    var gacid = (match) ? match[1] : null;
    if (gacid)
    {
        console.log('GTM:', gacid);
        return gacid;
    } else {
        return "";
    }
}

//Facebook ID
function fbp()
{
    let result = /_fbp=(fb\.1\.\d+\.\d+)/.exec(window.document.cookie);
    if (!(result && result[1])) {
        return "";
    }
    console.log('Facebook:', result[1]);
    return result[1];
}

function to_accelera(payload, callback) {
var posting = $.post(api_host+'/api/v1/events', payload);
    posting
        .done(function(data) {
            console.log('Posted for accelera.ai:', payload, data);
            callback(data);
        })
        .fail(function(data) {
            console.error('Post failed for accelera.ai:', payload, data);
            callback(data);
        });
}

function set_utm(href) {
    var querystring = localStorage.getItem('urbancity_utm');
    if (querystring !== "" && querystring !== undefined) {
        href += (href.match(/\?/) ? '&' : '?') + querystring;
        return href;
    } else {
        return href;
    }
}