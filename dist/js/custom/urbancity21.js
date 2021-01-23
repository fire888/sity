var botui = new BotUI('my-botui-app');
var dialogs_array = [];

function load_urbancity() {

    items = {
        "personal":{

        },
        "basic":{
            "business_tower_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_tower_2lvl",
                "category":"business",
                "icon":"images/icons/business_tower_2lvl.png",
                "topic":"Бизнес центр \"Urban\"",
                "model":"urbancity/custom/models/business/business_tower_2lvl.obj",
                "textures":"urbancity/custom/models/business/business_tower_2lvl.mtl",
                "description":"Бизнес центр",
                "level":"2",
                "currency":"coins",
                "price":1000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":200,
                "increment_people":0
            },
            "living_education_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_education_2lvl",
                "category":"living",
                "icon":"images/icons/living_education_2lvl.png",
                "topic":"Колледж \"Мой путь\"",
                "model":"urbancity/custom/models/living/living_education_2lvl.obj",
                "textures":"urbancity/custom/models/living/living_education_2lvl.mtl",
                "description":"Колледж",
                "level":"2",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":300
            },
            "living_education_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_education_1lvl",
                "category":"living",
                "icon":"images/icons/living_education_1lvl.png",
                "topic":"Школа \"Карандаши\"",
                "model":"urbancity/custom/models/living/living_education_1lvl.obj",
                "textures":"urbancity/custom/models/living/living_education_1lvl.mtl",
                "description":"Школа",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "business_shop_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_shop_1lvl",
                "category":"business",
                "icon":"images/icons/business_shop_1lvl.png",
                "topic":"Магазин \"Люкс\"",
                "model":"urbancity/custom/models/business/business_shop_1lvl.obj",
                "textures":"urbancity/custom/models/business/business_shop_1lvl.mtl",
                "description":"Магазин",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "service_tower":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_tower",
                "category":"other",
                "icon":"images/icons/service_tvtower.png",
                "topic":"Телебашня",
                "model":"urbancity/custom/models/service/service_tower.obj",
                "textures":"urbancity/custom/models/service/service_tower.mtl",
                "description":"Правильное информационное пространство",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "service_bank":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_bank",
                "category":"other",
                "icon":"images/icons/service_bank.png",
                "topic":"Банк",
                "model":"urbancity/custom/models/service/service_bank.obj",
                "textures":"urbancity/custom/models/service/service_bank.mtl",
                "description":"Финансовое благополучие в надежных руках!",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":0
            },
            "service_administration":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_administration",
                "category":"other",
                "icon":"images/icons/service_administration.png",
                "topic":"Городская мэрия",
                "model":"urbancity/custom/models/service/service_administration.obj",
                "textures":"urbancity/custom/models/service/service_administration.mtl",
                "description":"Эффективно управляй своим городом",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":0
            },
            "living_science_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_science_2lvl",
                "category":"living",
                "icon":"images/icons/living_science_2lvl.png",
                "topic":"Академия наук",
                "model":"urbancity/custom/models/living/living_science_2lvl.obj",
                "textures":"urbancity/custom/models/living/living_science_2lvl.mtl",
                "description":"Академия наук",
                "level":"2",
                "currency":"coins",
                "price":1000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":150,
                "increment_people":200
            },
            "living_blue_3lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_blue_3lvl",
                "category":"living",
                "icon":"images/icons/living_blue_3lvl.png",
                "topic":"Синяя высотка",
                "model":"urbancity/custom/models/living/living_blue_3lvl.obj",
                "textures":"urbancity/custom/models/living/living_blue_3lvl.mtl",
                "description":"Дом как жилой квартал восходит к небу и вмешает все больше жителей",
                "level":"3",
                "currency":"coins",
                "price":1500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":450
            },
            "service_hospital":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_hospital",
                "category":"other",
                "icon":"images/icons/service_hospital.png",
                "topic":"Клиника",
                "model":"urbancity/custom/models/service/service_hospital.obj",
                "textures":"urbancity/custom/models/service/service_hospital.mtl",
                "description":"Клиника",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "living_hotel":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_hotel",
                "category":"living",
                "icon":"images/icons/living_hotel.png",
                "topic":"Отель",
                "model":"urbancity/custom/models/living/living_hotel.obj",
                "textures":"urbancity/custom/models/living/living_hotel.mtl",
                "description":"Прекрасный отель",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "business_2tower_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_2tower_2lvl",
                "category":"business",
                "icon":"images/icons/business_2tower_2lvl.png",
                "topic":"Бизнес-центр \"Мудрость\"",
                "model":"urbancity/custom/models/business/business_2tower_2lvl.obj",
                "textures":"urbancity/custom/models/business/business_2tower_2lvl.mtl",
                "description":"Твой улучшенный бизнес-центр",
                "level":"2",
                "currency":"coins",
                "price":1000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":200,
                "increment_people":0
            },
            "service_farm":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_farm",
                "category":"other",
                "icon":"images/icons/service_farm.png",
                "topic":"Ферма \"Экологичные продукты\"",
                "model":"urbancity/custom/models/service/service_farm.obj",
                "textures":"urbancity/custom/models/service/service_farm.mtl",
                "description":"Обеспечь город здоровым питанием!",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "living_yellow_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_yellow_1lvl",
                "category":"living",
                "icon":"images/icons/living_yellow_1lvl.png",
                "topic":"Желтый домик",
                "model":"urbancity/custom/models/living/living_yellow_1lvl.obj",
                "textures":"urbancity/custom/models/living/living_yellow_1lvl.mtl",
                "description":"Дом для небольшой семьи",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "living_purple_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_purple_2lvl",
                "category":"living",
                "icon":"images/icons/living_purple_2lvl.png",
                "topic":"Фиолетовый многоквартирный дом",
                "model":"urbancity/custom/models/living/living_purple_2lvl.obj",
                "textures":"urbancity/custom/models/living/living_purple_2lvl.mtl",
                "description":"Дом для большой семьи с участком",
                "level":"2",
                "currency":"coins",
                "price":1000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":300
            },
            "living_blue_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_blue_1lvl",
                "category":"living",
                "icon":"images/icons/living_blue_1lvl.png",
                "topic":"Синий домик",
                "model":"urbancity/custom/models/living/living_blue_1lvl.obj",
                "textures":"urbancity/custom/models/living/living_blue_1lvl.mtl",
                "description":"Дом для небольшой семьи",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "living_purple_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_purple_1lvl",
                "category":"living",
                "icon":"images/icons/living_purple_1lvl.png",
                "topic":"Фиолетовый домик",
                "model":"urbancity/custom/models/living/living_purple_1lvl.obj",
                "textures":"urbancity/custom/models/living/living_purple_1lvl.mtl",
                "description":"Небольшой дом для маленькой семьи",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "business_2tower_3lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_2tower_3lvl",
                "category":"business",
                "icon":"images/icons/business_2tower_3lvl.png",
                "topic":"Бизнес-центр \"Партнерство\"",
                "model":"urbancity/custom/models/business/business_2tower_3lvl.obj",
                "textures":"urbancity/custom/models/business/business_2tower_3lvl.mtl",
                "description":"Твой улучшенный бизнес-центр",
                "level":"3",
                "currency":"coins",
                "price":1500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":300,
                "increment_people":0
            },
            "living_red_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_red_1lvl",
                "category":"living",
                "icon":"images/icons/living_red_1lvl.png",
                "topic":"Красный домик",
                "model":"urbancity/custom/models/living/living_red_1lvl.obj",
                "textures":"urbancity/custom/models/living/living_red_1lvl.mtl",
                "description":"Дом для небольшой семьи",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "business_cafe":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_cafe",
                "category":"business",
                "icon":"images/icons/business_cafe.png",
                "topic":"Кафе \"Айдос Лаундж\"",
                "model":"urbancity/custom/models/business/business_cafe.obj",
                "textures":"urbancity/custom/models/business/business_cafe.mtl",
                "description":"Отдыхай с удовольствием!",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "airport":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"airport",
                "category":"airport",
                "icon":"images/icons/airport.png",
                "topic":"Аэропорт",
                "model":"urbancity/custom/models/airport/airport.obj",
                "textures":"urbancity/custom/models/airport/airport.mtl",
                "description":"Твой замечательный аэропорт",
                "level":"0",
                "currency":"coins",
                "price":6000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":1400,
                "increment_people":2200
            },
            "business_tower_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_tower_1lvl",
                "category":"business",
                "icon":"images/icons/business_tower_1lvl.png",
                "topic":"Бизнес центр \"Алга\"",
                "model":"urbancity/custom/models/business/business_tower_1lvl.obj",
                "textures":"urbancity/custom/models/business/business_tower_1lvl.mtl",
                "description":"Бизнес центр",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":100,
                "increment_people":0
            },
            "service_museum":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_museum",
                "category":"other",
                "icon":"images/icons/service_museum.png",
                "topic":"Музей \"Истоки\"",
                "model":"urbancity/custom/models/service/service_museum.obj",
                "textures":"urbancity/custom/models/service/service_museum.mtl",
                "description":"Музей \"Истоки\"",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "service_police":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_police",
                "category":"other",
                "icon":"images/icons/service_police.png",
                "topic":"Полицейский участок",
                "model":"urbancity/custom/models/service/service_police.obj",
                "textures":"urbancity/custom/models/service/service_police.mtl",
                "description":"На страже твоего города",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "living_science_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_science_1lvl",
                "category":"living",
                "icon":"images/icons/living_science_1lvl.png",
                "topic":"Научный институт",
                "model":"urbancity/custom/models/living/living_science_1lvl.obj",
                "textures":"urbancity/custom/models/living/living_science_1lvl.mtl",
                "description":"Институт",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "service_clocktower":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_clocktower",
                "category":"other",
                "icon":"images/icons/service_clocktower.png",
                "topic":"Часовая башня",
                "model":"urbancity/custom/models/service/service_clocktower.obj",
                "textures":"urbancity/custom/models/service/service_clocktower.mtl",
                "description":"Часовая башня",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "service_sakura":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_sakura",
                "category":"other",
                "icon":"images/icons/service_sakura.png",
                "topic":"Сакура",
                "model":"urbancity/custom/models/service/service_sakura.obj",
                "textures":"urbancity/custom/models/service/service_sakura.mtl",
                "description":"Украшение для любой площади",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "living_red_3lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_red_3lvl",
                "category":"living",
                "icon":"images/icons/living_red_3lvl.png",
                "topic":"Красная высотка",
                "model":"urbancity/custom/models/living/living_red_3lvl.obj",
                "textures":"urbancity/custom/models/living/living_red_3lvl.mtl",
                "description":"Дом как жилой квартал восходит к небу и вмешает все больше жителей",
                "level":"3",
                "currency":"coins",
                "price":1500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":450
            },
            "port":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"port",
                "category":"port",
                "icon":"images/icons/port.png",
                "topic":"Порт",
                "model":"urbancity/custom/models/port/port.obj",
                "textures":"urbancity/custom/models/port/port.mtl",
                "description":"Открой водные сообщения!",
                "level":"1",
                "currency":"coins",
                "price":6000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":1400,
                "increment_people":2200
            },
            "living_purple_3lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_purple_3lvl",
                "category":"living",
                "icon":"images/icons/living_purple_3lvl.png",
                "topic":"Фиолетовая высотка",
                "model":"urbancity/custom/models/living/living_purple_3lvl.obj",
                "textures":"urbancity/custom/models/living/living_purple_3lvl.mtl",
                "description":"В таком доме всегда веселее!",
                "level":"3",
                "currency":"coins",
                "price":1500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":450
            },
            "service_firestation":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_firestation",
                "category":"other",
                "icon":"images/icons/service_firestation.png",
                "topic":"Пожарная станция",
                "model":"urbancity/custom/models/service/service_firestation.obj",
                "textures":"urbancity/custom/models/service/service_firestation.mtl",
                "description":"Пожарная станция",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":150
            },
            "business_2tower_1lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_2tower_1lvl",
                "category":"business",
                "icon":"images/icons/business_2tower_1lvl.png",
                "topic":"Бизнес-центр \"Алга Алга\"",
                "model":"urbancity/custom/models/business/business_2tower_1lvl.obj",
                "textures":"urbancity/custom/models/business/business_2tower_1lvl.mtl",
                "description":"Твой шикарный бизнес-центр",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":100,
                "increment_people":0
            },
            "living_blue_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_blue_2lvl",
                "category":"living",
                "icon":"images/icons/living_blue_2lvl.png",
                "topic":"Синий многоквартирный дом",
                "model":"urbancity/custom/models/living/living_blue_2lvl.obj",
                "textures":"urbancity/custom/models/living/living_blue_2lvl.mtl",
                "description":"Дом для большой семьи",
                "level":"2",
                "currency":"coins",
                "price":1000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":300
            },
            "living_education_3lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_education_3lvl",
                "category":"living",
                "icon":"images/icons/living_education_3lvl.png",
                "topic":"Университет \"Гранит науки\"",
                "model":"urbancity/custom/models/living/living_education_3lvl.obj",
                "textures":"urbancity/custom/models/living/living_education_3lvl.mtl",
                "description":"Университет",
                "level":"3",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":450
            },
            "business_coworking":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_coworking",
                "category":"business",
                "icon":"images/icons/business_coworking.png",
                "topic":"Коворкинг",
                "model":"urbancity/custom/models/business/business_coworking.obj",
                "textures":"urbancity/custom/models/business/business_coworking.mtl",
                "description":"Отличное пространство для совместной работы!",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "living_yellow_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_yellow_2lvl",
                "category":"living",
                "icon":"images/icons/living_yellow_2lvl.png",
                "topic":"Желтый многоквартирный дом",
                "model":"urbancity/custom/models/living/living_yellow_2lvl.obj",
                "textures":"urbancity/custom/models/living/living_yellow_2lvl.mtl",
                "description":"Дом для большой семьи с участком",
                "level":"2",
                "currency":"coins",
                "price":1000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":300
            },
            "business_tower_3lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_tower_3lvl",
                "category":"business",
                "icon":"images/icons/business_tower_3lvl.png",
                "topic":"Бизнес центр \"Молодость\"",
                "model":"urbancity/custom/models/business/business_tower_3lvl.obj",
                "textures":"urbancity/custom/models/business/business_tower_3lvl.mtl",
                "description":"Бизнес центр",
                "level":"3",
                "currency":"coins",
                "price":1500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":300,
                "increment_people":0
            },
            "living_yellow_3lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_yellow_3lvl",
                "category":"living",
                "icon":"images/icons/living_yellow_3lvl.png",
                "topic":"Желтая высотка",
                "model":"urbancity/custom/models/living/living_yellow_3lvl.obj",
                "textures":"urbancity/custom/models/living/living_yellow_3lvl.mtl",
                "description":"Дом как жилой квартал восходит к небу и вмешает все больше жителей",
                "level":"3",
                "currency":"coins",
                "price":1500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":450
            },
            "living_red_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_red_2lvl",
                "category":"living",
                "icon":"images/icons/living_red_2lvl.png",
                "topic":"Красный многоквартирный дом",
                "model":"urbancity/custom/models/living/living_red_2lvl.obj",
                "textures":"urbancity/custom/models/living/living_red_2lvl.mtl",
                "description":"Дом для большой семьи",
                "level":"2",
                "currency":"coins",
                "price":1000,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":0,
                "increment_people":300
            },
            "service_hotelkazakstan":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"service_hotelkazakstan",
                "category":"living",
                "icon":"images/icons/service_hotelkazakstan.png",
                "topic":"Отель Казахстан",
                "model":"urbancity/custom/models/service/service_hotelkazakstan.obj",
                "textures":"urbancity/custom/models/service/service_hotelkazakstan.mtl",
                "description":"Символ твоего города!",
                "level":"1",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":75,
                "increment_people":100
            },
            "business_shop_2lvl":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"business_shop_2lvl",
                "category":"business",
                "icon":"images/icons/business_shop_2lvl.png",
                "topic":"Торговый Центр \"МегаЛюкс\"",
                "model":"urbancity/custom/models/business/business_shop_2lvl.obj",
                "textures":"urbancity/custom/models/business/business_shop_2lvl.mtl",
                "description":"Торговый центр",
                "level":"2",
                "currency":"coins",
                "price":500,
                "offset_x":-15,
                "offset_z":-15,
                "increment_money":100,
                "increment_people":0
            },
            "factory":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"factory",
                "category":"factory",
                "icon":"images/icons/factory.png",
                "topic":"Экофабрика",
                "model":"urbancity/custom/models/factory/factory.obj",
                "textures":"urbancity/custom/models/factory/factory.mtl",
                "description":"Экофабрика",
                "level":"1",
                "currency":"coins",
                "price":6000,
                "offset_x":-23,
                "offset_z":-23,
                "increment_money":1400,
                "increment_people":2200
            },
            "railway":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"railway",
                "category":"railway",
                "icon":"images/icons/railway.png",
                "topic":"Железнодорожный вокзал",
                "model":"urbancity/custom/models/railway/railway.obj",
                "textures":"urbancity/custom/models/railway/railway.mtl",
                "description":"Принимай гостей твоего города!",
                "level":"1",
                "currency":"coins",
                "price":6000,
                "offset_x":-400,
                "offset_z":90,
                "increment_money":1400,
                "increment_people":2200
            }
        },
        "purchases":{
            "_hW1cj8eHlkK3x4irXkyBO_PmDk6givnqOsoh25t":{
                "game_id":"urbancity20",
                "type":"basic",
                "name":"living_science_2lvl",
                "category":"living",
                "icon":"images/icons/living_science_2lvl.png",
                "topic":"Академия наук",
                "model":"urbancity/custom/models/living/living_science_2lvl.obj",
                "textures":"urbancity/custom/models/living/living_science_2lvl.mtl",
                "description":"Академия наук",
                "level":"2",
                "currency":"coins",
                "price":"500",
                "offset_x":"-15",
                "offset_z":"-15",
                "increment":"1000",
                "x":"-60",
                "y":"0",
                "z":"-30",
                "plane":"tobuild_21_1_Plane.007"
            }
        },
        "locks":{

        }
    };

}

function build_item(id, category) {
    let item = _.get(items, [category, id]);
    console.log('Will be built;', item);

    //load_model_positioned(item);
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
        item.plane = $('.menu-builder').attr('data-plane');
        load_mash_positioned(mashes);
    })


}
